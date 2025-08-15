import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db/index.js";
import { diagnoses } from "./db/schema.js";
import { z } from "zod";
const app = new Hono();
app.use("/api/*", cors({
    origin: ["http://localhost:3000"],
}));
const clientIdSchema = z.uuid({ version: "v4" });
const diagnosisBodySchema = z.object({
    diagnosis_name: z.string().min(1).optional(),
    justification: z.string().min(1).optional(),
    challenged_diagnosis: z.string().optional(),
    challenged_justification: z.string().optional(),
});
app.get("/api/diagnoses/:clientId", async (c) => {
    const clientId = c.req.param("clientId");
    const parsed = clientIdSchema.safeParse(clientId);
    if (!parsed.success) {
        return c.json({ message: "Invalid clientId." }, 400);
    }
    const record = await db
        .select()
        .from(diagnoses)
        .where(eq(diagnoses.clientId, clientId))
        .orderBy(diagnoses.predictedDate)
        .limit(1);
    if (!record.length) {
        return c.json({ message: "No diagnosis found for this client." }, 404);
    }
    return c.json(record[0]);
});
app.post("/api/diagnoses/:clientId", async (c) => {
    const clientId = c.req.param("clientId");
    const parsedId = clientIdSchema.safeParse(clientId);
    if (!parsedId.success)
        return c.json({ message: "Invalid clientId." }, 400);
    const body = await c.req.json();
    const parsedBody = diagnosisBodySchema.safeParse(body);
    if (!parsedBody.success) {
        return c.json({ message: "Invalid request body.", errors: parsedBody.error }, 400);
    }
    const existing = await db
        .select()
        .from(diagnoses)
        .where(eq(diagnoses.clientId, clientId))
        .limit(1);
    let record;
    if (!existing.length) {
        const newRecord = {
            id: uuidv4(),
            clientId: uuidv4(),
            diagnosisName: parsedBody.data.diagnosis_name || "",
            predictedDate: new Date(),
            justification: parsedBody.data.justification || "",
            challengedDiagnosis: parsedBody.data.challenged_diagnosis,
            challengedJustification: parsedBody.data.challenged_justification,
            updatedAt: new Date(),
        };
        await db.insert(diagnoses).values(newRecord);
        record = newRecord;
    }
    else {
        const updates = {
            updatedAt: new Date(),
            ...(parsedBody.data.diagnosis_name && {
                diagnosisName: parsedBody.data.diagnosis_name,
            }),
            ...(parsedBody.data.justification && {
                justification: parsedBody.data.justification,
            }),
            ...(parsedBody.data.challenged_diagnosis && {
                challengedDiagnosis: parsedBody.data.challenged_diagnosis,
            }),
            ...(parsedBody.data.challenged_justification && {
                challengedJustification: parsedBody.data.challenged_justification,
            }),
        };
        await db
            .update(diagnoses)
            .set(updates)
            .where(eq(diagnoses.clientId, clientId));
        record = { ...existing[0], ...updates };
    }
    return c.json(record);
});
app.put("/api/diagnoses/:id", async (c) => {
    const id = c.req.param("id");
    const parsed = clientIdSchema.safeParse(id);
    if (!parsed.success) {
        return c.json({ message: "Invalid clientId." }, 400);
    }
    const body = await c.req.json();
    const parsedBody = diagnosisBodySchema.safeParse(body);
    if (!parsedBody.success) {
        return c.json({ message: "Invalid request body.", errors: parsedBody.error }, 400);
    }
    const updates = {
        updatedAt: new Date(),
        ...(parsedBody.data.diagnosis_name && {
            diagnosisName: parsedBody.data.diagnosis_name,
        }),
        ...(parsedBody.data.justification && {
            justification: parsedBody.data.justification,
        }),
        ...(parsedBody.data.challenged_diagnosis && {
            challengedDiagnosis: parsedBody.data.challenged_diagnosis,
        }),
        ...(parsedBody.data.challenged_justification && {
            challengedJustification: parsedBody.data.challenged_justification,
        }),
    };
    const result = await db
        .update(diagnoses)
        .set(updates)
        .where(eq(diagnoses.id, id))
        .returning();
    if (!result.length) {
        return c.json({ message: "Diagnosis not found." }, 404);
    }
    return c.json(result[0]);
});
serve({
    fetch: app.fetch,
    port: 3001,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});

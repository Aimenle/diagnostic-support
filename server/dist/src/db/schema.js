import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const diagnoses = pgTable("diagnoses", {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id").notNull(),
    diagnosisName: text("diagnosis_name").notNull(),
    predictedDate: timestamp("predicted_date", { withTimezone: true }).notNull(),
    justification: text("justification").notNull(),
    challengedDiagnosis: text("challenged_diagnosis"),
    challengedJustification: text("challenged_justification"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql `now()`),
});

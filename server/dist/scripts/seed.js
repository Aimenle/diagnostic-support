import "dotenv/config";
import { sql } from "drizzle-orm";
import { diagnoses } from "../src/db/schema.js";
import { db } from "../src/db/index.js";
import { diagnosesFixtures } from "../fixtures/diagnoses.js";
async function main() {
    for (const row of diagnosesFixtures) {
        await db
            .insert(diagnoses)
            .values(row)
            .onConflictDoUpdate({
            target: diagnoses.id,
            set: {
                clientId: row.clientId,
                diagnosisName: row.diagnosisName,
                predictedDate: row.predictedDate,
                justification: row.justification,
                challengedDiagnosis: row.challengedDiagnosis,
                challengedJustification: row.challengedJustification,
                updatedAt: row.updatedAt,
            },
        });
    }
    const count = await db
        .select({ count: sql `count(*)` })
        .from(diagnoses);
    console.log("Seed complete. diagnoses count =", count[0].count);
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});

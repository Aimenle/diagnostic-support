import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import { diagnoses } from "./schema.js";
console.log(process.env.DATABASE_URL);
export const db = drizzle(process.env.DATABASE_URL!);
// await seed(db, { diagnoses }).refine((f) => ({
//   diagnoses: {
//     columns: {
//       diagnosisName: f.loremIpsum({ sentencesCount: 2 }),
//       justification: f.loremIpsum({ sentencesCount: 2 }),
//     },
//     count: 20,
//   },
// }));

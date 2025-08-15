import { v4 as uuidv4 } from "uuid";

export const API_BASE = "http://localhost:4000";

export async function getDiagnosis(clientId: string) {
  const res = await fetch(`${API_BASE}/api/diagnoses/${clientId}`);
  return res.json();
}

export async function createOrUpdateDiagnosis(
  clientId?: string,
  data?: Record<string, string>
) {
  const res = await fetch(`${API_BASE}/api/diagnoses/${clientId || uuidv4()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateDiagnosis(
  diagnosisId: string,
  data: Record<string, string>
) {
  const res = await fetch(`${API_BASE}/api/diagnoses/${diagnosisId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

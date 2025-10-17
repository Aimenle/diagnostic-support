export const ids = {
  clientA: "f5cab8a3-0cd9-4795-96fb-c4efb5fefc34",
  clientB: "6f3fccda-b155-406c-a274-f0411a554a8f",
};

export const diagnosisIds = {
  a1: "4ccce852-45b4-4dec-b5b6-7f59431ad249",
  b1: "830eebdd-1c14-4e44-91c7-f2b8ffab255e",
};

export const diagnosesFixtures = [
  {
    id: diagnosisIds.a1,
    clientId: ids.clientA,
    diagnosisName: "Generalized Anxiety Disorder",
    predictedDate: new Date("2025-01-15T10:00:00.000Z"),
    justification:
      "Elevated GAD-7 scores and persistent worry across multiple domains for >6 months.",
    challengedDiagnosis: null,
    challengedJustification: null,
    updatedAt: new Date("2025-01-15T10:00:00.000Z"),
  },
  {
    id: diagnosisIds.b1,
    clientId: ids.clientB,
    diagnosisName: "Major Depressive Disorder",
    predictedDate: new Date("2025-02-01T09:30:00.000Z"),
    justification:
      "PHQ-9 indicates severe depression; anhedonia and sleep disturbance reported.",
    challengedDiagnosis: "Persistent Depressive Disorder",
    challengedJustification:
      "Symptoms persistent but subthreshold for major episodes over 2+ years.",
    updatedAt: new Date("2025-02-01T09:30:00.000Z"),
  },
] as const;

export type DiagnosisFixture = (typeof diagnosesFixtures)[number];

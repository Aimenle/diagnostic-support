"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { getDiagnosis, updateDiagnosis } from "../../../lib/api";
import { Input, Textarea, Button, Card, CardBody } from "@heroui/react";

export default function EditDiagnosisPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.clientId as string;

  const { data, error, isLoading, mutate } = useSWR(
    clientId ? `/diagnosis/${clientId}` : null,
    () => getDiagnosis(clientId)
  );

  const [diagnosisName, setDiagnosisName] = useState("");
  const [justification, setJustification] = useState("");
  const [challengedDiagnosis, setChallengedDiagnosis] = useState("");
  const [challengedJustification, setChallengedJustification] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (data) {
      setDiagnosisName(data.diagnosisName || "");
      setJustification(data.justification || "");
      setChallengedDiagnosis(data.challengedDiagnosis || "");
      setChallengedJustification(data.challengedJustification || "");
    }
  }, [data]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data?.id) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateDiagnosis(data.id, {
        diagnosis_name: diagnosisName,
        justification,
        challenged_diagnosis: challengedDiagnosis,
        challenged_justification: challengedJustification,
      });
      setSuccessMessage("Diagnosis updated successfully");
      mutate();
    } catch (err) {
      setErrorMessage("Failed to update diagnosis: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading diagnosis...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-800 font-medium">
                Error loading diagnosis
              </span>
            </div>
            <p className="text-red-700 text-sm mt-1">
              Please check the patient ID and try again
            </p>
            <Button
              className="mt-4"
              variant="bordered"
              onPress={() => router.push("/")}
            >
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Diagnosis
              </h1>
              <p className="text-gray-600">
                Update patient diagnosis record for Client ID: {clientId}
              </p>
            </div>
            <Button
              variant="bordered"
              onPress={() => router.push("/")}
              startContent={
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0L2.586 11H16a1 1 0 110 2H2.586l3.707 3.707a1 1 0 01-1.414 1.414l-5.414-5.414a1 1 0 010-1.414l5.414-5.414a1 1 0 011.414 1.414L2.586 9H16a1 1 0 110 2H7.707z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Back to Search
            </Button>
          </div>
        </div>

        <Card>
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-800 font-medium">
                      {successMessage}
                    </span>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-800 font-medium">
                      {errorMessage}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Primary Diagnosis Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Primary Diagnosis
                  </h3>
                  <Input
                    label="Diagnosis Name"
                    placeholder="Enter primary diagnosis"
                    value={diagnosisName}
                    onChange={(e) => setDiagnosisName(e.target.value)}
                    variant="bordered"
                    size="lg"
                    isRequired
                  />
                  <Textarea
                    label="Clinical Justification"
                    placeholder="Provide detailed clinical reasoning..."
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    variant="bordered"
                    minRows={4}
                    isRequired
                  />
                </div>

                {/* Challenged Diagnosis Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Challenged Diagnosis (Optional)
                  </h3>
                  <Input
                    label="Challenged Diagnosis"
                    placeholder="Enter challenged diagnosis"
                    value={challengedDiagnosis}
                    onChange={(e) => setChallengedDiagnosis(e.target.value)}
                    variant="bordered"
                    size="lg"
                  />
                  <Textarea
                    label="Challenged Justification"
                    placeholder="Provide justification for challenged diagnosis..."
                    value={challengedJustification}
                    onChange={(e) => setChallengedJustification(e.target.value)}
                    variant="bordered"
                    minRows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="bordered"
                  size="lg"
                  onPress={() => router.push("/")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={loading}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                  startContent={
                    !loading && (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )
                  }
                >
                  {loading ? "Updating..." : "Update Diagnosis"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

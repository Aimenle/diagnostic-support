"use client";

import { useState } from "react";
import { createOrUpdateDiagnosis } from "../lib/api";
import { Input, Textarea, Button } from "@heroui/react";

export default function DiagnosisForm({ clientId }: { clientId?: string }) {
  const [diagnosisName, setDiagnosisName] = useState("");
  const [justification, setJustification] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseData, setResponseData] = useState<{
    clientId: string;
  } | null>();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await createOrUpdateDiagnosis(clientId, {
        diagnosis_name: diagnosisName,
        justification,
      });
      setResponseData(response);
      setSuccessMessage("Diagnosis successfully saved to patient record");
      setDiagnosisName("");
      setJustification("");
    } catch (err) {
      setErrorMessage("Failed to save diagnosis: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            <span className="text-green-800 font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {responseData && responseData.clientId && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <span className="text-blue-800 font-medium">Client ID: </span>
                <span className="text-blue-900 font-mono text-lg">
                  {responseData.clientId}
                </span>
              </div>
            </div>
            <Button
              size="sm"
              variant="bordered"
              onPress={() => handleCopyToClipboard(responseData.clientId)}
              className={`${
                copySuccess
                  ? "border-green-500 text-green-700"
                  : "border-blue-500 text-blue-700"
              } transition-colors`}
              startContent={
                copySuccess ? (
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-clipboard"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                )
              }
            >
              {copySuccess ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-blue-700 text-sm mt-2">
            Please save this Client ID for future reference to this patient
            record.
          </p>
        </div>
      )}

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
            <span className="text-red-800 font-medium">{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Input
            label="Primary Diagnosis"
            placeholder="Enter primary diagnosis (e.g., ICD-10 code and description)"
            value={diagnosisName}
            onChange={(e) => setDiagnosisName(e.target.value)}
            variant="bordered"
            size="lg"
            isRequired
            description="Use standardized medical terminology and coding"
            startContent={
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>

        <div>
          <Textarea
            label="Clinical Justification"
            placeholder="Provide detailed clinical reasoning, supporting evidence, test results, and treatment rationale..."
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            variant="bordered"
            minRows={4}
            isRequired
            description="Include relevant symptoms, clinical findings, differential diagnosis considerations, and evidence-based reasoning"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          variant="bordered"
          size="lg"
          onPress={() => {
            setDiagnosisName("");
            setJustification("");
            setSuccessMessage("");
            setErrorMessage("");
            setResponseData(null);
            setCopySuccess(false);
          }}
        >
          Clear Form
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={loading}
          size="lg"
          className="bg-green-600 hover:bg-green-700 px-8"
          startContent={
            !loading && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )
          }
        >
          {loading ? "Saving Diagnosis..." : "Save Diagnosis"}
        </Button>
      </div>
    </form>
  );
}

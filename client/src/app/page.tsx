"use client";

import { useState } from "react";
import useSWR from "swr";
import { getDiagnosis } from "../lib/api";
import { useRouter } from "next/navigation";
import { Input, Button, Card, CardBody } from "@heroui/react";

export default function Home() {
  const [clientId, setClientId] = useState("");
  const [searchId, setSearchId] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR(
    searchId ? `/diagnosis/${searchId}` : null,
    () => getDiagnosis(searchId!)
  );

  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (clientId.trim()) setSearchId(clientId.trim());
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Diagnosis Management
          </h1>
          <p className="text-gray-600">
            Search and manage patient diagnosis records
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardBody>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Patient Lookup
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Enter patient ID to retrieve diagnosis history
                  </p>
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                  <Input
                    placeholder="Patient ID (UUID format)"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    variant="bordered"
                    size="lg"
                    startContent={
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  />
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Search Patient Records
                  </Button>
                </form>

                {/* Search Results */}
                {isLoading && (
                  <div className="mt-6 flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">
                      Searching records...
                    </span>
                  </div>
                )}

                {error && (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
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
                        Error retrieving diagnosis
                      </span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      Please check the patient ID and try again
                    </p>
                  </div>
                )}

                {data && (
                  <div className="mt-6">
                    <Card className="bg-green-50 border border-green-200 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
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
                          Current Diagnosis
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Active
                          </span>
                          <Button
                            size="sm"
                            variant="bordered"
                            onPress={() => router.push(`/edit/${searchId}`)}
                            className="border-green-600 text-green-700 hover:bg-green-50"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border border-green-200">
                          <label className="text-sm font-medium text-gray-700">
                            Diagnosis
                          </label>
                          <p className="text-gray-900 font-semibold">
                            {data.diagnosisName}
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-green-200">
                          <label className="text-sm font-medium text-gray-700">
                            Clinical Justification
                          </label>
                          <p className="text-gray-900 mt-1">
                            {data.justification}
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-green-200">
                          <label className="text-sm font-medium text-gray-700">
                            Last Updated
                          </label>
                          <p className="text-gray-900">
                            {new Date(data.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg border-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                Quick Actions
              </h3>

              <div className="space-y-3">
                <Button
                  color="primary"
                  onPress={() => router.push("/enter")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  New Diagnosis
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

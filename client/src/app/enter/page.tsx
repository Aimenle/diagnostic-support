"use client";

import DiagnosisForm from "../../components/DiagnosisForm";

export default function EnterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Clinical Diagnosis Entry
              </h1>
              <p className="text-gray-600">Create patient diagnosis records</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg border-0 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  New Patient
                </h2>
                <p className="text-gray-600 text-sm">
                  After adding a diagnosis, you will be provided with a user ID.
                  Please save it for the time being.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <DiagnosisForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

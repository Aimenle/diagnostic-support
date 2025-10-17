import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getDiagnosis, createOrUpdateDiagnosis, updateDiagnosis, API_BASE } from './api'

global.fetch = vi.fn()
const fetchMock = vi.mocked(fetch)

describe('API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getDiagnosis', () => {
    it('should fetch diagnosis for a client', async () => {
      const clientId = 'test-client-id'
      const mockResponse = { id: '1', clientId, diagnosisName: 'Test Diagnosis' }

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      const result = await getDiagnosis(clientId)

      expect(fetch).toHaveBeenCalledWith(`${API_BASE}/api/diagnoses/${clientId}`)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('createOrUpdateDiagnosis', () => {
    it('should create or update diagnosis with provided data', async () => {
      const clientId = 'test-client-id'
      const data = { diagnosis_name: 'New Diagnosis', justification: 'Test justification' }
      const mockResponse = { id: '1', clientId, ...data }

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      const result = await createOrUpdateDiagnosis(clientId, data)

      expect(fetch).toHaveBeenCalledWith(`${API_BASE}/api/diagnoses/${clientId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      expect(result).toEqual(mockResponse)
    })

    it('should generate UUID when clientId is not provided', async () => {
      const data = { diagnosis_name: 'New Diagnosis' }
      const mockResponse = { id: '1', ...data }

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      await createOrUpdateDiagnosis(undefined, data)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`${API_BASE}/api/diagnoses/[a-f0-9-]{36}`)),
        expect.any(Object)
      )
    })
  })

  describe('updateDiagnosis', () => {
    it('should update diagnosis with PUT request', async () => {
      const diagnosisId = 'test-diagnosis-id'
      const data = { diagnosis_name: 'Updated Diagnosis' }
      const mockResponse = { id: diagnosisId, ...data }

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)

      const result = await updateDiagnosis(diagnosisId, data)

      expect(fetch).toHaveBeenCalledWith(`${API_BASE}/api/diagnoses/${diagnosisId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      expect(result).toEqual(mockResponse)
    })
  })
})
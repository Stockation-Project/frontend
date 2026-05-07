// src/services/questionnaire.service.ts
import apiClient from "./api";

export interface QuestionnairePayload {
  answers: number[];
}

export const questionnaireService = {
  submit: async (payload: QuestionnairePayload) => {
    try {
      // Sesuaikan URL ini dengan endpoint (rute) Backend Node.js Anda.
      // Asumsi rutenya adalah POST /api/questionnaire
      const response = await apiClient.post("/questionnaire/submit", payload);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Gagal mengirim kuesioner",
      );
    }
  },
};

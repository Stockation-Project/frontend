// src/features/questionnaire/services/questionnaire.service.ts
import apiClient from "@/lib/axios";

export interface QuestionnairePayload {
  answers: number[];
}

export const questionnaireService = {
  submit: async (payload: QuestionnairePayload) => {
    try {
      const response = await apiClient.post("/questionnaire/submit", payload);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Gagal mengirim kuesioner",
      );
    }
  },
};

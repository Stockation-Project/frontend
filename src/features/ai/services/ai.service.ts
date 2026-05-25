import axiosInstance from "@/lib/axios";

export const getAIExplanation = async (term: string, context?: string): Promise<string> => {
  let url = `/ai/explanation?term=${encodeURIComponent(term)}`;
  if (context) {
    url += `&context=${encodeURIComponent(context)}`;
  }
  const response = await axiosInstance.get(url);
  return response.data.data;
};

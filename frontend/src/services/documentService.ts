import api from './api';
import { Document, DocumentType } from '../types/document';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const documentService = {
  getByDemand: async (demandId: number): Promise<Document[]> => {
    const response = await api.get<ApiResponse<Document[]>>(`/api/v1/documents/demand/${demandId}`);
    return response.data.data;
  },

  upload: async (demandId: number, file: File, documentType: DocumentType): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    const response = await api.post<ApiResponse<Document>>(
      `/api/v1/documents/demand/${demandId}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/v1/documents/${id}`);
  },
};

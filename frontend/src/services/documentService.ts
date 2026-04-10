import api from './api';
import { Document } from '../types';

export const getDocumentsByDemandId = async (demandId: string): Promise<Document[]> => {
  const { data } = await api.get<Document[]>(`/api/documents/demand/${demandId}`);
  return data;
};

export const uploadDocument = async (
  demandId: string,
  file: File,
  documentType: string
): Promise<Document> => {
  const formData = new FormData();
  formData.append('demandId', demandId);
  formData.append('file', file);
  formData.append('documentType', documentType);
  const { data } = await api.post<Document>('/api/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const downloadDocument = async (id: string): Promise<Blob> => {
  const { data } = await api.get<Blob>(`/api/documents/${id}`, { responseType: 'blob' });
  return data;
};

export const deleteDocument = async (id: string): Promise<void> => {
  await api.delete(`/api/documents/${id}`);
};

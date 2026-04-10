export interface Document {
  id: string;
  demandId: string;
  filename: string;
  filePath?: string;
  documentType: string;
  fileSize?: number;
  contentType?: string;
  uploadedAt: string;
}

export interface UploadDocumentDto {
  demandId: string;
  documentType: string;
  file: File;
}

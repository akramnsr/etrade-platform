export type DocumentType = 'BILL_OF_LADING' | 'INVOICE' | 'LETTER_OF_CREDIT' | 'INSURANCE' | 'CERTIFICATE_OF_ORIGIN' | 'OTHER';

export interface Document {
  id: number;
  demandId: number;
  filename: string;
  originalFilename: string;
  contentType: string;
  size: number;
  documentType: DocumentType;
  uploadedAt: string;
  uploadedBy: string;
}



import { ArtistDocumentType, CompanyDocumentType } from './config/documentTypes';
import { BillingSubscription } from './types/Billing'; // Import

export interface TextLayer {
  id: string;
  text: string;
  type?: 'text' | 'image';
  src?: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight: string;
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right' | 'justify';
  fontFamily: string;
  color: string;
  isTitle: boolean;
  isHtml?: boolean;
  rotation: number;
  page: number; 
  width: number;
  height?: number;
  lineHeight?: number; 
  letterSpacing?: number; 
}

// 🔹 UPDATED TYPES
export { ArtistDocumentType, CompanyDocumentType };
export type DocumentType = ArtistDocumentType | CompanyDocumentType | 'OUTROS';

export interface StoredDocument {
  id: string;
  name: string; 
  type: DocumentType | string; // Allow string for legacy/flexibility
  issueDate?: string; 
  expirationDate: string; 
  status: 'valid' | 'expired' | 'warning'; 
  artistId?: string; 
  companyId?: string; 
  fileUrl?: string;
  category?: 'OBRIGATORIO' | 'OPCIONAL'; 
  isVerified?: boolean; 
}

export interface ArtistIdentity {
  civilName: string;
  cpf: string;
  rg: string;
  nationality: string;
  civilStatus: string;
  address: string;
}

export interface BusinessConfig {
  baseCache: number;
  notes: string;
}

export interface LegalRepresentative {
  id: string;
  fullName: string;
  nationality: string;
  maritalStatus: string;
  profession: string;
  cpf: string;
  rg: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  signatureImageUrl?: string; 
  canSignDocuments: boolean;
  isActive: boolean;
}

export interface DocumentLayout {
  page1Background?: string;
  page2Background?: string;
  layers: TextLayer[];
}

export interface CompanyProfile {
  id: string;
  type: 'company' | 'freelancer';
  legalName: string;
  tradeName?: string;
  documentId: string; // CNPJ ou CPF
  contact: {
    email: string;
    phone: string;
  };
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  logoUrl?: string;
  legalRepresentatives: LegalRepresentative[];
  layouts: {
    general?: DocumentLayout;
    byDocumentType: Record<string, DocumentLayout>;
  };
  systemFlags: {
    isActive: boolean;
    isDefault?: boolean;
    enableCompliance: boolean;
  };
  primaryColor?: string;
  createdAt?: string;
  isSystem?: boolean;
  signatureImageUrl?: string;
  legalRepresentative?: string;
  legalRole?: string;
  complianceEnabled?: boolean;
}

export type PlanType = 'basic' | 'pro' | 'enterprise';

export type DocumentScope = 'company' | 'artist';
export type DocumentStatus = 'valid' | 'missing' | 'expired' | 'optional_missing';

export interface DocumentFile {
  id: string;
  type: DocumentType | string;
  scope: DocumentScope;

  title: string;
  fileName?: string;
  mimeType?: string;
  dataUrl?: string; // base64 ou link
  uploadedAt?: string; // ISO date

  // validade (certidões)
  expiresAt?: string; // ISO date
  notes?: string;

  // meta
  required: boolean;
  optional?: boolean;
}

export interface CompanyBanking {
  bankName: string;
  agency: string;
  account: string;
  legalName: string;
  cnpj: string;
}

export interface CompanyRepresentative {
  fullName: string;
  cpf: string;
  rg: string;
  address: string;
}

export interface CompanySignature {
  imageBase64: string;
  signedBy: string; // Nome do representante
  cpf: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  plan: PlanType; 

  // Billing
  billing: BillingSubscription; // Added Billing

  cnpj: string;
  phone: string;
  address: string;
  logoUrl?: string;

  // dados bancários + representante legal
  banking: CompanyBanking;
  legalRepresentative: CompanyRepresentative;

  // sócios (quantidade variável)
  partners: Array<{
    id: string;
    fullName: string;
    cpf?: string;
    rg?: string;
  }>;

  // assinatura digital (imagem opcional)
  signatureName: string;           
  signatureRole?: string;          
  signatureImageDataUrl?: string;  
  
  // NOVA ESTRUTURA DE ASSINATURA
  signature?: CompanySignature;

  // compliance / docs
  documents: DocumentFile[];

  createdAt: string;
  updatedAt: string;
}

export interface DocumentTemplate {
  id: string;
  type:
    | 'proposta'
    | 'procuracao'
    | 'documento_socio'
    | 'declaracoes'
    | 'contrato';
  title: string;
  fixedText: string;
  pages: number;
  isMultiPage: boolean;
  requiresSignature: boolean;
  requiredSignatures: number;
}

export interface ArtistProfile {
  id: string;
  name: string;
  photoUrl?: string; 
  documentLogoUrl?: string; 
  primaryColor: string;
  logoText: string;
  backgroundP1?: string | null;
  backgroundP2?: string | null;
  savedLayout?: TextLayer[]; 
  isSystem?: boolean;
  identity?: Partial<ArtistIdentity>;
  business?: BusinessConfig;

  documents?: StoredDocument[];
  companyId?: string;
  showValue?: number; 
  layoutOverride?: {
    byDocumentType?: Record<string, DocumentLayout>;
  };
}

export interface GlobalSettings {
  logoUrl: string | null;
  mascotUrl: string | null;
  mainTitle: string;
  mainSubtitle: string;
  developerBrand: string; 
  developerName: string;
  enableStrictCompliance: boolean;
}

export interface DocumentState {
  artistId: string;
  municipio: string;
  layers: TextLayer[];
  currentPage: number;
}

export type View = 'landing' | 'auth' | 'dashboard' | 'terms' | 'privacy' | 'saas_contract';
export type DashboardMode = 'overview' | 'artist_detail' | 'documents' | 'editor' | 'ai_studio' | 'company_hub' | 'contracts_hub' | 'artist_panel';

export interface PropostaData {
  artista: string;
  municipio: string;
  dataEvento: string;
  nomeFesta: string;
  valorTotal: number;
  dataEmissao: string;
  showDuration: string; 
}

export type AspectRatio = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';

export type ProposalStatus =
  | 'draft'
  | 'sent'
  | 'contract_received'
  | 'contract_signed'
  | 'invoice_issued'
  | 'paid';

export interface ProposalRecord {
  id: string;
  companyId: string;
  artistName: string;
  municipio: string;
  eventDate: string;

  // Novos campos para compatibilidade
  artistId?: string;
  nomeFesta?: string;
  dataEvento?: string;
  valorTotal?: number;

  proposalPdfUrl?: string;

  contractPdfUrl?: string;
  signedContractPdfUrl?: string;

  invoicePdfUrl?: string;

  status: ProposalStatus;

  createdAt: string;
  updatedAt: string;
  
  // Arquivos anexos
  prefeituraContract?: {
    fileName?: string;
    dataUrl?: string;
    uploadedAt?: string;
  };

  invoice?: {
    fileName?: string;
    dataUrl?: string;
    uploadedAt?: string;
    paidAt?: string;
  };
}

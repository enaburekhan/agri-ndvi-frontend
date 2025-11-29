export interface Report {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  file_url?: string; // URL to the uploaded file
  created_at?: string;
  updated_at?: string;
}

export interface CreateReportDto {
  project_id: number;
  title: string;
  description?: string;
  file?: File | null; // File to be uploaded
}

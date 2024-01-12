export interface IFormData {
  file: File;
  executorName: string;
  developmentDepartment: string;
}

export interface IFile {
  id: number;
  createdAt: string;
  fileName: string;
  originalName: string;
  size: number;
  mimeType: string;
  executorName: string;
  developmentDepartment: string;
  themeName: string;
  themeId: number;
}

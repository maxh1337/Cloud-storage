import instance from "@/api/api.interceptor";
import { IFormData } from "@/types/file.interface";

const FILES = "file";

export const FileService = {
  async uploadFile(data: FormData) {
    return instance<IFormData>({
      url: `${FILES}/upload/4`,
      method: "POST",
      data: data,
    });
  },

  async downloadFile(id: number) {
    return instance<File>({
      url: `${FILES}/upload/${id}`,
      method: "GET",
    });
  },
};

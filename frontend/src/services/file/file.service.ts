import instance from "@/api/api.interceptor";
import { IFormData } from "@/types/file.interface";

const FILES = "file";

export const FileService = {
  async uploadFile(data: FormData) {
    return instance<IFormData>({
      url: `${FILES}/upload/1`,
      method: "POST",
      data: data,
    });
  },
};

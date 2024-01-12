import instance from "@/api/api.interceptor";

export async function handleDownload(fileName: string, currentFileId: number) {
  return instance<File>({
    url: `file/download/${currentFileId}`,
    method: "GET",
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}

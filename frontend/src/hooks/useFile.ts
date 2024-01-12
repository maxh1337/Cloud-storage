import { FileService } from "@/services/file/file.service";
import { useQuery } from "@tanstack/react-query";

export function useDownloadFile(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["download file by id"],
    queryFn: () => FileService.downloadFile(id),
    select: ({ data }) => data,
  });

  return { data, isLoading };
}

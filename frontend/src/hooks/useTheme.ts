import { ThemeService } from "@/services/theme/theme.service";
import { useQuery } from "@tanstack/react-query";

export function useThemeById(id: string | number) {
  const { data, isLoading } = useQuery({
    queryKey: ["theme by id"],
    queryFn: () => ThemeService.getById(id as number),
    select: ({ data }) => data,
  });

  return { data, isLoading };
}

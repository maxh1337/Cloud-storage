import { ThemeService } from "@/services/theme/theme.service";
import { IPageIdParam } from "@/types/page-params";
import ThemeExplorer from "@/ui/catalog/ThemeExplorer";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await ThemeService.getAll();
  const paths = data?.map((theme) => {
    return {
      params: { id: theme.id },
    };
  });
  return paths;
}

export async function generateMetadata({
  params,
}: IPageIdParam): Promise<Metadata> {
  const { data: theme } = await ThemeService.getById(params?.id as number);

  return {
    title: theme?.themeName,
    description: `${theme?.themeName}`,
    openGraph: {
      description: `${theme?.themeName}`,
    },
  };
}

export default async function CategoryPage({ params }: IPageIdParam) {
  return (
    <>
      <ThemeExplorer type="file" params={params} />
    </>
  );
}

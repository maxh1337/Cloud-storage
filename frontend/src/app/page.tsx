import ThemeExplorer from "@/ui/catalog/ThemeExplorer";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Cloud Storage",
};

export const revalidate = 60;
export default function Home() {
  return (
    <>
      <ThemeExplorer type="theme" />
    </>
  );
}

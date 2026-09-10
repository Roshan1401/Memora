import type { Metadata } from "next";
import MemoriesPage from "../../../components/memories/MemoriesPage";

export const metadata: Metadata = {
  title: "Memories | MEMORA",
  description: "Browse every moment you have captured.",
};

export default function MemoriesRoute() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <MemoriesPage />
    </div>
  );
}

import { notFound } from "next/navigation";
import { fromDateSlug } from "../../../../utils/dateUtils";
import DayDetail from "../../../../components/day/DayDetail";

interface DayPageProps {
  params: Promise<{ date: string }>;
}

export default async function DayPage({ params }: DayPageProps) {
  const { date: slug } = await params;
  const date = fromDateSlug(slug);
  if (!date) notFound();

  return <DayDetail date={date} />;
}

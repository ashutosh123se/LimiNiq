import { AdminLeadDetail } from "@/components/admin/AdminLeadDetail";

type Props = { params: Promise<{ id: string }> };

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  return <AdminLeadDetail id={id} />;
}

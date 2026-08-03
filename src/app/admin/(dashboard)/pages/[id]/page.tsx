import PageForm from "../client-form";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <PageForm pageId={resolvedParams.id} />;
}

import SubmissionForm from "@/components/submissionForm";

async function getModels() {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/list-models`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function SubmissionFormPage() {
  const models = await getModels();
  const speciesModels = Object.values(models.Species).sort() as string[];

  return <SubmissionForm speciesModels={speciesModels} />;
}

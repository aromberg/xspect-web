import { ModelResult } from "@/components/modelResult";

async function getResults(
  genus: string,
  file: string,
  meta: string,
  step: string,
) {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/classify?genus=${genus}&file=${file}&meta=${meta}&step=${step}`,
    {
      cache: "no-cache",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Run>;
}

async function getModelMetadata(genus: string) {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/model-metadata?model_slug=${genus.toLowerCase()}-species`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch metadata");
  }

  return res.json();
}

export default async function classificationPage({ params }: any) {
  const genus = await params.genus;
  const file = await params.file;
  const meta = await params.meta;
  const step = await params.step;

  const run = await getResults(genus, file, meta, step);
  const metadata = await getModelMetadata(genus);

  const result =
    meta == "true"
      ? run.results[0].pipeline_steps[0].model_execution
      : run.results[0];

  const prediction = metadata.display_names[result.prediction];

  return (
    <div className="flex h-screen justify-center">
      <div className="mt-8 w-full">
        <div className="mx-8 rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-4 text-4xl font-bold dark:text-white">
            Prediction: {prediction}
          </h1>
          <div className="mb-10">
            <p>File: {file}</p>
            <p>Meta: {meta}</p>
            <p>Step: {step}</p>
            <p>Prediction result: {prediction}</p>
          </div>
          <ModelResult result={result} metadata={metadata} />
        </div>
      </div>
    </div>
  );
}

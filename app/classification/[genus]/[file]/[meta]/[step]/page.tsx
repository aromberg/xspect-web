import { RadarChart } from "@/components/chart";

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

  return res.json();
}

async function getModelMetadata(genus: string) {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/model-metadata?model_slug=${genus}-species`,
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

  const results = await getResults(genus, file, meta, step);
  const metadata = await getModelMetadata(genus);

  const prediction = metadata.display_names[results.prediction];

  const combinedResults = Object.keys(results.scores).map((key) => ({
    category: metadata.display_names[key],
    score: results.scores[key],
  }));

  const top10Results = combinedResults
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const categories = top10Results.map((result) => result.category);
  const values = top10Results.map((result) => result.score);

  return (
    <div className="flex h-screen justify-center">
      <div className="mt-8 w-full">
        <div className="mx-8 rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-4 text-4xl font-bold dark:text-white">
            Prediction: {prediction}
          </h1>
          <p>File: {file}</p>
          <p>Meta: {meta}</p>
          <p>Step: {step}</p>
          <p>Prediction result: {prediction}</p>
          <RadarChart keys={categories} values={values} />
        </div>
      </div>
    </div>
  );
}

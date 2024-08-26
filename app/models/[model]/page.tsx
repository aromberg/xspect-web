import ModelDetailsForm from "@/components/modelDetails";

async function getModelMetadata(modelSlug: string) {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/model-metadata?model_slug=${modelSlug}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch metadata");
  }

  return res.json() as Promise<ModelMetadata>;
}

export default async function modelDetailsPage({ params }: any) {
  const modelSlug = await params.model.toLowerCase();
  const model = await getModelMetadata(modelSlug);

  return (
    <div className="flex h-screen justify-center">
      <div className="mt-8 w-full max-w-4xl">
        <div className="mx-8 rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-6 text-3xl font-bold dark:text-white">
            {model.model_display_name}
            <span className="me-2 ms-2 rounded bg-blue-100 px-2.5 py-0.5 text-xl font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
              {model.model_type}
            </span>
          </h1>
          <p>k: {model.k}</p>
          <p>FPR: {model.fpr}</p>
          <p>Number of hashes: {model.num_hashes}</p>
          {model.kernel && (
            <div>
              <p> Kernel: {model.kernel}</p>
              <p>C: {model.C}</p>
            </div>
          )}
          <ModelDetailsForm modelMetadata={model} />
        </div>
      </div>
    </div>
  );
}

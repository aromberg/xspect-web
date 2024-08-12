"use server";

export async function submitTrainingJob(genus: string, step: number) {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/train?genus=${genus}&svm_steps=${step}`,
    {
      method: "POST",
    },
  );

  return res.json();
}

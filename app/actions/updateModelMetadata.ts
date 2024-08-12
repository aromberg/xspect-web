"use server";

export async function updateModelMetadata(
  slug: string,
  author: string,
  email: string,
) {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/model-metadata?model_slug=${slug}&author=${author}&author_email=${email}`,
    {
      method: "POST",
    },
  );

  return res.json();
}

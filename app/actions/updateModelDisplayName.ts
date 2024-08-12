"use server";

export async function updateModelDisplayName(
  slug: string,
  id: string,
  displayName: string,
) {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/model-display-name?model_slug=${slug}&filter_id=${id}&display_name=${displayName}`,
    {
      method: "POST",
    },
  );

  return res.json();
}

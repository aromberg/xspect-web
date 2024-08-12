"use server";

export async function uploadFile(formData: FormData) {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/upload-file`,
    {
      method: "POST",
      body: formData,
    },
  );

  return res.json();
}

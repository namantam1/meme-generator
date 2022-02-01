import client from "./client";

export const uploadImage = async (file: Blob) => {
  const form = new FormData();
  form.append("myfile", file, "meme.png");

  const { ok, data } = await client.post<{ myfile: string; id: number }>(
    "https://namantam1.pythonanywhere.com/upload/",
    form
  );
  if (ok && data) return { url: data.myfile, id: data.id };
};

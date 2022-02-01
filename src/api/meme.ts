import client from "./client";

export type Meme = {
  // box_count: number;
  // height: number;
  id: string | number;
  name: string;
  url: string;
  // width: number;
};

type MemeApiProps = {
  success: boolean;
  data: {
    memes: Meme[];
  };
};

export default async function memeApi() {
  const res = await client.get<MemeApiProps>(
    "https://api.imgflip.com/get_memes"
  );
  if (res.ok) {
    return res.data?.data.memes.map(({ id, url, name }) => ({
      id,
      caption: name,
      src: url,
    }));
  }
}

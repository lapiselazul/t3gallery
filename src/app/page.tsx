import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://1bnzlu4bs3.ufs.sh/f/WoH8glyhbz0ZCGBTS2SqLJynN109qKiDrRIBcboHMEZkUtvQ",
  "https://1bnzlu4bs3.ufs.sh/f/WoH8glyhbz0ZPX2RGsr4phgHyUqjrTsNLS5n3Z9lfA1FQc0v",
  "https://1bnzlu4bs3.ufs.sh/f/WoH8glyhbz0ZhwLZFnTJgsoIZ6ewaz0GKbmVvnSyCH8Aj1hO",
  "https://1bnzlu4bs3.ufs.sh/f/WoH8glyhbz0ZR1c293goNFWzyagdXuG2tfTiUZQwq041lY7m",
  "https://1bnzlu4bs3.ufs.sh/f/WoH8glyhbz0Zg9TdSvsOZg9cjz6KTimQGq74PWN08Cu2ofYI"
];

const mockImages = mockUrls.map((url, i) => ({
  id: i + 1,
  url,
}));

export default async function HomePage() {

  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map(post => (
          <div key={post.id} className="w-48">
            {post.name}
          </div>
        ))}
        {
          [...mockImages, ...mockImages, ...mockImages].map((image, i) => (
            <div key={image.id + '-' + i} className="w-48">
              <img src={image.url} />
            </div>
          ))
        }</div>
    </main>
  );
}

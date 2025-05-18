import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {
          [...mockImages, ...mockImages, ...mockImages].map(image => (
            <div key={image.id} className="w-48">
              <img src={image.url} />
            </div>
          ))
        }</div>
    </main>
  );
}

import { NextPage } from "next";
import { useEffect, useState } from "react";

type Image = {

  url: string;
}
const IndexPage: NextPage = () => {
  // useStateを使って状態維持
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // マウント時に画像を読み込む宣言
  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url); // 画像URLの状態の更新
      setLoading(false); // ローディング状態を更新する
    });
  }, []);

  // ローティング中でなければ、画像を表示する
  return <div>{loading || <img src={imageUrl} />}</div>
}

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
}



export default IndexPage;
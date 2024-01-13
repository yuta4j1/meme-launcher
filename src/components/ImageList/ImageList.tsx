import useSWR from "swr";
import { getRequest } from "../../api";
import type { ImageListReponse } from "../../types/image";
import "./ImageList.css";

function Image(props: { url: string; altText: string }) {
  const { url, altText } = props;
  return <img src={url} width={270} height={180} alt={altText} />;
}

export function ImageList() {
  const {
    data: imageList,
    isLoading,
    error,
  } = useSWR<ImageListReponse>("/image_list", getRequest);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error: {error}</div>;
  }
  return (
    <div className="container">
      {imageList &&
        imageList.map((image) => (
          <Image key={image.id} url={image.imageUrl} altText={"test"} />
        ))}
    </div>
  );
}

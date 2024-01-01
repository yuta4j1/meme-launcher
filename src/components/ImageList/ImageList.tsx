import "./ImageList.css";

function Image(props: { filePath: string; altText: string }) {
  const { filePath, altText } = props;
  return <img src={filePath} width={270} height={180} alt={altText} />;
}

type ImageData = {
  id: string;
  filePath: string;
  altText: string;
};

const imageDatas: ImageData[] = [
  {
    id: "1",
    filePath: "IMG_0214.JPG",
    altText: "",
  },
  {
    id: "2",
    filePath: "IMG_0028.JPG",
    altText: "",
  },
  {
    id: "3",
    filePath: "69-1-e1572263540309.jpg",
    altText: "",
  },
  {
    id: "4",
    filePath: "IMG_0214.JPG",
    altText: "",
  },
  {
    id: "5",
    filePath: "IMG_0028.JPG",
    altText: "",
  },
  {
    id: "6",
    filePath: "69-1-e1572263540309.jpg",
    altText: "",
  },
];

export function ImageList() {
  return (
    <div className="container">
      {imageDatas.map((v) => (
        <Image
          key={v.id}
          filePath={"test_images/" + v.filePath}
          altText={v.altText}
        />
      ))}
    </div>
  );
}

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${
    import.meta.env.VITE_R2_ACCOUNT_ID
  }.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  },
});

export const putObject = async (fileName: string, file: Blob) => {
  const command = new PutObjectCommand({
    Key: fileName,
    Bucket: "meme-launcher-storage",
    Body: file,
    ACL: "public-read",
  });
  const res = await S3.send(command);
  console.log(res);
};

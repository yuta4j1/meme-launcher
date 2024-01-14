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

export const putObject = async (
  bucketKey: string,
  file: Blob
): Promise<string> => {
  const command = new PutObjectCommand({
    Key: bucketKey,
    Bucket: "meme-bucket",
    Body: file,
    ContentType: file.type,
    ACL: "public-read",
  });
  await S3.send(command);
  return import.meta.env.VITE_BUCKET_BASE_URL + bucketKey;
};

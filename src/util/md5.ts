import { md5 } from "js-md5";

export const createBlobMd5 = async (src: Blob): Promise<string> => {
  return md5(await src.arrayBuffer());
};

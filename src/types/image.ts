export type CreateImageParam = {
  imageUrl: string;
  categoryId: number;
  tagList: string[];
};

export type ImageListReponse = {
  id: number;
  imageUrl: string;
  categoryId: number;
  tagList: string[];
}[];

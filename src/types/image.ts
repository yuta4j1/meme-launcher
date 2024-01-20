export type CreateImageParam = {
  imageUrl: string;
  categoryId: number;
  tagList: string[];
};

export type Image = {
  id: number;
  imageUrl: string;
  categoryId: number;
  tagList: string[];
};

type ImageList = Image[];

export type ImageListByCategories = {
  categoryId: number;
  images: ImageList;
}[];

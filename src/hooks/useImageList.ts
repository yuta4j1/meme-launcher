import useSWR from "swr";
import type { ImageListByCategories } from "../types/image";
import { getRequest } from "../api";

export const useImageList = () => {
  const { data, isLoading, error, mutate } = useSWR<ImageListByCategories>(
    "/images",
    getRequest
  );
  return { data, isLoading, error, mutate } as const;
};

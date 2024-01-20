import useSWR from "swr";
import type { ImageListByCategories } from "../types/image";
import { getRequest } from "../api";

export const useImageList = () => {
  const { data, isLoading, error } = useSWR<ImageListByCategories>(
    "/images",
    getRequest
  );
  return { data, isLoading, error } as const;
};

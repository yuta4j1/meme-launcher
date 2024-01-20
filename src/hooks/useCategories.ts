import { useMemo } from "react";
import useSWR from "swr";
import { getRequest } from "../api";
import type { CategoriesResponse } from "../types/category";

export const useCategories = () => {
  const { data, isLoading, error } = useSWR<CategoriesResponse>(
    "/categories",
    getRequest
  );

  const showData = useMemo(() => {
    return !isLoading && error === undefined && data !== undefined;
  }, [data, isLoading, error]);

  return { data, showData, isLoading, error } as const;
};

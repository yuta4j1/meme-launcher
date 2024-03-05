import { FC, useMemo } from "react";
import * as Select from "@radix-ui/react-select";
import useSWR from "swr";
import { getRequest } from "../../api";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Controller, Control } from "react-hook-form";
import type { CategoriesResponse } from "../../types/category";
import type { UploadFileForm } from "../UploadModal/formSchema";
import styles from "./CategorySelector.module.css";

export const CategorySelector: FC<{
  control: Control<UploadFileForm>;
}> = ({ control }) => {
  const { data, isLoading, error } = useSWR<CategoriesResponse>(
    "/categories",
    getRequest
  );

  const showCategoryItems = useMemo(() => {
    return !isLoading && error === undefined && data !== undefined;
  }, [data, isLoading, error]);

  return (
    <Controller
      control={control}
      name="categoryId"
      render={({ field }) => (
        <Select.Root onValueChange={field.onChange} {...field}>
          <Select.Trigger className={styles.selectTrigger} aria-label="feeling">
            <Select.Value placeholder="Select image feeling..." />
            <Select.Icon className={styles.selectIcon}>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={styles.selectContent}>
              <Select.ScrollUpButton>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className={styles.selectViewport}>
                <Select.Group>
                  {isLoading && (
                    <div className={styles.selectDataMessage}>loading...</div>
                  )}
                  {error !== undefined && (
                    <div className={styles.selectDataMessage}>
                      データの取得に失敗しました
                    </div>
                  )}
                  {showCategoryItems &&
                    data?.map((v) => (
                      <SelectItem
                        key={v.id}
                        value={v.id}
                        text={`${v.emoji} ${v.name}`}
                      />
                    ))}
                </Select.Group>
                <Select.Separator className="SelectSeparator" />
              </Select.Viewport>
              <Select.ScrollDownButton className="SelectScrollButton">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      )}
    ></Controller>
  );
};

const SelectItem: FC<{ value: number; text: string }> = ({ value, text }) => {
  return (
    <Select.Item value={String(value)} className={styles.selectItem}>
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator className={styles.selectItemIndicator}>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

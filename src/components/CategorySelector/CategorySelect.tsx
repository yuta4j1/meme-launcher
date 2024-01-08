import { FC, useMemo } from "react";
import * as Select from "@radix-ui/react-select";
import useSWR from "swr";
import { getRequest } from "../../api";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import type { CategoriesResponse } from "../../types/category";
import "./CategorySelector.css";

export const CategorySelector: FC<{
  categoryId: string;
  changeHandler: (value: string) => void;
}> = ({ categoryId, changeHandler }) => {
  const { data, isLoading, error } = useSWR<CategoriesResponse>(
    "/categories",
    getRequest
  );

  const showCategoryItems = useMemo(() => {
    return !isLoading && error === undefined && data !== undefined;
  }, [data, isLoading, error]);

  return (
    <Select.Root value={categoryId} onValueChange={(v) => changeHandler(v)}>
      <Select.Trigger className="select-trigger" aria-label="feeling">
        <Select.Value placeholder="Select image feeling..." />
        <Select.Icon className="select-icon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="select-content">
          <Select.ScrollUpButton>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="select-viewport">
            <Select.Group>
              {isLoading && (
                <div className="select-data-message">loading...</div>
              )}
              {error !== undefined && (
                <div className="select-data-message">
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
  );
};

const SelectItem: FC<{ value: number; text: string }> = ({ value, text }) => {
  return (
    <Select.Item value={String(value)} className="select-item">
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator className="select-item-indicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
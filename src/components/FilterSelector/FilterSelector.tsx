import { FC, Fragment } from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { useCategories } from "../../hooks/useCategories";
import styles from "./FilterSelector.module.css";

export const FilterSelector: FC<{
  categoryId: string;
  handleCategoryChange: (id: string) => void;
}> = ({ categoryId, handleCategoryChange }) => {
  const { data, showData, isLoading, error } = useCategories();

  return (
    <Select.Root
      value={categoryId}
      onValueChange={(v) => {
        handleCategoryChange(v);
      }}
    >
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
                <div className="select-data-message">loading...</div>
              )}
              {error !== undefined && (
                <div className="select-data-message">
                  データの取得に失敗しました
                </div>
              )}
              {showData && (
                <Fragment>
                  <SelectItem key={"all"} value={0} text="全て表示" />
                  {data?.map((v) => (
                    <SelectItem
                      key={v.id}
                      value={v.id}
                      text={`${v.emoji} ${v.name}`}
                    />
                  ))}
                </Fragment>
              )}
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
    <Select.Item value={String(value)} className={styles.selectItem}>
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator className={styles.selectItemIndicator}>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

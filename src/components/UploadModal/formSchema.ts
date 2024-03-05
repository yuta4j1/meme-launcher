import * as v from "valibot";

export const uploadFileSchema = v.object({
  file: v.blob("必須項目です。"),
  categoryId: v.string([v.minLength(1, "カテゴリを選択してください")]),
  keywords: v.array(
    v.object({
      id: v.string(),
      value: v.string([
        v.regex(/[a-z0-9_]*/, "英数字で入力してください。"),
        v.minLength(1, "一文字以上入力してください。"),
      ]),
    })
  ),
});

export type UploadFileForm = v.Input<typeof uploadFileSchema>;

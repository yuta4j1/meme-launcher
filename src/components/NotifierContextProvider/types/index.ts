export type NotifierState =
  | {
      show: true;
      message: string;
      type: "success";
    }
  | {
      show: true;
      message: string;
      type: "error";
    }
  | {
      show: false;
    };

type ExtractTypeProperty<T> = T extends { type: infer U } ? U : never;

export type NotifierType = ExtractTypeProperty<NotifierState>;

const colorMap: {
  [key in NotifierType]: string;
} = {
  success: "#5cb85c",
  error: "#ef5350",
};

export function notifierColor(type: NotifierType): string {
  return colorMap[type];
}

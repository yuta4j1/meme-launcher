export type NotifierState =
  | {
      show: true;
      message: string;
      type: "success";
      color: "#5cb85c";
    }
  | {
      show: true;
      message: string;
      type: "error";
      color: "#ef5350";
    }
  | {
      show: false;
    };

type ExtractTypeProperty<T> = T extends { type: infer U } ? U : never;

export type NotifierType = ExtractTypeProperty<NotifierState>;

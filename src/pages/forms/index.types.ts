export type FormType = {
  formId: string;
  created: string;
  formMadeUser: string;
  askList: {
    id: string;
    type: string;
    askTitle: string;
  }[];
};

export type FormsType = FormType[];

export interface FormsProps {
  forms: FormsType;
}

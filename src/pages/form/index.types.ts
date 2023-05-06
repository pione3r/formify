export interface TextAskFormType {
  id: string;
  type: string;
  askTitle: string;
}

export interface FormProps {
  form: {
    formId: string;
    created: string;
    formMadeUser: string;
    askList: {
      id: string;
      type: string;
      askTitle: string;
    }[];
  };
}

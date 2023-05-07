export interface FormAnswerProps {
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

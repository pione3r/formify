interface TextAskFormType {
  id: string;
  type: string;
  askTitle: string;
}

export interface TextAskFormProps {
  index: number;
  질문: TextAskFormType;
  질문제목수정?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

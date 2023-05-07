interface QuestionType {
  questionId: string;
  questionType: string;
  questionTitle: string;
}

export interface TextAskFormProps {
  index: number;
  질문: QuestionType;
  질문제목수정?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

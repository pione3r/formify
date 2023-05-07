export interface SimpleTextQuestionFormProps {
  질문순서: number;
  질문제목: string;
  질문제목수정: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

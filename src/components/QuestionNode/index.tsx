import * as S from "./index.styles";
import type { QuestionNodeProps } from "./index.types";

export function QuestionNode({
  node,
  onNodeMove,
  onQuestionTitleChange,
  onQuestionOptionTitleChange,
  onAddNewQuestionOption,
  onConnectStart,
  onConnectToEndNode,
  onConnectToExistNode,
  onDeleteNode,
}: QuestionNodeProps) {
  switch (node.questionId) {
    case "start":
      return (
        <S.QuestionNodeWrapper
          style={{
            transform: ` translate(${node.position.x}px, ${node.position.y}px)`,
          }}
          className="start"
          onMouseDown={(event) => onNodeMove(event, node.questionId)}
        >
          <S.QuestionHeader>
            <S.QuestionIndex>시작 질문</S.QuestionIndex>
            <S.QuestionTitleInput
              placeholder="질문 제목을 입력해주세요"
              value={node.data.questionTitle}
              onChange={(event) =>
                onQuestionTitleChange(event, node.questionId)
              }
            />
          </S.QuestionHeader>

          <S.OptionAddButton
            onClick={() => onAddNewQuestionOption(node.questionId)}
          >
            옵션추가
          </S.OptionAddButton>

          {node.data.options ? (
            <S.OptionsWrapper>
              {node.data.options.map((option, optionIndex) => (
                <S.OptionWrapper key={optionIndex}>
                  <S.OptionTitleInput
                    placeholder="답변을 입력해주세요"
                    value={option}
                    onChange={(event) =>
                      onQuestionOptionTitleChange(
                        event,
                        node.questionId,
                        optionIndex
                      )
                    }
                  />
                  <S.OptionConnectStartHandle
                    data-id={`${node.questionId}.${optionIndex}`}
                    onMouseDown={onConnectStart}
                  />
                </S.OptionWrapper>
              ))}
            </S.OptionsWrapper>
          ) : (
            <S.ConnectStartHandle
              data-id={node.questionId}
              onMouseDown={onConnectStart}
            />
          )}
        </S.QuestionNodeWrapper>
      );

    case "end":
      return (
        <S.QuestionNodeWrapper
          style={{
            transform: ` translate(${node.position.x}px, ${node.position.y}px)`,
          }}
          className="end"
          onMouseDown={(event) => onNodeMove(event, node.questionId)}
          onMouseUp={onConnectToEndNode}
        >
          <S.QuestionHeader>
            <S.QuestionIndex>마지막 질문</S.QuestionIndex>
            <S.QuestionTitleInput
              placeholder="질문 제목을 입력해주세요"
              value={node.data.questionTitle}
              onChange={(event) =>
                onQuestionTitleChange(event, node.questionId)
              }
            />
          </S.QuestionHeader>

          <S.OptionAddButton
            onClick={() => onAddNewQuestionOption(node.questionId)}
          >
            옵션추가
          </S.OptionAddButton>

          {node.data.options ? (
            <S.OptionsWrapper>
              {node.data.options.map((option, optionIndex) => (
                <S.OptionWrapper key={optionIndex}>
                  <S.OptionTitleInput
                    placeholder="답변을 입력해주세요"
                    value={option}
                    onChange={(event) =>
                      onQuestionOptionTitleChange(
                        event,
                        node.questionId,
                        optionIndex
                      )
                    }
                  />
                </S.OptionWrapper>
              ))}
            </S.OptionsWrapper>
          ) : null}
        </S.QuestionNodeWrapper>
      );

    default:
      return (
        <S.QuestionNodeWrapper
          style={{
            transform: ` translate(${node.position.x}px, ${node.position.y}px)`,
          }}
          data-id={node.questionId}
          className="node"
          onMouseDown={(event) => onNodeMove(event, node.questionId)}
          onMouseUp={onConnectToExistNode}
        >
          <S.QuestionHeader>
            <S.QuestionTitleInput
              placeholder="질문 제목을 입력해주세요"
              value={node.data.questionTitle}
              onChange={(event) =>
                onQuestionTitleChange(event, node.questionId)
              }
            />
            <S.QuestionDeleteButton
              onClick={() => onDeleteNode(node.questionId)}
            >
              <S.DeleteButtonIcon
                src="/images/delete-button.svg"
                alt="delete-button"
                width={20}
                height={20}
              />
            </S.QuestionDeleteButton>
          </S.QuestionHeader>

          <S.OptionAddButton
            onClick={() => onAddNewQuestionOption(node.questionId)}
          >
            옵션추가
          </S.OptionAddButton>

          {node.data.options ? (
            <S.OptionsWrapper>
              {node.data.options.map((option, optionIndex) => (
                <S.OptionWrapper key={optionIndex}>
                  <S.OptionTitleInput
                    placeholder="답변을 입력해주세요"
                    value={option}
                    onChange={(event) =>
                      onQuestionOptionTitleChange(
                        event,
                        node.questionId,
                        optionIndex
                      )
                    }
                  />
                  <S.OptionConnectStartHandle
                    data-id={`${node.questionId}.${optionIndex}`}
                    onMouseDown={onConnectStart}
                  />
                </S.OptionWrapper>
              ))}
            </S.OptionsWrapper>
          ) : (
            <S.ConnectStartHandle
              data-id={node.questionId}
              onMouseDown={onConnectStart}
            />
          )}
        </S.QuestionNodeWrapper>
      );
  }
}

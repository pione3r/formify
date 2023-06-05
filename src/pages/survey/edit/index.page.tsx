import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useRef, useState } from "react";

import * as S from "./index.styles";
import type {
  QuestionNode,
  QuestionEdge,
  SurveyEditPageProps,
} from "./index.types";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].api";
import { Backend_API_URL } from "@/common/url";

import { BezierArrow } from "@/components/BezierArrow";
import { SurveyPreview } from "@/components/SurveyPreview";
import { useConnect } from "@/hooks/useConnect";

const initialQuestionNodes = [
  {
    questionId: "start",
    data: { questionTitle: "" },
    position: { top: 100, left: 200 },
  },
  {
    questionId: "end",
    data: { questionTitle: "" },
    position: { top: 150, left: 1200 },
  },
];

export default function SurveyEditPage({ userEmail }: SurveyEditPageProps) {
  const router = useRouter();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [ratio, setRatio] = useState(1);

  const [screenPos, setScreenPos] = useState({ x: 0, y: 0 });

  const [설문제목, set설문제목] = useState("");

  const [questionNodes, setQuestionNodes] =
    useState<QuestionNode[]>(initialQuestionNodes);

  const [questionEdges, setQuestionEdges] = useState<QuestionEdge[]>([]);

  const isEdgeAlreadyExist = (sourceId: string) =>
    questionEdges.find((edge) => edge.source === sourceId) ? true : false;

  const 노드추가 = (newNode: QuestionNode) =>
    setQuestionNodes((prev) => prev.concat(newNode));

  const 엣지추가 = (newEdge: QuestionEdge) =>
    setQuestionEdges((prev) => prev.concat(newEdge));

  const {
    onConnectStart,
    onConnectToNewNode,
    onConnectToExistNode,
    onConnectToEndNode,
  } = useConnect(screenPos, ratio, isEdgeAlreadyExist, 노드추가, 엣지추가);

  const onNodeDragStart = (
    mouseDownEvent: React.MouseEvent,
    nodeId: string
  ) => {
    mouseDownEvent.stopPropagation();

    const element = mouseDownEvent.currentTarget as HTMLElement;

    const startLeft = Number.parseInt(element.style.left);
    const startRight = Number.parseInt(element.style.top);

    const onNodeDragMove = (moveEvent: MouseEvent) => {
      const newLeft =
        startLeft + (moveEvent.pageX - mouseDownEvent.pageX) / ratio;
      const newTop =
        startRight + (moveEvent.pageY - mouseDownEvent.pageY) / ratio;

      const copiedQuestionNodes = [...questionNodes];
      const newQuestionNodes = copiedQuestionNodes.map((questionNode) =>
        questionNode.questionId === nodeId
          ? {
              ...questionNode,
              position: {
                top: newTop,
                left: newLeft,
              },
            }
          : questionNode
      );

      setQuestionNodes(newQuestionNodes);
    };

    const onNodeDragEnd = () => {
      document.removeEventListener("mousemove", onNodeDragMove);
      document.removeEventListener("mouseup", onNodeDragEnd);
    };

    document.addEventListener("mousemove", onNodeDragMove);
    document.addEventListener("mouseup", onNodeDragEnd, {
      once: true,
    });
  };

  const onDeleteNode = (nodeId: string) => {
    const copiedQuestionNodes = [...questionNodes];
    const copiedQuestionEdges = [...questionEdges];

    const newQuestionNodes = copiedQuestionNodes.filter(
      (question) => question.questionId !== nodeId
    );
    const newQuestionEdges = copiedQuestionEdges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    setQuestionNodes(newQuestionNodes);
    setQuestionEdges(newQuestionEdges);
  };

  const onAddNewQuestionOption = (nodeId: string) => {
    const copiedQuestionNodes = [...questionNodes];

    const index = copiedQuestionNodes.findIndex(
      (question) => question.questionId === nodeId
    );

    const options = copiedQuestionNodes[index].data.options;

    if (options) {
      copiedQuestionNodes[index].data.options = [...options, ""];
    } else {
      copiedQuestionNodes[index].data.options = [""];
    }

    const copiedQuestionEdges = [...questionEdges];

    const newQuestionEdges = copiedQuestionEdges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    setQuestionNodes(copiedQuestionNodes);
    setQuestionEdges(newQuestionEdges);
  };

  const onQuestionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nodeId: string
  ) => {
    const copiedQuestionNodes = [...questionNodes];

    const index = copiedQuestionNodes.findIndex(
      (question) => question.questionId === nodeId
    );

    copiedQuestionNodes[index].data.questionTitle = event.target.value;

    setQuestionNodes(copiedQuestionNodes);
  };

  const onQuestionOptionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    nodeId: string,
    optionIndex: number
  ) => {
    const copiedQuestionNodes = [...questionNodes];

    const newQuestionNodes = copiedQuestionNodes.map((node) =>
      node.questionId === nodeId
        ? {
            ...node,
            data: {
              ...node.data,
              options: node.data.options?.map((option, idx) =>
                idx === optionIndex ? event.target.value : option
              ),
            },
          }
        : node
    );
    setQuestionNodes(newQuestionNodes);
  };

  return (
    <>
      <Head>
        <title>{`작성중 ${설문제목 === "" ? "" : `| ${설문제목}`}`}</title>
      </Head>
      <S.ViewFrame
        className="view-frame"
        onMouseUp={onConnectToNewNode}
        onMouseEnter={() => (document.body.style.overflow = "hidden")}
        onMouseLeave={() => document.body.removeAttribute("style")}
        onWheel={(wheelEvent) =>
          setRatio(
            Math.min(Math.max(0.5, ratio + wheelEvent.deltaY * -0.001), 2)
          )
        }
        onMouseDown={(mouseDownEvent) => {
          const viewFrameElement = mouseDownEvent.currentTarget;
          viewFrameElement.style.cursor = "grabbing";

          const onMouseMoveHandler = (mouseMoveEvent: MouseEvent) => {
            const dX =
              screenPos.x + mouseMoveEvent.pageX - mouseDownEvent.pageX;
            const dY =
              screenPos.y + mouseMoveEvent.pageY - mouseDownEvent.pageY;

            setScreenPos({ x: dX, y: dY });
          };

          const onMouseUpHandler = () => {
            viewFrameElement.removeAttribute("style");

            document.removeEventListener("mousemove", onMouseMoveHandler);
            document.removeEventListener("mouseup", onMouseUpHandler);
          };
          document.addEventListener("mousemove", onMouseMoveHandler);
          document.addEventListener("mouseup", onMouseUpHandler, {
            once: true,
          });
        }}
      >
        <S.Wrapper
          ref={wrapperRef}
          style={{
            transform: ` translate(${screenPos.x}px, ${screenPos.y}px) scale(${ratio})`,
          }}
          className="flow-wrapper"
          onMouseUp={onConnectToNewNode}
        >
          {questionNodes.map((node) => {
            switch (node.questionId) {
              case "start":
                return (
                  <S.QuestionNodeWrapper
                    key={node.questionId}
                    style={{
                      top: `${node.position.top}px`,
                      left: `${node.position.left}px`,
                    }}
                    className="start"
                    onMouseDown={(event) =>
                      onNodeDragStart(event, node.questionId)
                    }
                  >
                    <S.QuestionHeader>
                      <S.SurveyTitleInputWrapper>
                        <S.SurveyTitleInput
                          placeholder="설문 제목을 입력하세요."
                          value={설문제목}
                          onChange={(event) => set설문제목(event.target.value)}
                          spellCheck={false}
                        />
                      </S.SurveyTitleInputWrapper>
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
                    key={node.questionId}
                    style={{
                      top: `${node.position.top}px`,
                      left: `${node.position.left}px`,
                    }}
                    className="end"
                    onMouseDown={(event) =>
                      onNodeDragStart(event, node.questionId)
                    }
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

                    <S.SubmitButton
                      onClick={async () => {
                        if (설문제목 === "") {
                          alert("설문 제목을 입력하세요");
                          return;
                        }

                        const response = await fetch(
                          `${Backend_API_URL}/survey`,
                          {
                            method: "POST",
                            body: JSON.stringify({
                              surveyTitle: 설문제목,
                              survey: {
                                questionNodes,
                                questionEdges,
                              },
                            }),
                          }
                        );

                        if (response.status === 201) {
                          alert("질문폼 생성 성공");
                          router.replace(`/surveys/${userEmail}`);
                        }
                        if (response.status === 401) {
                          alert("질문폼 생성 실패");
                        }
                      }}
                    >
                      폼 생성하기
                    </S.SubmitButton>

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
                    key={node.questionId}
                    style={{
                      top: `${node.position.top}px`,
                      left: `${node.position.left}px`,
                    }}
                    data-id={node.questionId}
                    className="question"
                    onMouseDown={(event) =>
                      onNodeDragStart(event, node.questionId)
                    }
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
          })}
          <DrawEdges
            questionNodes={questionNodes}
            questionEdges={questionEdges}
          />
        </S.Wrapper>
      </S.ViewFrame>
      <SurveyPreview
        surveyTitle={설문제목}
        questionNodes={questionNodes}
        questionEdges={questionEdges}
      />
    </>
  );
}

function DrawEdges({
  questionNodes,
  questionEdges,
}: {
  questionNodes: QuestionNode[];
  questionEdges: QuestionEdge[];
}) {
  return (
    <S.DrawEdgesWrapper>
      {questionEdges.map((edge) => {
        if (edge.edgeId.includes(".")) {
          const [sourceNodeId, optionIndex] = edge.source.split(".");
          const sourceNode = questionNodes.find(
            (node) => node.questionId === sourceNodeId
          );

          const target = questionNodes.find(
            (node) => node.questionId === edge.target
          );

          return (
            <BezierArrow
              key={edge.edgeId}
              startPoint={{
                x: sourceNode?.position.left! + 300,
                y: sourceNode?.position.top! + 242 + Number(optionIndex) * 53,
              }}
              endPoint={{
                x: target?.position.left!,
                y: target?.position.top! + 100,
              }}
            />
          );
        } else {
          const source = questionNodes.find(
            (node) => node.questionId === edge.source
          );

          const target = questionNodes.find(
            (node) => node.questionId === edge.target
          );

          return (
            <BezierArrow
              key={edge.edgeId}
              startPoint={{
                x: source?.position.left! + 300,
                y: source?.position.top! + 100,
              }}
              endPoint={{
                x: target?.position.left!,
                y: target?.position.top! + 100,
              }}
            />
          );
        }
      })}
    </S.DrawEdgesWrapper>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session)
    return {
      redirect: {
        destination: "/",
      },
    };

  return { props: { userEmail: session?.user?.email } };
}

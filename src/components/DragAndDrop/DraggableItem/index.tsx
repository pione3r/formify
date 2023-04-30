import * as S from "./index.styles";
import { useDraggable } from "./useDraggable";

export function DraggableItem() {
  const isTouchScreen =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const { position, onMouseDownHandler, onTouchDownHandler } =
    useDraggable(isTouchScreen);

  const style = {
    transform: `translateX(${position.x}px) translateY(${position.y}px)`,
  };

  return isTouchScreen ? (
    <S.Wrapper style={style} onTouchStart={onTouchDownHandler}></S.Wrapper>
  ) : (
    <S.Wrapper style={style} onMouseDown={onMouseDownHandler}></S.Wrapper>
  );
}

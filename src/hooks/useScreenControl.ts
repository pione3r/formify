import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setScreenMove, setScreenZoom } from "@/stores/screenSlice";

export function useScreenControl() {
  const { x, y, ratio } = useAppSelector((state) => state.screen);

  const dispatch = useAppDispatch();

  const screenTransition = ` translate(${x}px, ${y}px) scale(${ratio})`;

  const onScreenEnter = () => (document.body.style.overflow = "hidden");

  const onScreenLeave = () => document.body.removeAttribute("style");

  const onScreenZoom = (wheelEvent: React.WheelEvent) =>
    dispatch(
      setScreenZoom({
        ratio: Math.min(Math.max(0.5, ratio + wheelEvent.deltaY * -0.001), 2),
      })
    );

  const onScreenMove = (mouseDownEvent: React.MouseEvent) => {
    const viewFrameElement = mouseDownEvent.currentTarget as HTMLElement;
    viewFrameElement.style.cursor = "grabbing";

    const onMouseMoveHandler = (mouseMoveEvent: MouseEvent) => {
      const dX = x + mouseMoveEvent.pageX - mouseDownEvent.pageX;
      const dY = y + mouseMoveEvent.pageY - mouseDownEvent.pageY;

      dispatch(setScreenMove({ x: dX, y: dY }));
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
  };

  return {
    screenTransition,
    onScreenEnter,
    onScreenLeave,
    onScreenZoom,
    onScreenMove,
  };
}

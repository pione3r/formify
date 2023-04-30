import { useState } from "react";

export function useDraggable(isTouchScreen: boolean) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return isTouchScreen
    ? {
        position,
        onTouchDownHandler: (touchEvent: React.TouchEvent) => {
          touchEvent.stopPropagation();

          const onTouchMoveHandler = (touchMoveEvent: TouchEvent) => {
            if (touchMoveEvent.cancelable) touchMoveEvent.preventDefault();

            const dX =
              touchMoveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
            const dY =
              touchMoveEvent.touches[0].pageY - touchEvent.touches[0].pageY;

            setPosition({
              x: position.x + dX,
              y: position.y + dY,
            });
          };

          const onTouchEndHandler = () => {
            document.removeEventListener("touchmove", onTouchMoveHandler);
          };

          document.addEventListener("touchmove", onTouchMoveHandler, {
            passive: false,
          });
          document.addEventListener("touchend", onTouchEndHandler, {
            once: true,
          });
        },
      }
    : {
        position,
        onMouseDownHandler: (mouseDownEvent: React.MouseEvent) => {
          mouseDownEvent.stopPropagation();

          const onMouseMoveHandler = (mouseMovevent: MouseEvent) => {
            const dX = mouseMovevent.screenX - mouseDownEvent.screenX;
            const dY = mouseMovevent.screenY - mouseDownEvent.screenY;

            setPosition({
              x: position.x + dX,
              y: position.y + dY,
            });
          };

          const onMouseUpHandler = () => {
            document.removeEventListener("mousemove", onMouseMoveHandler);
          };

          document.addEventListener("mousemove", onMouseMoveHandler);
          document.addEventListener("mouseup", onMouseUpHandler, {
            once: true,
          });
        },
      };
}

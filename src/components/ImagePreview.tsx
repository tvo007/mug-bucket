import React, { MouseEvent, useRef, useState, useEffect } from "react";
import { CloseIcon, ImagePreviewStyle, Overlay } from "../styles";
import {
  IoClose,
  IoCloseCircleOutline,
  IoCloseCircleSharp,
} from "react-icons/io5";

export type ImagePreviewProps = {
  source: string | "";
  reset: () => void;
};

export const ImagePreview = ({ source, reset }: ImagePreviewProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log(overlayRef.current);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  //escape key exits overlay

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === overlayRef.current) {
      setVisible(false);
    }
  };
  //exits when you click outside of image in overlay

  return (
    <div>
      <div style={{ position: "relative" }}>
        <ImagePreviewStyle
          url={source}
          style={{ margin: "10px 0" }}
          onClick={() => setVisible(true)}
          // onKeyDown={}
        />
        <IoCloseCircleSharp
          size={30}
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            cursor: "pointer",
            color: "red",
          }}
          onClick={(e) => reset()}
        />
        {visible && (
          <Overlay ref={overlayRef} onClick={onOverlayClick}>
            <img src={source} alt={"img_preview"} width={1000} />
            <CloseIcon onClick={() => setVisible(false)}>
              <IoClose size={70} />
            </CloseIcon>
          </Overlay>
        )}
      </div>
    </div>
  );
};

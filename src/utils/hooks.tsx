import { useState } from "react";
import { defaultImage } from "./constants";
import { ImageType } from "./types";

export const useImageUpload = () => {
  const [image, setImage] = useState<ImageType>(defaultImage);
  const [source, setSource] = useState(``);
  const [file, setFile] = useState<File | null>();
  const [showBorder, setShowBorder] = useState(false); //controls border animation on drag

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;

    if (files && files.length) {
      const file = files.item(0);

      if (file) {
        const source = URL.createObjectURL(file);
        setImage((prevState) => ({ ...prevState, source, file }));
      }

      setSource(URL.createObjectURL(file));

      setFile(file);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setImage((prevState) => ({ ...prevState, hover: false }));

    // setShowBorder(false);
    const { files } = e.dataTransfer;
    const file = files.item(0);

    if (file) {
      const source = URL.createObjectURL(file);
      setImage((prevState) => ({ ...prevState, source, file }));
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setImage((prevState) => ({ ...prevState, hover: true }));
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setImage((prevState) => ({ ...prevState, hover: false }));
  };

  return {
    image,
    setImage,
    source,
    file,
    showBorder,
    // onFileChange,
    // onDrop,
    // onDragOver,
    // onDragLeave,
    handlers: {
      onFileChange,
      onDrop,
      onDragOver,
      onDragLeave,
    },
  };
};

import React, { useRef, useState } from "react";
import {
  ImageUploadContainer,
  Button,
  FileInput,
  Label,
  Text,
  Container,
  ImagePreviewContainer,
  ImagePreviewStyle,
  Flex,
} from "../styles/index";
import { IoCloudUploadOutline } from "react-icons/io5";

import { ImagePreview } from "./ImagePreview";
import { postUploadImage } from "../utils/api";
import { useHistory } from "react-router";
import { Spinner } from "./Spinner";
import { ScaleLoader } from "react-spinners";

export const ImageUpload = () => {
  const [showBorder, setShowBorder] = useState(false); //controls border animation on drag
  const [source, setSource] = useState(``);
  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageUploadRef = useRef<HTMLDivElement>(null);

  const isDisabled = () => {
    return loading || !file;
  };

  const reset = () => {
    setFile(undefined);
    setSource("");
  };

  const uploadImage = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const data = new FormData();

      data.append("file", file);
      const { data: key } = await postUploadImage(data);
      history.push(`/img/${key}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowBorder(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowBorder(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowBorder(false);
    const { files } = e.dataTransfer;
    const file = files.item(0);

    if (file) {
      setSource(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const { files } = e.target;

    if (files && files.length) {
      const file = files.item(0);

      setSource(URL.createObjectURL(file));

      setFile(file);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === imageUploadRef.current) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Container>
      {loading && <Spinner children={<ScaleLoader color="#fff" />} />}
      <ImageUploadContainer
        ref={imageUploadRef}
        showBorder={showBorder}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div>
          <Label
            htmlFor="file"
            children="Upload Image"
            onClick={(e) => e.preventDefault()}
          />
          <Text children="Click to upload a file. (You can also drag and drop)" />
          <FileInput
            ref={fileInputRef}
            id="file"
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif"
            onChange={handleFileChange}
          />
          
        </div>
        
        {source && <ImagePreview source={source} reset={reset} />}
      </ImageUploadContainer>

      <Button
        style={{ margin: `10px 0` }}
        onClick={uploadImage}
        disabled={isDisabled()}
      >
        <Flex alignItems="center" justifyContent="center">
          <IoCloudUploadOutline size={25} />
        </Flex>
      </Button>
    </Container>
  );
};

//todo: add spinner

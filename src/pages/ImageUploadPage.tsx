import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useHistory } from "react-router";
import { BarLoader } from "react-spinners";
import { ImageOptions } from "../components/ImageOptions";
import { ImagePreview } from "../components/ImagePreview";
import { ImageUpload } from "../components/ImageUpload";
import { Spinner } from "../components/Spinner";
import {
  Button,
  Container,
  FileInput,
  Flex,
  ImageUploadContainer,
  Label,
  Page,
  Text,
} from "../styles";
import { postUploadImage } from "../utils/api";
import { defaultImageOptions } from "../utils/constants";
import { useImageUpload } from "../utils/hooks";
import { ImageOptionsType } from "../utils/types";

export const ImageUploadPage = () => {
  const { image, setImage, showBorder, handlers } = useImageUpload();
  const { onFileChange, onDragLeave, onDragOver, onDrop } = handlers;
  const { source, file, hover } = image;
  const [loading, setLoading] = useState(false);
  const [imageOptions, setImageOptions] =
    useState<ImageOptionsType>(defaultImageOptions);

  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  // const fileInputRef = useRef<HTMLInputElement>(null);
  const imageUploadRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {

  // }, [source, file])

  const isDisabled = () => {
    return loading || !file;
  };

  const reset = () => {
    setImage({ file: undefined, source: "", hover: false });
    const newState = {
      isNsfw: false,
      isProtected: false,
      password: "",
      error: "",
    };
    setImageOptions(newState);
    formRef.current?.reset();
  };

  const checkImagePassword = () => {
    if (imageOptions.isProtected) {
      if (!imageOptions.password) {
        const error = "Password Required";
        setImageOptions((prevState) => ({
          ...prevState,
          error,
        }));
        return false;
      }
    }

    setImageOptions((prevState) => ({
      ...prevState,
      error: "",
    }));
    return true;
  };

  const uploadImage = async () => {
    //check if private is true
    //if true, check if pw field is empty
    //pw field empty?
    //display error

    if (!file) return;

    if (checkImagePassword()) {
      try {
        setLoading(true);
        const data = new FormData();

        data.append("file", file);
        data.append("isNsfw", `${imageOptions.isNsfw}`);
        data.append("isProtected", `${imageOptions.isProtected}`);
        data.append("password", `${imageOptions.password}`);

        const { data: key } = await postUploadImage(data);
        history.push(`/img/${key}`);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Image password set to true but no password provided.");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === imageUploadRef.current) {
      // fileInputRef.current?.click();
      const fileInput = formRef.current?.childNodes.item(2) as HTMLInputElement;
      fileInput.click();
    }
  };

  return (
    <Page
      alignItems="center"
      justifyContent="center"
      flex
      flexDirection="column"
    >
      <Container>
        {loading && <Spinner children={<BarLoader color="#fff" />} />}
        <ImageUploadContainer
          ref={imageUploadRef}
          showBorder={hover}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={handleClick}
        >
          <form ref={formRef}>
            <Label
              htmlFor="file"
              children="Upload Image"
              onClick={(e) => e.preventDefault()}
            />
            <Text children="Click to upload a file. (You can also drag and drop)" />
            <FileInput
              id="file"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              onChange={onFileChange}
            />
          </form>
          {source && <ImagePreview source={source} reset={reset} />}
        </ImageUploadContainer>
        {file && (
          <ImageOptions
            imageOptions={imageOptions}
            setImageOptions={setImageOptions}
          />
        )}
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
      {/* <ImagePreviewContainer src={source} width={700} /> */}
    </Page>
  );
};

//fileInputRef was there to programattically open file explorerer

import styled, { css } from "styled-components";
import { fadeIn } from "./keyframes";

export type ImageUploadContainerProps = {
  showBorder?: boolean;
};

export const Container = styled.div`
  z-index: 10;
  @media (min-width: 320px) {
    width: 400px;
  }
  @media (min-width: 1024px) {
    width: 800px;
  }
`;

export const ImageUploadContainer = styled.div<ImageUploadContainerProps>`
  width: 100%;
  border-radius: 10px;
  background-color: #303030;
  box-sizing: border-box;
  padding: 50px;
  border-radius: 10px;
  ${({ showBorder }) =>
    showBorder &&
    css`
      border: 2px solid #119dfa;
    `}

  display: flex;

  @media (min-width: 320px) {
    height: 400px;
    flex-direction: column;
    justify-content: space-between;
  }
  @media (min-width: 1024px) {
    height: 200px;
    flex-direction: row;
    align-items: center;
  }
`;

// export type PageProps = {
//     flex?: boolean;
//     flexAlign?: string;
//     justifyContent?: string;
//     flexGrow?: string;
//     flexDirection?: string;
// }

export const ImagePreviewContainer = styled.img`
  width: 150px;
`;

export type ImagePreviewProps = {
  url?: string;
};

export const ImagePreviewStyle = styled.div<ImagePreviewProps>`
  @media (min-width: 320px) {
    margin: 10px 125px;
  }
  @media (min-width: 1024px) {
    margin: 10px 0;
  }

  border-radius: 10px;
  width: 175px;
  height: 125px;
  ${({ url }) => css`
    background: url(${url});
  `}
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: ${fadeIn} 500ms;
`;

//^allows user to access image via bigger overlay

export type PageProps = Partial<{
  flex: boolean;
  alignItems: string;
  justifyContent: string;
  flexGrow: string;
  flexDirection: string;
  url: string;
}>;

//Partial type makes all props optional

export const Page = styled.div<PageProps>`
  z-index: 1;
  ${({ url }) => css`
    background: url(${url}) no-repeat center center fixed;
  `}
  background-size: cover;
  overflow: hidden;
  height: 100%;
  width: 100%;
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
    `}
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const OpacityLayer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  background-color: black;
  z-index: 2;
`;

//reusable page prop to flexibly style a page

export const Text = styled.p`
  color: #8a8a8a;
`;

export const Label = styled.label`
  font-size: 22px;
`;

export const FileInput = styled.input`
  ${({ type }) =>
    type === "file" &&
    css`
      display: none;
    `}
`;

export const Button = styled.button`
  padding: 10px 50px;
  width: 100%;
  box-sizing: border-box;
  background-color: #0062ff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: 250ms background-color ease-in-out;
  :hover {
    background-color: #0e66f3;
  }
  :active {
    background-color: #2478ff;
  }
  :disabled {
    background-color: #2478ff2b;
    color: #ffffff2f;
  }
`;

export const Overlay = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000b1;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 200ms;
  z-index: 999;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: #fff;
  :hover {
    color: red;
  }
`;

export type FlexProps = Partial<{
  alignItems: string;
  justifyContent: string;
  flexDirection: string;
  flexGrow: string;
}>;

export const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const Checkbox = styled.input`
  ${({ type }) =>
    type === "checkbox" &&
    css`
      height: 18px;
      width: 18px;
      margin: 0;
    `}
`;

export const ImageOptionsContainer = styled.section`
  width: 100%;
  margin-top: 10px;
  background-color: #303030;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px 20px;
  display: flex;
`;

export type InputContainerProps = Partial<{
  error: any;
}>;

export const InputContainer = styled.div<InputContainerProps>`
  background-color: #303030;
  border: 2px solid #303030;
  outline: none;
  box-sizing: border-box;
  padding: 12px 20px;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  color: #fff;
  transition: 200ms border ease-in-out;
  ${({ error }) =>
    error &&
    css`
      border: 2px solid red;
    `}
`;

export const InputLabel = styled.label`
  font-size: 12px;
`;

export const InputErrorMessage = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  color: red;
  animation: ${fadeIn} 200ms;
`;

export const PasswordField = styled.input`
  outline: none;
  background-color: inherit;
  border: none;
  color: #fff;
  padding: 0;
  width: 100%;
  height: 15px;
`;

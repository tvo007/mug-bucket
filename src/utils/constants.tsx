import { ImageOptionsType, ImageType } from "./types";

export const defaultImageOptions: ImageOptionsType = {
  isNsfw: false,
  isProtected: false,
  password: "",
  error: "",
};

export const defaultImage: ImageType = {
  source: "",
  file: undefined,
  hover: false,
};

import axios from "axios";
import { ImageReferenceType } from "./types";

export const API_URL = process.env.REACT_APP_API_URL;

export const SPACES_URL = process.env.REACT_APP_SPACES_URL;

export const MUG = process.env.REACT_APP_CLOUDINARY_URL

//changes

export const postUploadImage = (data: FormData) =>
  axios.post(`${API_URL}/image/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": true,
    },
  });

//send image from fe to api

export const getProtectedImage = (imageId: string, password: string) => {
  return axios.post(
    `${API_URL}/image/${imageId}`,
    {
      password,
    },
    { responseType: "blob" }
  );
};

export const getImageReference = (imageId: string) =>
  axios.get<ImageReferenceType>(`${API_URL}/image/${imageId}/reference`);

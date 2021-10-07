import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { BarLoader } from "react-spinners";
import {
  Flex,
  InputContainer,
  InputLabel,
  Page,
  PasswordField,
} from "../styles";
import { getImageReference, getProtectedImage, SPACES_URL } from "../utils/api";
import { Spinner } from "../components/Spinner";
// import { ImageReferenceType } from "../utils/types";

export const ImageResultPage = () => {
  //useRouteMatch hook
  const [reveal, setReveal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  const [password, setPassword] = useState("");
  const [bypass, setBypass] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [validated, setValidated] = useState(false);
  // const [imageReference, setImageReference] = useState<ImageReferenceType>();

  const { params } = useRouteMatch<{ key: string }>();

  useEffect(() => {
    const showImageResult = JSON.parse(
      localStorage.getItem("showImageResult") || "false"
    );
    const imagePassword = localStorage.getItem("imagePassword");
    localStorage.clear();
    console.log(showImageResult && imagePassword);
    if (showImageResult && imagePassword) {
      bypassImageProtection(imagePassword);
    } else callApi();
  }, []);

  const bypassImageProtection = async (password: string) => {
    try {
      setLoading(true);
      const { data } = await getProtectedImage(params.key, password);
      console.log(data);
      const blob = new Blob([data]);
      setSource(URL.createObjectURL(blob));
      setValidated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const callApi = async () => {
    try {
      setLoading(true);
      const { data: imageRef } = await getImageReference(params.key);

      imageRef.isProtected
        ? setIsProtected(true)
        : setSource(`${SPACES_URL}/${imageRef.imageId}`);

      imageRef.isNsfw ? setReveal(false) : setReveal(true);

      // console.log(data);
      // const { data } = await getUploadedImage(params.key);
      // const b64Source = Buffer.from(data).toString("base64");
      // // setSource(data);
      // setSource(b64Source);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //if img private => redirs to img without password for just one time

  const submitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await getProtectedImage(params.key, password);
      console.log(data);
      const blob = new Blob([data]);
      setSource(URL.createObjectURL(blob));
      setValidated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ImageComponent = (
    <Page
      alignItems="center"
      justifyContent="center"
      flex
      flexDirection="column"
    >
      {!reveal ? (
        <>
          <div style={{ position: "relative" }}>
            <img
              src={source}
              alt="img"
              width={800}
              style={{ filter: "blur(10px)" }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: 500,
              }}
              onClick={() => {
                setReveal(true);
              }}
            >
              Click to Reveal
            </div>
          </div>
        </>
      ) : (
        <img src={source} alt="img" width={800} />
      )}
    </Page>
  );

  if (loading) <Spinner children={<BarLoader color="#fff" />} />;

  if (bypass) return ImageComponent;

  if (isProtected && !validated) {
    return (
      <Page
        alignItems="center"
        justifyContent="center"
        flex
        flexDirection="column"
      >
        <form onSubmit={submitPassword}>
          <InputContainer>
            <Flex>
              <InputLabel htmlFor="img-password" children="Password" />
            </Flex>
            <PasswordField
              id="img-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
        </form>
      </Page>
    );
  } else return ImageComponent;
};

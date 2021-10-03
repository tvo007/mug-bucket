import { History } from "history";
import { useEffect, useState } from "react";
import { match, useRouteMatch } from "react-router";
import { BarLoader } from "react-spinners";
import { Page } from "../styles";
import { getUploadedImage } from "../utils/api";
import { Spinner } from "../components/Spinner";

export const ImageResultPage = () => {
  //useRouteMatch hook
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  const {
    params: { key },
  } = useRouteMatch<{ key: string }>();

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const { data } = await getUploadedImage(key);
        setSource(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    callApi();
  }, []);

  return loading ? (
    <Spinner children={<BarLoader color="#fff" />} />
  ) : (
    <Page
      alignItems="center"
      justifyContent="center"
      flex
      flexDirection="column"
    >
      <img src={source} alt="img" width={800} />
      {/* <div>Hi</div> */}
      {/* <ImagePreviewContainer src={source} width={700} /> */}
    </Page>
  );
};

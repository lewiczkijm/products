import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { sendProductMediaFile } from "../../queries";
import { BASE_URL } from "../../utils/Axios";
import { FileLoader } from "./FileLoader";
const MediaComponent_: React.FC<{ id: string; urls: string[] }> = ({ id, urls }) => {
  const [stateUrls, setStateUrls] = useState(urls);
  useEffect(() => {
    setStateUrls(urls);
  }, [urls]);

  const size = useMemo<"lg" | "md" | "sm">(() => {
    if (stateUrls.length < 2) return "lg";
    if (stateUrls.length % 2) return "sm";
    else return "md";
  }, [stateUrls]);

  const { mutate, isLoading } = useMutation(sendProductMediaFile, {
    onSuccess: (res) => {
      // add new file
      setStateUrls((urls) => [...urls, res]);
    },
  });

  return (
    <div className="media">
      <h5 className="card-title">Медиа</h5>
      <div className="images">
        {stateUrls.map((url) => (
          <div className={size} key={url}>
            <img src={BASE_URL + url} />
          </div>
        ))}
        <FileLoader className={size} load={isLoading} onChange={(file) => mutate({ id, file })} />
      </div>
    </div>
  );
};

export const MediaComponent = React.memo(MediaComponent_);

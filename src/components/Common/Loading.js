import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { CircleLoader } from "react-spinners";

const Loading = () => {
  return (
    <LoadingOverlay
      styles={{
        overlay: (base) => ({
          ...base,
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }),
      }}
      spinner={<CircleLoader color="white" />}
      active
    >
     
    </LoadingOverlay>
  );
};

export default Loading;

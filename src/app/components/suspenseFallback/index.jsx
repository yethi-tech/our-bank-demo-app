import CircularProgress from "@/components/shared/circularProgress";
import React from "react";

const SuspenseFallback = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 full-loader">
      <div className="py-2">
        <CircularProgress size="xlarge" />
      </div>
      <div className="full-loader-message">
        <h2 className="text-lg font-semibold">Loading. Please wait...</h2>
      </div>
    </div>
  );
};

export default SuspenseFallback;

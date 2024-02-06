"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="error__image">
        <Image
          src={"/error-illustration.svg"}
          alt="Error"
          width="256"
          height="256"
        />
      </div>
      <div className="error__title">
        <h2 className="text-tenjin-error font-semibold">
          Oops! Something snapped!
        </h2>
      </div>
      <div className="error__detail w-[60%] py-4 flex flex-row items-center justify-center">
        <p className="text-sm text-center w-full overflow-hidden whitespace-pre-wrap">
          {error.message}
        </p>
      </div>
    </div>
  );
}

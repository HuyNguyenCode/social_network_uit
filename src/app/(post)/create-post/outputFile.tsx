"use client";
import { useRef, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";

import { Cloudinary } from "@cloudinary/url-gen";
import { CldImage } from "next-cloudinary";
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

type OutputFileProps = {
  imageID: string;
};

const OutputFile = ({ imageID }: OutputFileProps) => {
  return (
    <>
      {imageID && imageID !== "undefined" && (
        <CldImage
          src={imageID}
          alt={imageID}
          loading="lazy"
          fill
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: "0px",
            color: "transparent",
            borderImage: "100%",
            borderRadius: "inherit",
            objectFit: "cover",
          }}
        />
      )}
    </>
  );
};

export default OutputFile;

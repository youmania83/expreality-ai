"use client";

import React from "react";
import Image, { ImageProps } from "next/image";

export default function SafeImage(props: ImageProps) {
  return (
    <Image
      {...props}
      onError={(e) => {
        e.currentTarget.srcset = "";
        e.currentTarget.src = "/projects/default.jpg";
        if (props.onError) {
          props.onError(e);
        }
      }}
    />
  );
}

"use client";

import React from "react";
import Image, { ImageProps } from "next/image";

export default function SafeImage(props: ImageProps) {
  const { alt = 'Exprealty image', onError, ...rest } = props;

  return (
    <Image
      {...rest}
      alt={alt}
      onError={(e) => {
        e.currentTarget.srcset = "";
        e.currentTarget.src = "/projects/default.jpg";
        if (onError) {
          onError(e);
        }
      }}
    />
  );
}

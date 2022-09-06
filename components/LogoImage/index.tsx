import React from "react";

interface Props {
  width: number;
  height: number;
}

const LogoImage = ({ width, height }: Props) => {
  return (
    <img
      src="https://rb.gy/ulxxee"
      width={width}
      height={height}
      className="cursor-pointer object-contain"
    />
  );
};

export default LogoImage;

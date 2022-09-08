import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Props {
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size: number | string;
}

export default function LoadingSpinner({ color, size }: Props) {
  return (
    <Box>
      <CircularProgress size={size} color={color} />
    </Box>
  );
}

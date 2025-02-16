import React from "react";
import { Alert, Stack, Typography } from "@mui/material";
import { getErrorMessage } from "@/util/getErrorMessage";

const ErrorAlert = ({ error }: { error: Error }) => {
  console.log(error, "err");
  if (!error) return null;
  return (
    <Alert severity="error">
      <Stack spacing={1}>
        <Typography variant="h6">
          Something Went Wrong, Please Try Again
        </Typography>
        <Typography variant="caption">{getErrorMessage(error)}</Typography>
      </Stack>
    </Alert>
  );
};

export default ErrorAlert;

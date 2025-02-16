import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { NextPage } from "next";
import { Form, Formik, FormikHelpers } from "formik";
import {
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { z } from "zod";
import TextInput from "@/components/common/UI/TextInput";
import { useMutationData } from "@/hooks/useMutationData";
import { ArrowRightIcon } from "@/assets/icons";
import { END_POINTS } from "@/constants/APIs";
import { login } from "@/store/auth/login";
import { getErrorMessage } from "@/util/getErrorMessage";
import { useSnackbar } from "notistack";

export enum AuthType {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

const SignIn: NextPage = () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);

  const handleAuthType = () => {
    setAuthType(authType === AuthType.LOGIN ? AuthType.SIGNUP : AuthType.LOGIN);
  };
  return (
    <Grid container alignItems="center">
      <Grid flex={1} justifyItems={"center"}>
        <Div>
          <Image
            src="/images/logoTest.jpg"
            alt="Guestna - link not found"
            layout="intrinsic"
            width={300} // Optional: provide width
            height={300} // Optional: provide height
          />
        </Div>
      </Grid>
      <Grid flex={1}>
        {authType === AuthType.LOGIN && (
          <SignInForm handleAuthType={handleAuthType} />
        )}
        {authType === AuthType.SIGNUP && (
          <SignUpForm handleAuthType={handleAuthType} />
        )}
      </Grid>
    </Grid>
  );
};

export default SignIn;

export const NAME: RegExp = /^[A-Za-z]{3,}$/;
export const PASSWORD_VALID: RegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationSchema = toFormikValidationSchema(
  z.object({
    username: z.string().email(),
    password: z
      .string()
      .regex(
        PASSWORD_VALID,
        "PASSWORD_WEAK: Must contain at least 8 characters, 1 letter, 1 number, and 1 special character."
      ),
  })
);

const validationSignUpSchema = toFormikValidationSchema(
  z.object({
    name: z.string().regex(NAME, "minimum of 3 alphabetic characters."),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        PASSWORD_VALID,
        "PASSWORD_WEAK: Must contain at least 8 characters, 1 letter, 1 number, and 1 special character."
      ),
  })
);

const SPACING = 4;

/**
 * Helper components
 */

const SignInForm: React.FC<{
  handleAuthType: () => void;
}> = ({ handleAuthType }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = useMutationData(
    END_POINTS.LOGIN, // Endpoint
    {
      method: "POST",
      onSuccess: login,
      onError: (error) => {
        enqueueSnackbar(getErrorMessage(error), {
          variant: "error",
          autoHideDuration: 5000,
        });
      },
    }
  );

  const handleSubmit = async (
    values: {
      username: string;
      password: string;
    },
    formikHelpers: FormikHelpers<{ username: string; password: string }>
  ) => {
    formikHelpers.setSubmitting(true);
    try {
      mutate(values);
    } catch (error) {
      console.log(error, "ee");
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <Stack
      //   spacing={SPACING}
      style={{
        background: theme.palette.common.white,
        padding: theme.spacing(0, SPACING),
      }}
    >
      {/* <ErrorAlert error={error} /> */}
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({}) => (
          <Form>
            <Grid
              container
              sx={{ height: "100vh" }}
              direction="column"
              justifyContent="center"
              spacing={SPACING}
            >
              <Grid size={{ sm: 12 }}>
                <Typography variant="h5">Welcome back</Typography>
              </Grid>
              <Grid container direction="column" spacing={SPACING}>
                <Grid>
                  <TextInput
                    name="username"
                    placeholder="Enter username"
                    label="Username"
                  />
                </Grid>

                <Grid>
                  <PasswordField />
                </Grid>
                <Grid container justifyContent={"center"}>
                  <Typography
                    fontSize={14}
                    color={"#007473"}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAuthType()}
                  >
                    Create New Account
                  </Typography>
                </Grid>
                <Grid container justifyContent="center">
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Sign in {ArrowRightIcon}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

const SignUpForm: React.FC<{
  handleAuthType: () => void;
}> = ({ handleAuthType }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = useMutationData(
    END_POINTS.SIGNUP, // Endpoint
    {
      method: "POST",
      onSuccess: () => {
        enqueueSnackbar("success", {
          variant: "success",
          autoHideDuration: 5000,
        });
        handleAuthType();
      },
      onError: (error) => {
        console.log(error, "error");
        enqueueSnackbar(getErrorMessage(error), {
          variant: "error",
          autoHideDuration: 5000,
        });
      },
    }
  );

  const handleSubmit = async (
    values: {
      name: string;
      email: string;
      password: string;
    },
    formikHelpers: FormikHelpers<{
      name: string;
      email: string;
      password: string;
    }>
  ) => {
    formikHelpers.setSubmitting(true);
    try {
      mutate(values);
    } catch (error) {
      console.log(error, "ee");
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <Stack
      style={{
        background: theme.palette.common.white,
        padding: theme.spacing(0, SPACING),
      }}
    >
      {/* <ErrorAlert error={error} /> */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSignUpSchema}
        onSubmit={handleSubmit}
      >
        {({}) => (
          <Form>
            <Grid
              container
              sx={{ height: "100vh" }}
              direction="column"
              justifyContent="center"
              spacing={SPACING}
            >
              <Grid>
                <Typography variant="h5">Registration</Typography>
              </Grid>
              <Grid container direction="column" spacing={SPACING}>
                <Grid>
                  <TextInput
                    name="name"
                    placeholder="Enter name"
                    label="name"
                  />
                </Grid>
                <Grid>
                  <TextInput
                    name="email"
                    placeholder="Enter email"
                    label="email"
                  />
                </Grid>
                <Grid>
                  <PasswordField />
                </Grid>
                <Grid container justifyContent={"center"}>
                  <Typography
                    fontSize={14}
                    color={"#007473"}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAuthType()}
                  >
                    Login
                  </Typography>
                </Grid>
                <Grid container justifyContent="center">
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    Sign in {ArrowRightIcon}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error">
          The Account must be an admin account to sign in successfully
        </Alert>
      </Snackbar>
    </Stack>
  );
};

const PasswordField = () => {
  const [show, setShow] = useState(false);

  return (
    <TextInput
      name="password"
      type={show ? "text" : "password"}
      placeholder="Enter password"
      label="Password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setShow((s) => !s);
              }}
            >
              {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const Div = styled("div")(`
   .image-gallery-slide-wrapper.bottom{
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
  }
`);

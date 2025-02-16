import React from "react";
import { Logout } from "@mui/icons-material";
import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/login";

const LogoutCom = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="flex-end"
      paddingRight={3}
      mb={3}
    >
      <Avatar alt="Remy Sharp" src="/logo.png" />
      <Typography fontWeight={500}>{"Admin"}</Typography>
      <ButtonLogout />
    </Stack>
  );
};

export default LogoutCom;

const ButtonLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
    window.location.reload();
  };
  return (
    <Tooltip title="Logout">
      <IconButton onClick={() => handleLogout()}>
        <Logout color="error" />
      </IconButton>
    </Tooltip>
  );
};

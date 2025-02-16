import React from "react";
import { Container, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../../public/images/logoTest.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LogoutCom from "../common/layout/logout";
import Grid from "@mui/material/Grid2";

const Home = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  if (!isLoggedIn) return <p>Redirecting...</p>;

  return (
    <Container>
      <Grid
        container
        width={"100%"}
        justifyContent="space-between"
        spacing={2}
      >
        <Grid justifyItems={"center"}>
          <Image src={logo} width={500} height={500} alt="LEAP Logo" />
          <Typography variant="subtitle1" color="#008F8F" fontWeight={600}>
            {"Welcome to the application >> "} {user?.name}
          </Typography>
        </Grid>
        <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
          <LogoutCom />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

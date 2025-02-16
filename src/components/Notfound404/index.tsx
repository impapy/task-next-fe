import React from "react";
import { Container, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: 500,
        display: "flex",
        alignItems: "center",
        "& img": {
          float: { xs: "unset", sm: "right" },
          textAlign: { xs: "center", sm: "unset" },
          width: { xs: "100%", sm: "auto" },
        },
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid
            size={{ lg: 6, md: 6, sm: 6, xs: 12 }}
            sx={{
              display: "flex",
              alignItems: "center",
              "& p": {
                fontFamily: "Inter-Medium",
                fontSize: 16,
                lineHeight: "24px",
                color: "#6941C6",
                margin: 0,
              },
              "& h1": {
                fontFamily: "Inter-SemiBold",
                fontSize: { xs: 40, sm: 60 },
                lineHeight: { xs: "35px", sm: "72px" },
                color: "#101828",
                marginTop: 1,
                marginBottom: 2,
              },
              "& h5": {
                width: "90%",
                fontFamily: "Inter-Regular",
                fontSize: { xs: 14, sm: 20 },
                lineHeight: { xs: "20px", sm: "30px" },
                color: "#667085",
                margin: 0,
              },
              "& button": {
                marginTop: 6,
                marginBottom: 1,
              },
            }}
          >
            <div>
              <p>404 error</p>
              <h1>Page not found...</h1>
              <h5>
                Sorry, the page you are looking for doesn’t exist or has been
                moved.
              </h5>
              <Button onClick={() => router.push("/")}>
                Back to Dashboard
              </Button>
            </div>
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <Image
              src="/images/404.svg"
              alt="Guestna - link not found"
              layout="intrinsic"
              width={500} // Optional: provide width
              height={500} // Optional: provide height
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;

import React from "react";
import Head from "next/head";
import { NoSsr } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <NoSsr>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid container spacing={3}>
        <Grid flex={1} sx={{ marginTop: 2 }}>
          {children}
        </Grid>
      </Grid>
    </NoSsr>
  );
};

export default Layout;

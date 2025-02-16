import createEmotionCache from "@/helpers/createEmotionCache";
import "@/styles/globals.css";
import { CacheProvider, EmotionCache, ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import muiTheme from "@/styles/muiTheme";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import AuthWrapper from "@/components/AuthWrapper";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const queryClient = new QueryClient();

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={muiTheme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <ThemeProvider theme={muiTheme}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AuthWrapper>
                  <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                  </QueryClientProvider>
                </AuthWrapper>
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </SnackbarProvider>
        <CssBaseline />
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

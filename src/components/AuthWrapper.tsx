import { RootState } from "@/store";
import { checkAuth } from "@/store/auth/login";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && router.pathname === "/signin") {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn && router.pathname !== "/signin") {
      router.push("/signin");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};

export default AuthWrapper;

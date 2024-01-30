import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminLoggedIn } from "src/redux/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.email) {
        dispatch(
          adminLoggedIn({
            accessToken: auth.accessToken,
            email: auth.email,
            role: auth.role,
          }),
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}

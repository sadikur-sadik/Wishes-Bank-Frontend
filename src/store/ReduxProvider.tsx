"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, type ReactNode } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setAuthUser, clearAuthUser, AuthUserState } from "@/store/slices/authSlice";

function AuthSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        setAuthUser({
          id: session.user.id,
          fullName: session.user.fullName,
          email: session.user.email,
          role: session.user.role,
          accountStatus: session.user.accountStatus,
          phoneNumber: session.user.phoneNumber,
          profilePicture: session.user.profilePicture || session.user.profileImage,
          profileImage: session.user.profilePicture || session.user.profileImage,
        } as AuthUserState)
      );
    } else if (status === "unauthenticated") {
      dispatch(clearAuthUser());
    }
  }, [session, status, dispatch]);

  return null;
}

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AuthSync />
        {children}
      </Provider>
    </SessionProvider>
  );
}

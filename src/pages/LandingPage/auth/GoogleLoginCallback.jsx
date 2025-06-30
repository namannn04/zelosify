"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/Axios/AxiosInstance";

export default function GoogleLoginCallback() {
  const router = useRouter();
  // searchParams for query string
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    if (!code || !state) {
      router.push("/login");
      return;
    }

    (async () => {
      try {
        const res = await axiosInstance.post("/auth/google/callback", {
          code,
          state,
        });

        if (res.data.needsProfileCompletion) {
          localStorage.setItem("tempToken", res.data.tempToken);
          localStorage.setItem("userId", res.data.userId);
          router.push("/complete-profile");
        } else {
          localStorage.setItem("accessToken", res.data.token);
          router.push("/user");
        }
      } catch (err) {
        console.error("Google login error:", err);
        router.push("/login");
      }
    })();
  }, [code, state, router]);

  return <p>Authenticating with Google...</p>;
}

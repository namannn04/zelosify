import axiosInstance from "@/utils/Axios/AxiosInstance";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function MicrosoftLoginCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    if (!code || !state) {
      window.location.href = "/login";
      return;
    }

    async function exchangeCodeForToken() {
      try {
        const res = await axiosInstance.post("/auth/microsoft/callback", {
          code,
          state,
        });

        if (res.data.needsProfileCompletion) {
          localStorage.setItem("tempToken", res.data.tempToken);
          localStorage.setItem("userId", res.data.userId);
          window.location.href = "/complete-profile"; // ✅ Redirecting to complete profile
        } else {
          localStorage.setItem("accessToken", res.data.token);
          window.location.href = "/user";
        }
      } catch (err) {
        console.error("Microsoft login error:", err);
        window.location.href = "/login";
      }
    }

    exchangeCodeForToken();
  }, [code, state]);

  return <p>Authenticating with Microsoft...</p>;
}

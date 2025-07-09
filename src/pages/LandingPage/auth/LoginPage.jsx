"use client";

import LoginLayout from "@/components/Auth/Login/LoginLayout";

export default function LoginPage() {
  return (
    <div className="w-full">
      <LoginLayout />
    </div>
  );
}

// Force server-side rendering to prevent static generation issues with Redux
export async function getServerSideProps() {
  return {
    props: {},
  };
}

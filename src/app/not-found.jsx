"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 flex flex-col relative overflow-hidden">
      <header className="py-5 px-4 border-b border-gray-200 dark:border-gray-700 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* light logo */}
          <img
            onClick={() => router.push("/")}
            src={"/assets/logos/zelosify_Dark.png"}
            alt="Zelosify Light Logo"
            width={120}
            height={40}
            className="block dark:hidden hover:cursor-pointer object-contain"
          />
          {/* dark logo */}
          <img
            onClick={() => router.push("/")}
            src={"/assets/logos/main-logo.png"}
            alt="Zelosify Dark Logo"
            width={120}
            height={40}
            className="hidden dark:block hover:cursor-pointer object-contain"
          />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-max mx-auto text-center">
          <p className="text-base font-bold text-black dark:text-white">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-6">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center rounded-md border border-black dark:border-white bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-black dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Go back
            </button>
          </div>
        </div>
      </main>

      <footer className="py-4 px-4 border-t border-gray-200 dark:border-gray-700 relative z-10">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Zelosify. All rights reserved.
        </div>
      </footer>

      {/* Gradient and decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900" />
        <svg
          className="absolute top-0 left-0 transform -translate-y-16 -translate-x-1/2 lg:top-0 lg:left-auto lg:right-0 lg:translate-x-1/2 lg:translate-y-1/3"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200 dark:text-gray-700"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="384"
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>
        <svg
          className="absolute bottom-0 right-0 transform translate-y-1/3 translate-x-1/4 lg:top-1/3 lg:left-0 lg:-translate-x-1/2 lg:translate-y-0"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-gray-200 dark:text-gray-700"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="384"
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>
      </div>
    </div>
  );
}

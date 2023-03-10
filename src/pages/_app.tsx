import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <div className="flex justify-center bg-slate-800">
        <div className="flex w-96 max-w-lg ">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);

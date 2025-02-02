/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
// const { PHASE_EXPORT } = require("next/constants");

// const allPhaseConfig = {
//   env: {
//     tokenName: "token",
//     NEXT_PUBLIC_API_URL: "http://localhost:3000/api",
//     DATABASE_URL: "mysql://root@localhost:3306/db_restaurant",
//     DATABASE_URL:
//       "mysql://ojisksgg_komrest:!Uj(%q$V+mQa@127.0.0.1:3306/ojisksgg_komrest",
//     NEXTAUTH_SECRET: "secret",
//   },
// };

// const nextConfig = (phase) => {
//     output: "export",

//   if (phase === PHASE_EXPORT) {
//     return {
//       ...allPhaseConfig,
//       exportTrailingSlash: true,
//     };
//   }

//   return {
//     ...allPhaseConfig,
//   };
// };

// module.exports = nextConfig;

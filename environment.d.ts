declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GITHUB_ID: string;
      NEXT_PUBLIC_GITHUB_SECRET: string;
      NEXT_PUBLIC_GOOGLE_ID: string;
      NEXT_PUBLIC_GOOGLE_SECRET: string;
      NEXTAUTH_SECRET: string;
      MONGODB_URI: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

export {};

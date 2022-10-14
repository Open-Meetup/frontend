declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ENV: "dev" | "prod";
    NEXT_PUBLIC_CHAIN_ID: string;
    NEXT_PUBLIC_CHAIN_NAME: string;
    NEXT_PUBLIC_INFURA_KEY: string;
    NEXT_PUBLIC_API_URL: string;
  }
}

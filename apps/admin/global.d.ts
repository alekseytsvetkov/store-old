declare module '*.md' {
  const text: string;
  export default text;
}
declare module '*.png';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    ALGOLIA_APP_ID: string;
    ALGOLIA_API_KEY: string;
    PORT: number;
    RESEND_API_KEY: string;
    EDGE_CONFIG: string;
  }
}

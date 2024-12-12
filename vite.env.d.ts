/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GATEWAY_SERVICE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

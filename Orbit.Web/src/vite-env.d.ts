/// <reference types="vite/client" />

/** Strongly-typed environment variables exposed via import.meta.env. */
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

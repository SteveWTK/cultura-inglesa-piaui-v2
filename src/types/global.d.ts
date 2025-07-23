// Global type declarations

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: {
        [key: string]: unknown;
      }
    ) => void;
  }
}

export {};

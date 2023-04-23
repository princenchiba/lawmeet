declare global {
    namespace NodeJS {
      interface ProcessEnv {
        REACT_APP_CLERK_PUBLISHABLE_KEY:string
      }
    }
  }

  export {}
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    XATA_API_KEY: z.string(),
    XATA_BRANCH: z.string(),
    // CLERK_WEBHOOK_SECRET: z.string(),
    ENCRYPTION_KEY: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // NEXT_PUBLIC_BASE_URL: z.string(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    // NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    XATA_API_KEY: process.env.XATA_API_KEY,
    XATA_BRANCH: process.env.XATA_BRANCH,
    // CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  },
})

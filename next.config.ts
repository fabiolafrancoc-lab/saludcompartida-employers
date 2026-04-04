import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TypeScript errors during build
  // Remove once Supabase types are generated: npx supabase gen types typescript
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

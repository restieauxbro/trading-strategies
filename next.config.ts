import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @tigeropenapi/tigeropen ships dual ESM/CJS dist folders without nested
  // package.json "type" markers, so Next's default externalization (which
  // loads it via native require() at runtime) can resolve the ESM entry and
  // crash with "Unexpected token 'export'". Forcing it through Next's own
  // bundler instead of externalizing avoids that dual-package hazard.
  transpilePackages: ["@tigeropenapi/tigeropen"],
};

export default nextConfig;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const isUserPagesRepo = repository?.endsWith(".github.io");
  const base =
    process.env.GITHUB_ACTIONS === "true" && repository && !isUserPagesRepo
      ? `/${repository}/`
      : "/";

  return {
    plugins: [react()],
    base
  };
});

import { existsSync } from "fs";
import { resolve } from "path";
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

const projectDir = process.cwd();
const envPath = resolve(projectDir, ".env.local");

if (!existsSync(envPath)) {
  console.log("NEXT_PUBLIC_SUPABASE_URL: mungon");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY: mungon");
  console.log("SUPABASE_SERVICE_ROLE_KEY: mungon");
  process.exit(1);
}

loadEnvConfig(projectDir);

const REQUIRED_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

let allPresent = true;

for (const key of REQUIRED_VARS) {
  const value = process.env[key];
  const status = value && value.trim().length > 0 ? "ekziston" : "mungon";
  console.log(`${key}: ${status}`);
  if (!value || value.trim().length === 0) {
    allPresent = false;
  }
}

process.exit(allPresent ? 0 : 1);

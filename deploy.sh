#!/usr/bin/env bash
set -euo pipefail
echo "HerAi deploy helper (non-destructive) - ensure env vars are set before running."
echo "Applying Supabase schema..."
if [ -z "${SUPABASE_URL:-}" ]; then
  echo "Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and run again."
  exit 1
fi
supabase sql query < supabase/schema.sql
echo "Creating storage buckets (idempotent)..."
supabase storage create-bucket faces || true
supabase storage create-bucket voices || true
supabase storage create-bucket videos || true
supabase storage create-bucket rewards || true
echo "Done. See docs/DEPLOY.md for next steps."

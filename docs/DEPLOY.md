# DEPLOY.md

## Quick deploy notes
1. Copy .env.example -> .env and add keys.
2. Ensure supabase CLI is installed and logged in.
3. Run: `./deploy.sh`
4. Deploy Next.js app to Vercel (link repo).
5. Add webhooks:
   - Twilio inbound -> /supabase/functions/message-webhook
   - Stripe webhook -> /supabase/functions/stripe-webhook
6. Run the Postman tests in docs/POSTMAN_collection.json

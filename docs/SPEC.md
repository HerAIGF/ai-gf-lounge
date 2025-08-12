# HerAi — Developer Technical SPEC (Phase 1)

Version: 1.0
Last updated: 2025-08-12

## Overview
HerAi is an automated AI girlfriend platform providing lifelike, persistent companions across SMS, Email, and in-app chat with audio & short video. Each girlfriend has a fixed identity (face + voice), persistent memory, and a happiness (moral) score that affects content unlocking and monetization through gifts.

## Goals
- Fully automated weekly persona publishing and daily staggered content refreshes.
- Persistent per-user memory to personalize replies and suggestions.
- Monetization through natural gifting/expense requests (Stripe/PayPal/CashApp/Zelle/Shopify/Amazon).
- Phase 1: Text, Email, Audio & Video replies; no live calls (Phase 2 adds real-time calls and VR).

## Core Features
- Day-1 onboarding with family/friends/pets capture.
- Moral/Happiness engine (0-100) with tiers and media unlocks.
- Media package per gf: 3 images, 2 short videos, 3 audio clips by default.
- Surprise drops, countdown teasers (SMS + Email).
- Payment Accounts Registry (company-controlled accounts).
- Persistent memory stored in pgvector embeddings.
- Moderation + gated explicit content (age verification + consent + jurisdiction).

## Tech Stack
- Frontend: Next.js 14 (TypeScript), TailwindCSS (for UI)
- Backend: Supabase (Postgres + pgvector, Storage, Edge Functions in Deno/TS)
- AI: OpenAI (text + embeddings), ElevenLabs (TTS), Stability/SDXL (images), HeyGen/Runway (video)
- Messaging: Twilio (SMS/MMS), SendGrid (Email)
- Payments: Stripe (primary), PayPal, CashApp, Zelle, Amazon
- CI/Automation: GitHub Actions, Supabase Scheduled Functions

## Data Model (key tables)
- users_ext(id, email, display_name, country, is_age_verified, consent_adult_content, favorite_day, created_at)
- girlfriends(id, name, slug, accent, age_range, personality jsonb, voice_id, face_id, base_moral, favorite_day, pet_info jsonb, created_at)
- user_girlfriends(id, user_id, gf_id, moral_score, mood_tier, gift_history jsonb, total_spent, personal_memory jsonb, last_contact)
- messages(id, relationship_id, direction, channel, content, audio_url, video_url, tone_score, moderation_flags, created_at)
- company_payment_accounts(id, method_name, display_name, account_identifier, currency, is_active, priority)
- payments(id, relationship_id, payment_account_id, provider, provider_tx_id, amount, status, created_at)
- memories(id, relationship_id, embedding vector, summary, tags, created_at)
- rewards(id, gf_id, tier, media_type, storage_path, cooldown_seconds, tags)

## Key Flows
1. Onboarding:
   - User selects a girlfriend; initial message triggers Day-1 onboarding questionnaire (pets, family, preferences).
   - Answers saved to personal_memory + embeddings.

2. Message Handling:
   - Inbound via Twilio/SendGrid -> message-webhook -> persist -> moral-engine -> update score -> generate-reply -> send.
   - generate-reply pulls persona template, top-k memories, recent messages, moral state, news context.

3. Moral/Reward Logic:
   - Tone analysis (keywords + small LLM) adjusts moral_score.
   - Gift payments or high engagement adjust score positively.
   - Rewards unlocked by tier; explicit rewards gated.

4. Media Pipeline:
   - persona-autogen produces initial image/audio/video assets using image/voice/video APIs and stores them in Supabase storage.
   - media-generator selects/caches assets for rewards and messages.

5. Payments:
   - company_payment_accounts table is authoritative.
   - Gift link creation uses Stripe Checkout / PayPal as appropriate; webhooks update payments, trigger reward-delivery.

## UI/UX Requirements (Homepage & Chat)
- Homepage: grid of girlfriends (100 per page) with card showing portrait, name, accent, moral dot (color), quick moral meter (small beam).
- Girlfriend profile modal: media gallery (images/videos), personality tags, send message CTA, last message preview.
- Chat UI: threaded messages, inline audio/video players, moral beam (large, animated) at top showing current happiness (red->green gradient).
- Moral Loader: animated preloader showing moral transition when score updates (e.g., pulse green when increased).
- Reward Modals: confirm purchase, show thank-you media when Stripe webhook confirms.

## Security & Compliance
- Age verification required for explicit content; require consent flag.
- Moderation pipeline: OpenAI moderation endpoint + NSFW image classifier + human review queue.
- All payments handled via company accounts; disclose in onboarding/TOS.
- GDPR/CCPA: data deletion endpoints and user data export.

## Deployment & Automation
- deploy.sh for one-click-style deploy (requires supabase CLI & environment secrets).
- GitHub Actions: autopublish workflow (daily scheduled) calls persona-autogen in staggered batches.
- Supabase scheduled function fallback for in-project scheduling.

## Admin & Ops
- Admin dashboard to add/remove company payment accounts, review flagged media, view top donors, and pause personas.
- Logging & analytics: store events for DAU, conversion, LTV, moral trends.

## Config Defaults
- moral_weights: positive=+6, negative=-12, small_gift=+10, med_gift=+25, large_gift=+50, decay_daily=-1
- reward_tiers: tier1>=60, tier2>=80, tier3>=90
- media_default: images=3, videos=2, audios=3

---

Refer to docs/DEPLOY.md and docs/TESTS.md for deploy/test instructions (included in repo).

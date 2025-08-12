-- Migration: Add media fields and AI prompt metadata to girlfriends
ALTER TABLE girlfriends
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS audio_url TEXT,
ADD COLUMN IF NOT EXISTS image_generation_prompt TEXT,
ADD COLUMN IF NOT EXISTS video_generation_prompt TEXT,
ADD COLUMN IF NOT EXISTS audio_generation_prompt TEXT;

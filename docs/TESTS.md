# TESTS.md

## Basic test checklist
- Send inbound SMS to message-webhook and confirm message is in messages table.
- Trigger moral-engine with sample payload to see moral score update.
- Create a Stripe checkout (test mode) and simulate webhook to confirm payments table updates.

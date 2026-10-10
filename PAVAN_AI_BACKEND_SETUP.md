# Pavan AI backend setup

Pavan AI's public homepage calls the Supabase Edge Function `pavan-ai-chat`. The OpenAI API key is stored as a server-side secret and must never be placed in `index.html` or any public JavaScript.

## Finish setup once

1. Open the Supabase dashboard for the **Pavan Educator** project.
2. Go to **Edge Functions → Secrets** (or **Project Settings → Edge Functions → Secrets**, depending on the dashboard layout).
3. Add `OPENAI_API_KEY` with your own OpenAI API key as its value. Do not paste the key into GitHub or this repository.
4. Optional: add `OPENAI_MODEL` with a model available to your OpenAI account. If omitted, the function defaults to `gpt-4o-mini`.
5. Ensure the OpenAI account has API billing/credits enabled.
6. Open the deployed Pavan Educator site, refresh it, open Pavan AI and send a test message.

## Backend details

- Function name: `pavan-ai-chat`
- Supabase project: `jlrmmkgcjckkayearlca`
- Endpoint: `https://jlrmmkgcjckkayearlca.supabase.co/functions/v1/pavan-ai-chat`
- JWT verification: enabled
- CORS: restricted to `https://pavankumar363.github.io`
- Request limits: message count/size validation and a small per-instance rate limit
- Conversation history stays in the user's browser; messages are sent to the AI provider when a chat request is made.

The in-memory rate limit is a basic abuse deterrent, not a global production-grade quota. For a public launch, add durable per-user quotas and authenticated student sessions before opening access broadly.

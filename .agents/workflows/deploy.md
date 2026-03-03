---
description: Deploy both production and demo versions of the Sharkes app
---

# Deploy Sharkes App (Production + Demo)

Both deployments use the same source code with different environment variables. Sensitive keys and URLs are stored in the `.env` file to prevent sensitive data leakage.

Ensure your `.env` contains `PROD_API_KEY`, `PROD_API_URL`, `PROD_ANON_KEY`, `DEMO_API_KEY`, `DEMO_API_URL`, and `DEMO_ANON_KEY`.

## 1. Deploy Production (sharkes app)

Ensure MCP config at `/Users/data/.gemini/antigravity/mcp_config.json` points to the **production** project:
- Read `PROD_API_KEY` and `PROD_API_URL` from `.env` to update `mcp_config.json`.
> **IMPORTANT**: The MCP config change requires a conversation restart to take effect if modified.

Then deploy using `create-deployment`:

```yaml
create-deployment:
  sourceDirectory: /Users/data/shark/sports_team_management  
  projectSettings:
    buildCommand: npm run build
    outputDirectory: .output
  envVars:
    - NUXT_PUBLIC_INSFORGE_URL: (read PROD_API_URL from .env)
    - NUXT_PUBLIC_INSFORGE_ANON_KEY: (read PROD_ANON_KEY from .env)
    - NUXT_PUBLIC_DEMO_MODE: false
```

Production URL: `(read PROD_SITE_URL from .env)`

## 2. Deploy Demo (sharkes app demo)

Switch MCP config to the **demo** project:
- Read `DEMO_API_KEY` and `DEMO_API_URL` from `.env` to update `mcp_config.json`.
> **IMPORTANT**: The MCP config change requires a conversation restart to take effect.

Then deploy using `create-deployment`:

```yaml
create-deployment:
  sourceDirectory: /Users/data/shark/sports_team_management
  projectSettings:
    buildCommand: npm run build
    outputDirectory: .output
  envVars:
    - NUXT_PUBLIC_INSFORGE_URL: (read DEMO_API_URL from .env)
    - NUXT_PUBLIC_INSFORGE_ANON_KEY: (read DEMO_ANON_KEY from .env)
    - NUXT_PUBLIC_DEMO_MODE: true
```

## 3. Restore MCP Config

After deploying demo, switch MCP config back to **production** (the default using `PROD_API_KEY` and `PROD_API_URL`).

## Key Differences

| | Production | Demo |
|---|---|---|
| Backend | Production API URL | Demo API URL |
| Tables | Isolated prod tables | Isolated demo tables |
| Admin Bypass | Hidden | Visible |
| `NUXT_PUBLIC_DEMO_MODE` | `false` | `true` |

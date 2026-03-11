# 👨‍💻 Developer Guide

Welcome to the Sharkes development ecosystem. This guide provides technical deep-dives into the patterns and practices used to maintain our premium sports management platform.

## 🛠️ Backend Setup (InsForge)

Sharkes relies on **InsForge** for database, auth, and storage. Refer to [AGENTS.md](../AGENTS.md) for the initial SDK setup.

### Environment Configuration
We use a dual-environment strategy. Ensure your `.env` distinguishes between Production and Demo/Dev:

```env
# Demo/Dev Mode (Appends _dev to tables)
NUXT_PUBLIC_DEMO_MODE=true
```

## 📊 Database Patterns

### Environment Isolation
**CRITICAL**: Never hardcode table names. Always wrap them in the `getTableName` utility to ensure your changes don't affect production data while testing.

```typescript
// server/utils/insforge.ts
import { getTableName } from '~/utils/insforge'

const { data } = await insforge.database
  .from(getTableName('absences'))
  .select('*')
```

### Data Mutations
All inserts must be passed as arrays, even for single records:
```javascript
await insforge.database.from('table').insert([{ name: 'New Sharke' }])
```

## 🖼️ Media & Storage

### Image Upload Flow
1. **Upload**: Use `insforge.storage.from(getTableName('bucket')).upload(path, file)`.
2. **Retrieve URL**: The upload response contains the public URL.
3. **Persist**: Save this URL into the corresponding database record.

Refer to `app/components/AdminDiscounts.vue` for a complete implementation of image selection, preview, and dual-layer upload (Storage then DB).

## 🕒 Time & Localization

The Sharkes community operates in **Mexico City**. Always use `date-fns-tz` to handle time-zone conversions to prevent "off-by-one" day errors due to UTC offsets.

- **Timezone**: `America/Mexico_City`
- **Pattern**: Parse ISO strings and convert to zoned time before displaying or comparing.

## 🎨 UI/UX System

Our "Premium Pride" system is defined in `app/assets/css/main.css`.
- Use `glass-panel` for cards and containers.
- Apply `pride-glow` to primary call-to-action buttons.
- Ensure all page-level components are wrapped in a `<Transition>` or use the `animate-fade-in` utility.

---
*Maintained by the Sharkes Dev Team & AI Agents.*

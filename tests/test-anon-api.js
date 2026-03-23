require('dotenv').config({ path: '.env' });
const { createClient } = require('@insforge/sdk');
const client = createClient({
  baseUrl: process.env.NUXT_PUBLIC_INSFORGE_URL,
  anonKey: process.env.NUXT_PUBLIC_INSFORGE_ANON_KEY
});

async function run() {
  console.log("Fetching discounts...");
  const { data, error } = await client.database.from('discounts').select('*');
  console.log("Data:", data ? data.length + " rows" : "null");
  if(error) console.error("Error:", error);
}
run();

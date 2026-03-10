require('dotenv').config({ path: '.env' })
const { createClient } = require("@insforge/sdk");

const client = createClient({
  baseUrl: process.env.NUXT_PUBLIC_INSFORGE_URL,
  anonKey: process.env.NUXT_PUBLIC_INSFORGE_ANON_KEY
});

async function test() {
  const { data, error } = await client.database.from("discounts").select("*");
  console.log("Data:", data);
  console.log("Error:", error);
}

test();

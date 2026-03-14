import { createClient } from '@insforge/sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  baseUrl: process.env.NUXT_PUBLIC_INSFORGE_URL,
  anonKey: process.env.NUXT_PUBLIC_INSFORGE_ANON_KEY
});

async function migrate() {
  console.log('Migrating database...');
  try {
    console.log('Adding end_date to absences...');
    const { error: error1 } = await client.database.rpc('run_sql', { 
      sql: 'ALTER TABLE absences ADD COLUMN IF NOT EXISTS end_date DATE;' 
    });
    if (error1) console.error('Error on absences:', error1);
    else console.log('Successfully updated absences');

    console.log('Adding end_date to dev_absences...');
    const { error: error2 } = await client.database.rpc('run_sql', { 
      sql: 'ALTER TABLE dev_absences ADD COLUMN IF NOT EXISTS end_date DATE;' 
    });
    if (error2) console.error('Error on dev_absences:', error2);
    else console.log('Successfully updated dev_absences');

  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();

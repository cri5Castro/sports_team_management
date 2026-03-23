import { createClient } from '@insforge/sdk';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const client = createClient({
  baseUrl: process.env.PROD_API_URL,
  anonKey: process.env.PROD_ANON_KEY
});

const mappingStr = fs.readFileSync('/Users/data/.gemini/antigravity/brain/8dc048ca-557c-467f-8f23-eaba8e703c1a/name_mapping.json', 'utf-8');
const nameMapping = JSON.parse(mappingStr);

async function migrateNames() {
  console.log('Starting name migration...');
  
  const tablesToUpdate = ['members', 'dev_members', 'absences', 'dev_absences'];
  
  for (const tableName of tablesToUpdate) {
    console.log(`Processing table: ${tableName}`);
    
    // Fetch all records with a name from the table
    const { data: records, error: fetchError } = await client.database
      .from(tableName)
      .select('id, name')
      .not('name', 'is', null);
      
    if (fetchError) {
      console.error(`Error fetching from ${tableName}:`, fetchError);
      continue;
    }
    
    let updatedCount = 0;
    
    // Update each record if its name is in our mapping
    for (const record of records) {
      if (nameMapping[record.name] && nameMapping[record.name] !== record.name) {
        const newName = nameMapping[record.name];
        
        const { error: updateError } = await client.database
          .from(tableName)
          .update({ name: newName })
          .eq('id', record.id);
          
        if (updateError) {
          console.error(`Error updating record ${record.id} in ${tableName}:`, updateError);
        } else {
          updatedCount++;
        }
      }
    }
    console.log(`Updated ${updatedCount} records in ${tableName}`);
  }
  
  console.log('Migration complete.');
}

migrateNames();

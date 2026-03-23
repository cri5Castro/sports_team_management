
async function testApi() {
    const baseUrl = 'http://localhost:3000'; // Assuming dev server is running

    console.log('--- Verification Test (using fetch) ---');

    try {
        // 1. Fetch names
        console.log('Step 1: Fetching names...');
        const namesRes = await fetch(`${baseUrl}/api/names`);
        if (!namesRes.ok) throw new Error('Fetch names failed: ' + namesRes.statusText);
        const names = await namesRes.json();
        console.log('Names:', names);

        // 2. Add an absence
        console.log('\nStep 2: Adding a test absence to dev_absences...');
        const absenceData = {
            name: 'Test User ' + Date.now(),
            date: '2026-04-01',
            timeSlot: '10:00 - 11:00',
            location: 'Test Location',
            reason: 'Verification',
            sport: 'swimming'
        };
        const postRes = await fetch(`${baseUrl}/api/absences`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(absenceData)
        });
        if (!postRes.ok) {
            const errText = await postRes.text();
            throw new Error('Post absence failed: ' + postRes.statusText + ' - ' + errText);
        }
        const absence = await postRes.json();
        console.log('Added Absence:', absence);
        const newId = absence.id;

        // 3. Verify it exists in the list
        console.log('\nStep 3: Verifying it appears in the list...');
        const getRes = await fetch(`${baseUrl}/api/absences`);
        if (!getRes.ok) throw new Error('Get absences failed');
        const absences = await getRes.json();
        const found = absences.find(a => a.id === newId);
        console.log('Found in list:', found ? 'YES' : 'NO');

        // 4. Verify in dev table via MCP
        console.log('\nStep 4: Deleting test absence...');
        const delRes = await fetch(`${baseUrl}/api/absences/${newId}`, {
            method: 'DELETE'
        });
        if (!delRes.ok) throw new Error('Delete failed');
        console.log('Deleted successfully.');

    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testApi();

const { db } = require('@vercel/postgres');

async function seedRequests(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "requests" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS requests (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                filter_type TEXT NOT NULL
            );
        `;
        console.log('Created "requests" table');

        return {
            createTable,
        };
    } catch (error) {
        console.error('Error seeding requests:', error);
        throw error;
    }
}

async function seedEntries(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "entries" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS entries (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                rank INT NOT NULL,
                title TEXT NOT NULL,
                points INT NOT NULL,
                comments INT NOT NULL,
                request_id UUID NOT NULL
                    REFERENCES requests(id)
                    ON DELETE CASCADE
            );
        `;
        console.log('Created "entries" table');

        return {
            createTable,
        };
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedRequests(client);
    await seedEntries(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});

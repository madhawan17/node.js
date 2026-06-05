const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

// event listener

client.on("error", (error) => {
    console.log('redis client error occured', error );
});

async function testRedisConnection() {
    try {
        await client.connect();
        console.log('connected to redis successfully');

        await client.set("key", "madhawan");

        const extractValue = await client.get("key");

        console.log(extractValue);

    } catch (error) {
        console.error('error connecting to redis', error);   
    } finally {
        await client.quit();
    }
}

testRedisConnection();

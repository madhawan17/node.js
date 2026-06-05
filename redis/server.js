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

        await client.set("name", "madhawan");

        const extractValue = await client.get("name");

        console.log(extractValue);

        const deleteCount = await client.del("name");
        console.log(`number of keys deleted: ${deleteCount}`);

        const extractUpdatedValue = await client.get("name");
        console.log(extractUpdatedValue); // should be null since the key is deleted

        await client.set("count", "100");
        const incrementCount = await client.incr("count");
        console.log(incrementCount);

        const decrementCount = await client.decr("count");
        console.log(decrementCount);

    } catch (error) {
        console.error('error connecting to redis', error);   
    } finally {
        await client.quit();
    }
}

testRedisConnection();

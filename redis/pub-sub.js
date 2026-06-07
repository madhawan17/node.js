const redis = require("redis");

const client = redis.createClient({
    host: "localhost",
    port: 6379
});

client.on("error", (err) => {
    console.error("Redis error:", err);
});

async function testPunSub() {
    try {
        await client.connect();

        const subscriber = client.duplicate();// Create a new client -> share the same connection
        await subscriber.connect(); // connect to redis server for the subscriber

        await subscriber.subscribe("my-channel", (message, channel) => {
            console.log(`received message: ${message} from channel: ${channel}`);
        })

        // publish a message to the channel
        await client.publish("my-channel", "Hello, Redis Pub/Sub!");
        await client.publish("my-channel", "Hello, redis new message!");

    }catch(err) {
        console.error(err);
    }finally {
        client.quit();
    }
}
const redis = require("redis");

const client = redis.createClient({
    host: "localhost",
    port: 6379
});

client.on("error", (err) => {
    console.error("Redis error:", err);
});

async function testPubSub() {
    try {
        await client.connect();

        // const subscriber = client.duplicate();// Create a new client -> share the same connection
        // await subscriber.connect(); // connect to redis server for the subscriber

        // await subscriber.subscribe("my-channel", (message, channel) => {
        //     console.log(`received message: ${message} from channel: ${channel}`);
        // })

        // publish a message to the channel
        // await client.publish("my-channel", "Hello, Redis Pub/Sub!");
        // await client.publish("my-channel", "Hello, redis new message!");

        // await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for a while to receive messages

        // await subscriber.unsubscribe("my-channel");
        // await subscriber.quit();

        // pipelining & transactions
        const multi = client.multi();
        multi.set("transaction-key1", "value1");
        multi.set("transaction-key2", "value2");
        multi.get("transaction-key1");
        multi.get("transaction-key2");

        const results = await multi.exec();
        console.log(results);


        const pipeline = client.multi();
        multi.set("pipeline-key1", "value1");
        multi.set("pipeline-key2", "value2");
        multi.get("pipeline-key1");
        multi.get("pipeline-key2");

        const pipelineResults = await multi.exec();
        console.log(pipelineResults);

        // batch data operations
        const pipeline1 = client.multi();
        for(let i = 0; i< 1000; i++) {
            pipeline1.set(`user:${i}:action`, `Action ${i}`);
        }

        await pipeline1.exec();

        const dummyExample = client.multi();
        multi.decrBy('account:1234:balance', 100);
        multi.incrBy('account:5678:balance', 100);

        const finalResults = await multi.exec();

    }catch(err) {
        console.error(err);
    }finally {
        client.quit();
    }
}

testPubSub();
const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

//event listener

client.on("error", (error) => {
    console.log('redis client error occured', error);
});


async function redisDataStructure() {
    try {
        await client.connect();
        // Strings-> GET, SET, MSET, MGET

        await client.set("user:name", "madhawan");
        const name = await client.get("user:name");
        // console.log(name);

        await client.mSet(["user:email", "madhawan@example.com", "user:age", "30", "user:country", "India"]);
        const [email, age, country] = await client.mGet(["user:email", "user:age", "user:country"]);
        // console.log(`Email: ${email}, Age: ${age}, Country: ${country}`);

        // Lists -> LPUSH, RPUSH, LPOP, RPOP, LRANGE
        //await client.lPush("notes", ["note1", "note2", "note3"]);
        // const extractALlNotes = await client.lRange("notes", 0, -1);
        // console.log("Notes:", extractALlNotes);

        // const firstNote = await client.lPop("notes");
        // console.log("First Note:", firstNote);

        // const remainingNotes = await client.lRange("notes", 0, -1);
        // console.log("Remaining Notes:", remainingNotes);

        // sets-> SADD, SMEMBERS, SREM

        // await client.sAdd("nicknames", ["maddy", "madhu", "madhawan"]);
        // const nickName = await client.sMembers("nicknames");
        // console.log(nickName);

        // const isMember = await client.sIsMember("nicknames", "maddy");
        // console.log(isMember);

        // await client.sRem("nicknames", "madhu");
        // const updatedNickNames = await client.sMembers("nicknames");
        // console.log(updatedNickNames);

    //sorted sets
    // ZADD, ZRANGE, ZRANK, ZREM

    // await client.zAdd("cart", [
    //   {
    //     score: 100,
    //     value: "Cart 1",
    //   },
    //   {
    //     score: 150,
    //     value: "Cart 2",
    //   },
    //   {
    //     score: 10,
    //     value: "Cart 3",
    //   },
    // ]);

    // const getCartItems = await client.zRange("cart", 0, -1);
    // console.log(getCartItems);

    // const extractAllCartItemsWithScore = await client.zRangeWithScores(
    //   "cart",
    //   0,
    //   -1
    // );
    // console.log(extractAllCartItemsWithScore);

    // const cartTwoRank = await client.zRank("cart", "Cart 2");
    // console.log(cartTwoRank);

    // hash -> HSET, HGET, HGETALL, HDEL

    await client.hSet("product:1" , {
        name: "Laptop",
        price: "1000",
        stock: "50"
    });

    const getProductName = await client.hGet("product:1", "name");
    console.log(getProductName);

    } catch (err) {
        console.error(err);
    } finally {
        client.quit();
    }

}

redisDataStructure();
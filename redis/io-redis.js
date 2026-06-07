const redis = require('ioredis');


const redis = new Redis();

async function ioRedisDemo() {
    try {
        await redis.set('key', 'value');
        const val = await redis.get('key')
        console.log(val);;
    }catch(err){
        console.log(err);
    }finally {
        await redis.quit();
    }
} 
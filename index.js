const Redis = require('ioredis');
const redis = new Redis(); // connects to Redis on localhost:6379

async function redisDemo() {
    // storing simple key-value pairs
    await redis.set('user:1', 'Alice');
    const user = await redis.get('user:1');
    console.log('User:', user);

    // working with lists (ordered data structure)
    await redis.lpush('tasks', `Wake up - ${new Date().toISOString()}`);
    await redis.lpush('tasks', `Eat breakfast - ${new Date().toISOString()}`);
    const tasks = await redis.lrange('tasks', 0, -1);
    console.log('Tasks:', tasks);

    // working with sets (unique values)
    await redis.sadd('online_users', 'alice');
    await redis.sadd('online_users', 'bob');
    await redis.sadd('online_users', 'alice'); // duplicate won't be added
    const onlineUsers = await redis.smembers('online_users');
    console.log('Online Users:', onlineUsers);

    // temporary keys with expiration
    await redis.setex('temp_key', 10, 'I will disappear in 10 seconds');
    const timeLeft = await redis.ttl('temp_key');
    console.log('Seconds until temp_key expires:', timeLeft);

    // counters
    await redis.incr('visits');  // increment by 1
    await redis.incrby('points', 5);  // increment by 5
    console.log('Visit count:', await redis.get('visits'));
    console.log('Points:', await redis.get('points'));

    // hash objects (like JSON)
    await redis.hset('user:profile', {
        name: 'Alice',
        email: 'alice@example.com',
        age: '25'
    });
    const profile = await redis.hgetall('user:profile');
    console.log('User Profile:', profile);

    // checking specific hash fields
    const userName = await redis.hget('user:profile', 'name');
    console.log('Just the name:', userName);

    // more set operations
    const isOnline = await redis.sismember('online_users', 'alice');
    console.log('Is alice online?', isOnline); // true (1)

    const isTomOnline = await redis.sismember('online_users', 'tom');
    console.log('Is tom online?', isTomOnline); // false (0)

    // remove and check membership
    await redis.srem('online_users', 'alice'); // removes alice
    const isStillOnline = await redis.sismember('online_users', 'alice');
    console.log('Is alice still online?', isStillOnline); // false (0)

    const userCount = await redis.scard('online_users');
    console.log('Number of online users:', userCount);

    // close the Redis connection
    await redis.quit();
}

redisDemo().catch(console.error);

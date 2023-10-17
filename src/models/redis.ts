import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

let redisClient: RedisClientType;
let isReady: boolean;

async function redisStore(): Promise<RedisClientType> {
    if (!isReady) {
      redisClient = createClient();
      redisClient.on('error', err => console.log(`Redis Error: ${err}`))
      redisClient.on('connect', () => console.log('Redis connected'))
      redisClient.on('reconnecting', () => console.log('Redis reconnecting'))
      redisClient.on('ready', () => {
        isReady = true;
        console.log('Redis ready!');
      })
      await redisClient.connect()
    }
    return redisClient
  }
  
  redisStore().then(connection => {
    redisClient = connection
  }).catch(err => {
    console.log({ err }, 'Failed to connect to Redis')
  })
  
  export {
    redisStore,
  }
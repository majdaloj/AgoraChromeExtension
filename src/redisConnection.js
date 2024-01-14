// Import the redis library
import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// Handle errors
client.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis
client.connect();

// Export the Redis client instance
export default client;

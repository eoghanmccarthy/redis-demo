# Redis Demo

What is Redis?
Redis is an in-memory store on your server for temporary data, not a permanent database.   
An in-memory store means the data is held in RAM (Random Access Memory) rather than on disk storage, allowing for extremely fast data access and retrieval.

```bash
# Mac
brew install redis

# In first terminal:
redis-server

# In second terminal:
node index.js

redis-cli FLUSHALL
```



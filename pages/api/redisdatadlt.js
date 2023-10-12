import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL)

export default async function handler(req, res) {
    const rollNumber = req.query['htno'];

    try {
        await redis.del(rollNumber);
        return res.status(200).json("The cache has been cleared");
    } catch (err) {
        console.error("Error while clearing the cache:", err);
        return res.status(500).json("Error while clearing the cache!!");
    }
}
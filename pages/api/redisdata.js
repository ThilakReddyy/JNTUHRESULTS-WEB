import Redis from 'ioredis'

let redis = new Redis(process.env.REDIS_URL)

export default async function handler(req, res) {
    let start = Date.now();

    const rollNumber = req.query['htno'];
    let cache = await redis.get(rollNumber);
    cache = JSON.parse(cache)
    let result = {}
    if (cache) {
        console.log("loading from cache")
        result.data = cache
        result.type = "redis"
        return res.status(200).json(result["data"]["data"])
    } else {
        return res.status(200).json("Internal error")
    }
}
import Redis from 'ioredis'

let redis = new Redis("redis://default:EIv5u8Z2c6G8JvNZQ2QO@containers-us-west-63.railway.app:5512")

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
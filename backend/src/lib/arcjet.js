import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node"; // tokenBucket is an algorithm for rate limiting but we will use slidingWindow instead but we can use any of the two if we want
// import { isSpoofedBot } from "@arcjet/inspect"; and we also removed this because we don't need it.
import express from "express"; // we have already imported express in our server file so we don't need that again here unless all our codes are in one place
import { ENV }  from "./env.js"

// const app = express(); we don't need any of this
// const port = 3000;

const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: ENV.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc this is to prevent or not block the search engine bot
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    // here tokenBucket is used as rate limiting algorithm but we will be using slidingWindow

    // tokenBucket({
    //   mode: "LIVE",
    //   // Tracked by IP address by default, but this can be customized
    //   // See https://docs.arcjet.com/fingerprints
    //   //characteristics: ["ip.src"],
    //   refillRate: 5, // Refill 5 tokens per interval
    //   interval: 10, // Refill every 10 seconds
    //   capacity: 10, // Bucket capacity of 10 tokens
    // }),

    // so we are using slidingWindow
    slidingWindow({
      mode: "LIVE",
      // Tracked by IP address by default, but this can be customized
        // See https://docs.arcjet.com/fingerprints
        //characteristics: ["ip.src"],
        max: 100, // Max 100 requests
        interval: 60, // per 60 second window
        // we can still use this as given below instead of max and interval
        // windowSize: 60, // 60 second window
        // maxRequests: 20, // Max 20 requests per window
    }),
  ],
});


// we don't need all this code in our server file so we can just export the aj object and import it in our server file to use it as middleware
export default aj;

// app.get("/", async (req, res) => {
//   const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
//   console.log("Arcjet decision", decision);

//   if (decision.isDenied()) {
//     if (decision.reason.isRateLimit()) {
//       res.writeHead(429, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Too Many Requests" }));
//     } else if (decision.reason.isBot()) {
//       res.writeHead(403, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "No bots allowed" }));
//     } else {
//       res.writeHead(403, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Forbidden" }));
//     }
//   } else if (decision.ip.isHosting()) {
//     // Requests from hosting IPs are likely from bots, so they can usually be
//     // blocked. However, consider your use case - if this is an API endpoint
//     // then hosting IPs might be legitimate.
//     // https://docs.arcjet.com/blueprints/vpn-proxy-detection
//     res.writeHead(403, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Forbidden" }));
//   } else if (decision.results.some(isSpoofedBot)) {
//     // Paid Arcjet accounts include additional verification checks using IP data.
//     // Verification isn't always possible, so we recommend checking the decision
//     // separately.
//     // https://docs.arcjet.com/bot-protection/reference#bot-verification
//     res.writeHead(403, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Forbidden" }));
//   } else {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Hello World" }));
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    console.log("Arcjet decision", decision);

    // if the reason to the error is rate limit or bot or hosting ip or spoofed bot we return the respective error else we call next to proceed to the next middleware or route handler
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Too Many Requests. Try again later" });
        } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "No bots allowed" });
        } else {
        return res.status(403).json({ message: "Access denied by security policy" });
        }
    } else if (decision.ip.isHosting()) {
        // Requests from hosting IPs are likely from bots, so they can usually be
        // blocked. However, consider your use case - if this is an API endpoint
        // then hosting IPs might be legitimate.
        return res.status(403).json({ message: "Error from hosting IP bots" });

        // check for spoofedBot
    } else if (decision.results.some(isSpoofedBot)) {
        // Paid Arcjet accounts include additional verification checks using IP data.
        // Verification isn't always possible, so we recommend checking the decision
        // separately.
        return res.status(403).json({ error: "Spoofed bot detected", message: "Malicious bot activity detected." });
    } else {
        next();
    }
    } catch (error) {
    console.log("Error in Arcjet protection middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
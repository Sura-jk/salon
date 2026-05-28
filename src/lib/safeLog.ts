export function safeLog(obj: Record<string, any>) {
  const redacted = { ...obj };
  const secretKeys = ["token", "password", "apiKey", "secret"];
  secretKeys.forEach((key) => {
    if (key in redacted) redacted[key] = "[REDACTED]";
  });
  console.log(redacted);
}
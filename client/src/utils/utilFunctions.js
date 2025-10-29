export function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // Create an object to store both the value and the expiry time
  const item = {
    value: value,
    expiresAt: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  // 1. Check if the item exists
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // 2. Check if the item has expired
  if (now.getTime() > item.expiresAt) {
    // If expired, remove it from localStorage and return null
    localStorage.removeItem(key);
    return null;
  }

  // 3. If not expired, return the value
  return item.value;
}

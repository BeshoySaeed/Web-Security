async function generateChecksum(data) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(data));
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function saveData(key, data) {
  const checksum = await generateChecksum(data);
  const payload = {
    data,
    checksum,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

async function loadData(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  const payload = JSON.parse(raw);
  const data = payload.data;
  const storedChecksum = payload.checksum;

  const newChecksum = await generateChecksum(data);
  if (newChecksum !== storedChecksum) {
    throw new Error("Data Integrity Check Failed!");
  }
  return data;
}

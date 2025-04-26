localStorage.setItem("username", "B".repeat(1024 * 1024));

if ("storage" in navigator && "estimate" in navigator.storage) {
  navigator.storage.estimate().then((estimate) => {
    const usage = (estimate.usage / 1024 / 1024).toFixed(2);
    const quota = (estimate.quota / 1024 / 1024).toFixed(2);
    console.log("Storage usage:", usage, "MB");
    console.log("Storage quota:", quota, "MB");
  });
}

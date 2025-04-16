
  function updateTimer() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
  }

  // Update every second
  setInterval(updateTimer, 1000);
  // Initial call so it doesn’t wait for 1 second
  updateTimer();
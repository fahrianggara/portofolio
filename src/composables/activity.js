// Configuration
export const LANYARD_WEBSOCKET_URL = "wss://api.lanyard.rest/socket";
export const DISCORD_CDN_URL = "https://cdn.discordapp.com/app-assets";
export const UPDATE_INTERVAL_MS = 1000;

// WebSocket connection management
export function createLanyardWebSocket(userId, onDataUpdate) {
  let socket = null;
  let reconnectAttempts = 0; // Hitung jumlah reconnect
  let reconnectTimeout = null;

  function connect() {
    if (socket) return; // Hindari koneksi ganda

    socket = new WebSocket(LANYARD_WEBSOCKET_URL);

    socket.onopen = () => {
      reconnectAttempts = 0; // Reset reconnect attempts saat berhasil connect
      socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
    };

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (["INIT_STATE", "PRESENCE_UPDATE"].includes(response.t)) {
        onDataUpdate(response.d);
      }
    };

    socket.onerror = (error) => {
      cleanup(); // Bersihkan koneksi sebelum reconnect
    };

    socket.onclose = (event) => {
      cleanup();
      scheduleReconnect();
    };
  }

  function disconnect() {
    if (socket) {
      socket.close();
      cleanup();
    }
  }

  function cleanup() {
    if (socket) {
      socket.onopen = null;
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;
      socket = null;
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  }

  function scheduleReconnect() {
    reconnectAttempts++;
    const delay = Math.min(5000 * reconnectAttempts, 30000); // Maksimal 30 detik

    console.log(`Reconnecting in ${delay / 1000} seconds...`);
    reconnectTimeout = setTimeout(connect, delay);
  }

  return {
    connect,
    disconnect
  };
}

// Time formatting helpers
export function formatTimeFromMilliseconds(milliseconds) {
  const validMs = Math.max(0, milliseconds);
  const hours = Math.floor(validMs / 3600000);
  const minutes = Math.floor((validMs % 3600000) / 60000);
  const seconds = Math.floor((validMs % 60000) / 1000);

  return {
    hours,
    minutes,
    seconds,
    formatted: {
      short: `${minutes}:${seconds.toString().padStart(2, "0")}`,
      full: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
  };
}

// Calculate activity elapsed time
export function calculateActivityElapsedTime(activity) {
  if (!activity?.timestamps?.start) return "00:00:00";

  const startTime = activity.timestamps.start;
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;

  return formatTimeFromMilliseconds(elapsedTime).formatted.full;
}

// Calculate song progress
export function calculateSongProgress(spotifyData) {
  if (!spotifyData?.timestamps?.start || !spotifyData?.timestamps?.end) {
    return { elapsed: "00:00", total: "00:00", percent: 0 };
  }

  const startTime = spotifyData.timestamps.start;
  const endTime = spotifyData.timestamps.end;
  const totalDuration = endTime - startTime;

  // If the current time has reached or passed the end time, return full progress.
  if (Date.now() >= endTime) {
    return {
      elapsed: formatTimeFromMilliseconds(totalDuration).formatted.short,
      total: formatTimeFromMilliseconds(totalDuration).formatted.short,
      percent: 100
    };
  }

  const elapsedDuration = Date.now() - startTime;
  const progress = Math.min(1, elapsedDuration / totalDuration);

  return {
    elapsed: formatTimeFromMilliseconds(elapsedDuration).formatted.short,
    total: formatTimeFromMilliseconds(totalDuration).formatted.short,
    percent: progress * 100
  };
}
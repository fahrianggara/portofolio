// Configuration
export const LANYARD_WEBSOCKET_URL = "wss://api.lanyard.rest/socket";
export const DISCORD_CDN_URL = "https://cdn.discordapp.com/app-assets";
export const UPDATE_INTERVAL_MS = 1000;

// WebSocket connection management
export function createLanyardWebSocket(userId, onDataUpdate) {
    let socket = null;

    function connect() {
        if (socket) return;

        socket = new WebSocket(LANYARD_WEBSOCKET_URL);

        socket.onopen = () => {
            socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
        };

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (["INIT_STATE", "PRESENCE_UPDATE"].includes(response.t)) {
                onDataUpdate(response.d);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };
    }

    function disconnect() {
        if (socket) {
            socket.close();
            socket = null;
        }
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

// Activity time tracking
export function calculateActivityElapsedTime(activity) {
    const startTime = activity?.timestamps?.start;
    if (!startTime) {
        return "00:00:00";
    }

    const elapsed = Date.now() - startTime;
    return formatTimeFromMilliseconds(elapsed).formatted.full;
}

// Spotify progress tracking
export function calculateSongProgress(spotifyData) {
    if (!spotifyData?.timestamps) {
        return { elapsed: "00:00", total: "00:00", percent: 0 };
    }

    const { start, end } = spotifyData.timestamps;
    const now = Date.now();
    const elapsedMs = now - start;
    const totalMs = end - start;

    // Calculate percentage within 0-100% bounds
    const percent = Math.min(Math.max(0, (elapsedMs / totalMs) * 100), 100);

    return {
        elapsed: formatTimeFromMilliseconds(elapsedMs).formatted.short,
        total: formatTimeFromMilliseconds(totalMs).formatted.short,
        percent
    };
}
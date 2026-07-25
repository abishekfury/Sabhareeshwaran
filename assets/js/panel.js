/* ============================================================
   SYSTEM DIAGNOSTICS & VISITOR PANEL JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  startDiagnosticsDashboard();
});

/**
 * Initialize Dashboard telemetry fetchers, timers, and listeners
 */
function startDiagnosticsDashboard() {
  // Reveal the elements with custom stagger delays
  document.querySelectorAll('.fade-in-ready').forEach((el) => {
    el.classList.add('visible');
  });

  // Run dynamic data fetchers
  loadStaticSystemInfo();
  runRealtimeClocks();
  fetchNetworkTelemetry();
  initCollapsibleLogs();
  initCopyUtilities();
}

/**
 * Dynamic Network queries for IPv4, IPv6, and Geolocation details
 */
async function fetchNetworkTelemetry() {
  const ipv4Val = document.getElementById('val-ipv4');
  const ipv6Val = document.getElementById('val-ipv6');
  const connStatus = document.getElementById('val-conn-status');
  
  // Geolocation displays
  const geoCountry = document.getElementById('val-geo-country');
  const geoRegion = document.getElementById('val-geo-region');
  const geoCity = document.getElementById('val-geo-city');
  const geoTimezone = document.getElementById('val-geo-timezone');
  const geoIsp = document.getElementById('val-geo-isp');

  // Summary headers
  const sumIp = document.getElementById('sum-ip');
  const sumIsp = document.getElementById('sum-isp');
  const sumCountry = document.getElementById('sum-country');

  // Set default connection state
  updateConnectionStatus();
  window.addEventListener('online', updateConnectionStatus);
  window.addEventListener('offline', updateConnectionStatus);

  function updateConnectionStatus() {
    const isOnline = navigator.onLine;
    if (connStatus) {
      if (isOnline) {
        let text = "Online";
        // Check for Network Information API support
        if (navigator.connection) {
          const { effectiveType, downlink, rtt } = navigator.connection;
          text += ` (${effectiveType ? effectiveType.toUpperCase() : 'Unknown'} Network)`;
          if (downlink) text += ` ~${downlink} Mbps`;
          if (rtt) text += ` (${rtt}ms RTT)`;
        }
        connStatus.innerHTML = `<span class="online">● ${text}</span>`;
      } else {
        connStatus.innerHTML = `<span class="offline">○ Offline</span>`;
      }
    }
  }

  // 1. Fetch IPv4 Address
  let detectedIPv4 = null;
  try {
    const res = await fetchWithTimeout('https://api4.ipify.org?format=json', {}, 3000);
    const data = await res.json();
    detectedIPv4 = data.ip;
    if (ipv4Val) {
      ipv4Val.innerHTML = `${detectedIPv4} <button class="copy-btn copy-tooltip" data-copy="${detectedIPv4}">Copy</button>`;
    }
  } catch (err) {
    console.warn("IPv4 Fetch Failed:", err);
    if (ipv4Val) ipv4Val.textContent = "Offline / Unavailable";
  }

  // 2. Fetch IPv6 Address (often fails if ISP does not support dual-stack; handle gracefully)
  let detectedIPv6 = null;
  try {
    const res = await fetchWithTimeout('https://api6.ipify.org?format=json', {}, 3000);
    const data = await res.json();
    detectedIPv6 = data.ip;
    if (ipv6Val) {
      ipv6Val.innerHTML = `${detectedIPv6} <button class="copy-btn copy-tooltip" data-copy="${detectedIPv6}">Copy</button>`;
    }
  } catch (err) {
    console.warn("IPv6 Fetch Failed (Normal on IPv4-only networks):", err);
    if (ipv6Val) ipv6Val.innerHTML = `<span style="opacity: 0.5;">Not Detected</span>`;
  }

  // 3. Fetch Geolocation and ISP Details (using ipwho.is with a fallback to freeipapi.com)
  let geoPayload = null;
  try {
    const res = await fetchWithTimeout('https://ipwho.is/', {}, 4000);
    const data = await res.json();
    if (data && data.success) {
      geoPayload = data;
      renderIpWhoIsData(data);
    } else {
      throw new Error(data ? data.message : "Unsuccessful lookup");
    }
  } catch (err) {
    console.warn("ipwho.is fetch failed. Trying fallback freeipapi.com...", err);
    try {
      const res = await fetchWithTimeout('https://freeipapi.com/api/json', {}, 4000);
      const data = await res.json();
      if (data) {
        geoPayload = data;
        renderFreeIpApiData(data);
      } else {
        throw new Error("Empty payload from fallback");
      }
    } catch (fallbackErr) {
      console.error("All geolocation APIs failed:", fallbackErr);
      setGeolocationError();
    }
  }

  // Set the primary raw JSON output inside collapsible panel
  const rawLogsPre = document.getElementById('raw-logs-pre');
  if (rawLogsPre) {
    const debugLogs = {
      timestamp: new Date().toISOString(),
      network: {
        ipv4: detectedIPv4 || "Unavailable",
        ipv6: detectedIPv6 || "Unavailable",
        online: navigator.onLine,
        connection: navigator.connection ? {
          downlink: navigator.connection.downlink,
          effectiveType: navigator.connection.effectiveType,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData
        } : "Not Supported"
      },
      geolocation: geoPayload || "Fetch Failed",
      hardware: {
        cores: navigator.hardwareConcurrency || "Unknown",
        memoryGB: navigator.deviceMemory || "Unknown",
        platform: navigator.platform
      },
      client: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          colorDepth: window.screen.colorDepth,
          pixelRatio: window.devicePixelRatio
        }
      }
    };
    rawLogsPre.textContent = JSON.stringify(debugLogs, null, 2);
  }

  // Geolocation Rendering Helpers
  function renderIpWhoIsData(data) {
    const country = data.country || "Unknown";
    const flag = data.country_code ? getCountryFlagEmoji(data.country_code) : "";
    const isp = data.connection ? data.connection.isp : "Unknown";

    if (geoCountry) geoCountry.textContent = `${flag} ${country} (${data.country_code || '??'})`;
    if (geoRegion) geoRegion.textContent = data.region || "Unknown";
    if (geoCity) geoCity.textContent = data.city || "Unknown";
    if (geoTimezone) geoTimezone.textContent = data.timezone ? `${data.timezone.id} (UTC ${data.timezone.utc})` : "Unknown";
    if (geoIsp) geoIsp.textContent = isp;

    // Summaries
    if (sumIp) sumIp.textContent = data.ip || detectedIPv4 || "Offline";
    if (sumIsp) sumIsp.textContent = isp;
    if (sumCountry) sumCountry.textContent = `${flag} ${country}`;
  }

  function renderFreeIpApiData(data) {
    const country = data.countryName || "Unknown";
    const flag = data.countryCode ? getCountryFlagEmoji(data.countryCode) : "";
    const isp = data.provider || "Unknown";

    if (geoCountry) geoCountry.textContent = `${flag} ${country} (${data.countryCode || '??'})`;
    if (geoRegion) geoRegion.textContent = data.regionName || "Unknown";
    if (geoCity) geoCity.textContent = data.cityName || "Unknown";
    if (geoTimezone) geoTimezone.textContent = data.timeZone || "Unknown";
    if (geoIsp) geoIsp.textContent = isp;

    // Summaries
    if (sumIp) sumIp.textContent = data.ipAddress || detectedIPv4 || "Offline";
    if (sumIsp) sumIsp.textContent = isp;
    if (sumCountry) sumCountry.textContent = `${flag} ${country}`;
  }

  function setGeolocationError() {
    const errorText = `<span style="opacity: 0.5;">Fetch Failed</span>`;
    if (geoCountry) geoCountry.innerHTML = errorText;
    if (geoRegion) geoRegion.innerHTML = errorText;
    if (geoCity) geoCity.innerHTML = errorText;
    if (geoTimezone) geoTimezone.innerHTML = errorText;
    if (geoIsp) geoIsp.innerHTML = errorText;

    if (sumIp) sumIp.textContent = detectedIPv4 || "Offline";
    if (sumIsp) sumIsp.textContent = "Unknown Provider";
    if (sumCountry) sumCountry.textContent = "Unknown Region";
  }
}

/**
 * Fetch client browser properties and hardware specs using Web APIs
 */
function loadStaticSystemInfo() {
  const valOs = document.getElementById('val-os');
  const valBrowser = document.getElementById('val-browser');
  const valDevice = document.getElementById('val-device');
  const valResolution = document.getElementById('val-resolution');
  const valLang = document.getElementById('val-lang');
  const valCores = document.getElementById('val-cores');
  const valRam = document.getElementById('val-ram');
  const valSystemState = document.getElementById('val-system-state');

  // Summary headers
  const sumDevice = document.getElementById('sum-device');
  const sumOs = document.getElementById('sum-os');

  const ua = navigator.userAgent;

  // OS Detection
  const osInfo = getOSDetails(ua);
  if (valOs) valOs.textContent = osInfo;
  if (sumOs) sumOs.textContent = osInfo;

  // Browser & Version Detection
  const browserInfo = getBrowserDetails(ua);
  if (valBrowser) valBrowser.textContent = browserInfo;

  // Device Type
  const deviceType = getDeviceType(ua);
  if (valDevice) valDevice.textContent = deviceType;
  if (sumDevice) sumDevice.textContent = deviceType;

  // Screen resolution
  const width = window.screen.width;
  const height = window.screen.height;
  const dpr = window.devicePixelRatio;
  const depth = window.screen.colorDepth;
  if (valResolution) {
    valResolution.textContent = `${width} × ${height} (${depth}-bit, ${dpr}x DPR)`;
  }

  // Language
  if (valLang) {
    const langFormatter = new Intl.DisplayNames([navigator.language || 'en'], { type: 'language' });
    let langName = navigator.language;
    try {
      langName = langFormatter.of(navigator.language) || navigator.language;
    } catch(e){}
    valLang.textContent = `${langName} (${navigator.language})`;
  }

  // CPU cores
  if (valCores) {
    valCores.textContent = navigator.hardwareConcurrency 
      ? `${navigator.hardwareConcurrency} Logical Cores` 
      : "Unknown / Not Disclosed";
  }

  // Approximate RAM
  if (valRam) {
    valRam.textContent = navigator.deviceMemory 
      ? `~${navigator.deviceMemory} GB` 
      : "Unknown (Non-Chromium Browser)";
  }

  // System State (Online / Offline detection wrapper)
  if (valSystemState) {
    const updateOnlineText = () => {
      valSystemState.innerHTML = navigator.onLine 
        ? `<span class="online">● Fully Operational (Online)</span>` 
        : `<span class="offline">○ Connection Interrupted (Offline)</span>`;
    };
    updateOnlineText();
    window.addEventListener('online', updateOnlineText);
    window.addEventListener('offline', updateOnlineText);
  }
}

/**
 * Clock updater updating the owner's system time tick-by-tick
 */
function runRealtimeClocks() {
  const valLocalTime = document.getElementById('val-local-time');
  if (!valLocalTime) return;

  function tick() {
    const now = new Date();
    // Beautiful formatted timestamp
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    try {
      const formatter = new Intl.DateTimeFormat(navigator.language, options);
      valLocalTime.textContent = formatter.format(now);
    } catch(err) {
      valLocalTime.textContent = now.toString();
    }
  }

  tick();
  setInterval(tick, 1000);
}

/**
 * Copy to clipboard utility triggers
 */
function initCopyUtilities() {
  // Delegate event to handle dynamically added copy buttons
  document.addEventListener('click', async (e) => {
    const copyBtn = e.target.closest('.copy-btn');
    if (!copyBtn) return;

    const textToCopy = copyBtn.getAttribute('data-copy');
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      
      // Visual feedback via a custom tooltip showing 'Copied!'
      copyBtn.classList.add('show-copied');
      setTimeout(() => {
        copyBtn.classList.remove('show-copied');
      }, 1500);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  });
}

/**
 * Collapsible raw user-agent panel trigger
 */
function initCollapsibleLogs() {
  const header = document.querySelector('.diag-logs-header');
  const body = document.querySelector('.diag-logs-body');

  if (!header || !body) return;

  header.addEventListener('click', () => {
    body.classList.toggle('open');
  });
}

/* ===== TELEMETRY UTILITY PARSERS ===== */

/**
 * Fetch wrapper with custom timeouts to prevent requests hanging indefinitely
 */
async function fetchWithTimeout(url, options = {}, timeout = 3000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Map ISO country code (e.g. "US") to high-quality emoji flags
 */
function getCountryFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Parse human-readable OS detail string
 */
function getOSDetails(ua) {
  if (/Windows NT 10.0/i.test(ua)) return "Windows 10/11";
  if (/Windows NT 6.3/i.test(ua)) return "Windows 8.1";
  if (/Windows NT 6.2/i.test(ua)) return "Windows 8";
  if (/Windows NT 6.1/i.test(ua)) return "Windows 7";
  if (/Mac OS X/i.test(ua)) {
    const match = ua.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
    const ver = match ? match[1].replace(/_/g, '.') : '';
    return `macOS ${ver ? '(' + ver + ')' : ''}`;
  }
  if (/Android/i.test(ua)) {
    const match = ua.match(/Android (\d+(\.\d+)?)/);
    return `Android ${match ? match[1] : ''}`;
  }
  if (/iPhone|iPad|iPod/i.test(ua)) {
    const match = ua.match(/OS (\d+[._]\d+)/);
    return `iOS ${match ? match[1].replace(/_/g, '.') : ''}`;
  }
  if (/Linux/i.test(ua)) return "Linux Kernel";
  return "Unknown System OS";
}

/**
 * Parse human-readable browser details
 */
function getBrowserDetails(ua) {
  let browser = "Unknown Browser";
  let version = "";

  const edgeMatch = ua.match(/(?:Edge|Edg|EdgA)\/(\d+(\.\d+)?)/);
  const chromeMatch = ua.match(/Chrome\/(\d+(\.\d+)?)/);
  const firefoxMatch = ua.match(/Firefox\/(\d+(\.\d+)?)/);
  const safariMatch = ua.match(/Version\/(\d+(\.\d+)?).*Safari/);
  const operaMatch = ua.match(/(?:OPR|Opera)\/(\d+(\.\d+)?)/);

  if (edgeMatch) {
    browser = "Microsoft Edge";
    version = edgeMatch[1];
  } else if (operaMatch) {
    browser = "Opera";
    version = operaMatch[1];
  } else if (chromeMatch) {
    browser = "Google Chrome";
    version = chromeMatch[1];
  } else if (firefoxMatch) {
    browser = "Mozilla Firefox";
    version = firefoxMatch[1];
  } else if (safariMatch) {
    browser = "Apple Safari";
    version = safariMatch[1];
  }

  return version ? `${browser} v${version}` : browser;
}

/**
 * Determine device form factor category
 */
function getDeviceType(ua) {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet Device";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "Mobile Device";
  }
  return "Desktop Workstation";
}




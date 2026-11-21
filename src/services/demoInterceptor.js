import axios from "axios";

export function isDemoMode() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get('demo') === 'true') {
    sessionStorage.setItem('isDemoMode', 'true');
    return true;
  }
  return sessionStorage.getItem('isDemoMode') === 'true';
}

export function enableDemoMode() {
  sessionStorage.setItem('isDemoMode', 'true');
}

export function disableDemoMode() {
  sessionStorage.removeItem('isDemoMode');
}

export function setupDemoAxios() {
  if (!isDemoMode() || axios.__demoInstalled) return;
  axios.__demoInstalled = true;

  const ok = (config, data, status = 200) =>
    Promise.resolve({ data, status, statusText: 'OK', headers: {}, config });

  // Ready for when you connect your Spring Boot backend later:
  axios.defaults.adapter = async (config) => {
    const rawUrl = config.url || '';
    const [rawPath] = rawUrl.split('?');
    const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

    if (path === '/health') return ok(config, { status: 'UP' });

    return ok(config, {});
  };
}
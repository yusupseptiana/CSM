// Small helper to build API paths consistently
export function apiPath(path) {
  const base = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');
  const p = (path || '').replace(/^\//, '');
  return `${base}/${p}`;
}

export default apiPath;

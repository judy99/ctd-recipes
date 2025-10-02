export function getOptions(method, token, payload) {
  return method === 'GET'
    ? {
        method,
        headers: { Authorization: token },
      }
    : {
        method,
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      };
}

const BASE = (typeof window !== 'undefined' && window.__API_BASE__) || 'http://localhost:3000/api';

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, Object.assign({
    headers: { 'Content-Type': 'application/json' }
  }, opts));
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(body && body.message ? body.message : `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return body;
}

export function checkTicket(ticket) {
  if (!ticket) throw new Error('ticket required');
  return request('/tickets/check', { method: 'POST', body: JSON.stringify({ ticket }) });
}

export function listTickets() {
  return request('/tickets');
}

export default { checkTicket, listTickets };
export function isTicketValid(s){
  if (!s) return false;
  const t = String(s).trim();
  // ví dụ: chỉ chữ số và chữ hoa, độ dài 6-20
  return /^[A-Z0-9]{6,20}$/.test(t) || /^[0-9]{6,20}$/.test(t);
}
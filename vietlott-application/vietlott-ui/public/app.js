// client logic: kiểm tra vé + bật/ẩn lịch sử (lưu localStorage)
const API_BASE = (window && window.__API_BASE__) || '/api';

const form = document.getElementById('checkForm');
const input = document.getElementById('ticket');
const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');
const historyList = document.getElementById('historyList');
const toggle = document.getElementById('showHistoryToggle');

function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])) }

function showResult(html){ resultEl.classList.remove('hidden'); resultEl.innerHTML = html; }
function addHistoryLine(text){
  const li = document.createElement('li');
  li.textContent = `${new Date().toLocaleString()} — ${text}`;
  historyList.prepend(li);
  saveHistoryToLocal();
}

function saveHistoryToLocal(){
  const items = Array.from(historyList.children).map(li => li.textContent);
  try { localStorage.setItem('vietlott_history', JSON.stringify(items)); } catch(e){}
}
function loadHistoryFromLocal(){
  try{
    const raw = localStorage.getItem('vietlott_history');
    if (!raw) return;
    const items = JSON.parse(raw);
    items.forEach(text => {
      const li = document.createElement('li'); li.textContent = text; historyList.appendChild(li);
    });
  }catch(e){}
}

// history toggle persistence
function setHistoryVisible(visible){
  if (visible) historyEl.classList.remove('hidden');
  else historyEl.classList.add('hidden');
  try { localStorage.setItem('vietlott_showHistory', visible ? '1' : '0'); } catch(e){}
}

(function initToggle(){
  const saved = localStorage.getItem('vietlott_showHistory');
  const visible = saved === null ? true : saved === '1';
  toggle.checked = visible;
  setHistoryVisible(visible);
  toggle.addEventListener('change', () => setHistoryVisible(toggle.checked));
})();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ticket = input.value.trim();
  if (!ticket) return;
  addHistoryLine(`Đang kiểm tra: ${ticket}`);
  try {
    const res = await fetch(`${API_BASE}/tickets/check`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ ticket })
    });
    if (!res.ok) {
      const err = await res.json().catch(()=>({message:res.statusText}));
      showResult(`<strong>Lỗi:</strong> ${escapeHtml(err.message||'Lỗi')}`);
      return;
    }
    const data = await res.json();
    showResult(`<pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`);
    addHistoryLine(`KQ: ${JSON.stringify(data).slice(0,200)}`);
  } catch (err) {
    showResult(`<strong>Lỗi:</strong> ${escapeHtml(err.message || 'Không xác định')}`);
    addHistoryLine(`Lỗi khi kiểm tra: ${err.message}`);
  } finally {
    input.value = '';
  }
});

// init
loadHistoryFromLocal();
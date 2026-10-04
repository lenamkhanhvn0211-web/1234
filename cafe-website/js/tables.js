const COUNT = 12;
let tables = load("tables", Array.from({ length: COUNT }, (_, i) => ({ id: i + 1, seats: i % 3 === 0 ? 2 : 4, busy: false })));
const wrap = document.getElementById("tables");
function renderTables() {
  wrap.innerHTML = tables.map(t => `<button class="table-btn ${t.busy ? "busy" : ""}" data-id="${t.id}" aria-pressed="${t.busy}">
    <strong>Bàn ${t.id}</strong><small>${t.seats} chỗ</small><small>${t.busy ? "Có khách" : "Trống"}</small></button>`).join("");
  const busy = tables.filter(t => t.busy).length;
  document.getElementById("stat").textContent = `Có khách: ${busy} | Trống: ${tables.length - busy}`;
}
wrap.addEventListener("click", e => {
  const b = e.target.closest("[data-id]"); if (!b) return;
  const t = tables.find(x => x.id == b.dataset.id); t.busy = !t.busy;
  save("tables", tables); renderTables();
});
document.getElementById("reset").addEventListener("click", () => { tables.forEach(t => t.busy = false); save("tables", tables); renderTables(); });
renderTables();

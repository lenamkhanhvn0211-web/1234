let cat = "Tất cả", query = "";
const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase();
const grid = document.getElementById("menu-grid");
const chips = document.getElementById("chips");
function renderChips() {
  chips.innerHTML = ["Tất cả", ...new Set(MENU.map(m => m.cat))]
    .map(c => `<button class="chip ${c === cat ? "on" : ""}" data-cat="${c}">${c}</button>`).join("");
}
function renderMenu() {
  const list = MENU.filter(m => (cat === "Tất cả" || m.cat === cat) && norm(m.name).includes(norm(query)));
  grid.innerHTML = list.length ? list.map(m => `
    <article class="card">
      <div class="thumb" aria-hidden="true">${m.name[0]}</div>
      <div class="card-body"><strong>${m.name}</strong><span>${m.cat}</span>
      <span class="price">${fmt(m.price)}</span>
      <button class="btn" data-id="${m.id}">Thêm vào giỏ</button></div>
    </article>`).join("") : '<p class="empty">Không tìm thấy món phù hợp.</p>';
}
chips.addEventListener("click", e => { if (e.target.dataset.cat) { cat = e.target.dataset.cat; renderChips(); renderMenu(); } });
document.getElementById("search").addEventListener("input", e => { query = e.target.value; renderMenu(); });
grid.addEventListener("click", e => { if (e.target.dataset.id) addToCart(+e.target.dataset.id); });
renderChips(); renderMenu();

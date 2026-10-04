const box = document.getElementById("cart-box");
function renderCart() {
  const cart = getCart(), ids = Object.keys(cart);
  if (!ids.length) { box.innerHTML = '<p class="empty">Giỏ hàng trống. <a href="index.html">Chọn món ở trang Thực đơn</a>.</p>'; updateBadge(); return; }
  box.innerHTML = `<table><thead><tr><th>Món</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th><th></th></tr></thead><tbody>` +
    ids.map(id => { const m = MENU.find(x => x.id == id); return `<tr>
      <td>${m.name}</td><td>${fmt(m.price)}</td>
      <td><span class="qty"><button data-act="dec" data-id="${id}" aria-label="Giảm">-</button>${cart[id]}<button data-act="inc" data-id="${id}" aria-label="Tăng">+</button></span></td>
      <td>${fmt(m.price * cart[id])}</td>
      <td><button class="btn ghost" data-act="del" data-id="${id}">Xóa</button></td></tr>`; }).join("") +
    `</tbody></table><div class="total"><span>Tổng cộng</span><span>${fmt(cartTotal())}</span></div>
    <p style="margin-top:16px"><a class="btn" href="payment.html" style="text-decoration:none;display:inline-block">Đến thanh toán</a></p>`;
  updateBadge();
}
box.addEventListener("click", e => {
  const { act, id } = e.target.dataset; if (!act) return;
  const cart = getCart();
  if (act === "inc") cart[id]++;
  if (act === "dec" && --cart[id] <= 0) delete cart[id];
  if (act === "del") delete cart[id];
  save("cart", cart); renderCart();
});
renderCart();

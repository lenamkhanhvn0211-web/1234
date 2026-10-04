const CODES = { CAFE10: 0.1, HELLO20: 0.2 };
let discount = 0;
const $ = id => document.getElementById(id);
function renderSummary() {
  const cart = getCart(), sub = cartTotal(), cut = Math.round(sub * discount);
  $("lines").innerHTML = Object.keys(cart).map(id => { const m = MENU.find(x => x.id == id);
    return `<tr><td>${m.name} x ${cart[id]}</td><td>${fmt(m.price * cart[id])}</td></tr>`; }).join("") ||
    '<tr><td colspan="2" class="empty">Chưa có món nào trong giỏ.</td></tr>';
  $("sub").textContent = fmt(sub); $("cut").textContent = "-" + fmt(cut); $("sum").textContent = fmt(sub - cut);
}
$("apply").addEventListener("click", () => {
  const code = $("code").value.trim().toUpperCase();
  discount = CODES[code] || 0;
  $("code-msg").textContent = discount ? `Đã áp dụng giảm ${discount * 100}%` : "Mã không hợp lệ.";
  $("code-msg").className = discount ? "msg-ok" : "error";
  renderSummary();
});
$("pay-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("name").value.trim(), phone = $("phone").value.trim(), method = document.querySelector('input[name="method"]:checked');
  $("e-name").textContent = name.length < 2 ? "Nhập họ tên (ít nhất 2 ký tự)." : "";
  $("e-phone").textContent = /^0\d{9}$/.test(phone) ? "" : "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.";
  $("e-method").textContent = method ? "" : "Chọn phương thức thanh toán.";
  $("e-cart").textContent = cartTotal() ? "" : "Giỏ hàng trống, hãy chọn món trước.";
  if (document.querySelectorAll(".error:not(:empty)").length) return;
  const orders = load("orders", []);
  orders.push({ time: new Date().toISOString(), name, phone, method: method.value, items: getCart(), total: cartTotal() * (1 - discount) });
  save("orders", orders); save("cart", {}); updateBadge(); renderSummary();
  $("done").textContent = "Thanh toán thành công. Cảm ơn " + name + "!";
  e.target.reset();
});
renderSummary();

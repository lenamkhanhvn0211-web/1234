const MENU = [
  {id:1,name:"Cà phê đen",cat:"Cà phê",price:25000},
  {id:2,name:"Cà phê sữa",cat:"Cà phê",price:29000},
  {id:3,name:"Bạc xỉu",cat:"Cà phê",price:32000},
  {id:4,name:"Cappuccino",cat:"Cà phê",price:45000},
  {id:5,name:"Trà đào",cat:"Trà",price:39000},
  {id:6,name:"Trà vải",cat:"Trà",price:39000},
  {id:7,name:"Trà sen vàng",cat:"Trà",price:42000},
  {id:8,name:"Sinh tố bơ",cat:"Sinh tố",price:45000},
  {id:9,name:"Sinh tố xoài",cat:"Sinh tố",price:42000},
  {id:10,name:"Bánh tiramisu",cat:"Bánh",price:35000},
  {id:11,name:"Bánh croissant",cat:"Bánh",price:30000},
  {id:12,name:"Bánh cookie",cat:"Bánh",price:20000}
];
const fmt = n => n.toLocaleString("vi-VN") + "đ";
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const getCart = () => load("cart", {});
const cartCount = () => Object.values(getCart()).reduce((a, b) => a + b, 0);
const cartTotal = () => Object.entries(getCart()).reduce((s, [id, q]) => s + MENU.find(m => m.id == id).price * q, 0);
function addToCart(id) { const c = getCart(); c[id] = (c[id] || 0) + 1; save("cart", c); updateBadge(); }
function updateBadge() { const b = document.getElementById("cart-badge"); if (b) b.textContent = cartCount(); }
function renderHeader() {
  const pages = [["index.html","Thực đơn"],["order.html","Gọi món"],["payment.html","Thanh toán"],["tables.html","Quản lý bàn"],["login.html","Đăng nhập"]];
  const here = location.pathname.split("/").pop() || "index.html";
  document.getElementById("site-header").innerHTML =
    '<a class="brand" href="index.html">Quán Cà Phê Góc Phố</a><nav>' +
    pages.map(([h, t]) => `<a href="${h}" class="${h === here ? "active" : ""}">${t}${h === "order.html" ? ' <span class="badge" id="cart-badge">0</span>' : ""}</a>`).join("") +
    "</nav>";
  updateBadge();
}
document.addEventListener("DOMContentLoaded", renderHeader);

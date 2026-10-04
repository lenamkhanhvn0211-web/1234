const ACCOUNTS = { admin: "123456", nhanvien: "cafe2026" };
document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const u = document.getElementById("user").value.trim(), p = document.getElementById("pass").value;
  document.getElementById("e-user").textContent = u ? "" : "Nhập tên đăng nhập.";
  document.getElementById("e-pass").textContent = p.length >= 6 ? "" : "Mật khẩu có ít nhất 6 ký tự.";
  if (!u || p.length < 6) return;
  if (ACCOUNTS[u] === p) { save("user", u); location.href = "tables.html"; }
  else document.getElementById("e-login").textContent = "Sai tên đăng nhập hoặc mật khẩu.";
});

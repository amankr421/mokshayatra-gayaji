// ================= ADMIN PANEL JS =================
console.log("ADMIN PANEL JS LOADED");

// ---------- PAGE DETECT ----------
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("admin-login-form");
  const dashboard = document.querySelector(".admin-dashboard");

  if (loginForm) initAdminLogin();
  if (dashboard) initAdminDashboard();
});

// ---------- ADMIN LOGIN ----------
function initAdminLogin() {
  const loginForm = document.getElementById("admin-login-form");
  const errorDiv = document.getElementById("login-error");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;

    if (email === "aman.admin@mokshayatra.com" && password === "aman@8882") {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminEmail", email);
      window.location.href = "admin-dashboard.html";
    } else {
      errorDiv.style.display = "block";
    }
  });
}

// // ---------- DASHBOARD INIT ----------
// function initAdminDashboard() {
//   if (!localStorage.getItem("adminLoggedIn")) {
//     window.location.href = "admin-login.html";
//     return;
//   }

//   const adminEmail = localStorage.getItem("adminEmail");
//   const userInfo = document.querySelector(".user-info span");
//   if (userInfo && adminEmail) {
//     userInfo.textContent = `Welcome, ${adminEmail.split("@")[0]}`;
//   }

//   loadDashboardData();
//   setupEventListeners();
// }

// // ---------- LOAD DATA FROM BACKEND ----------
// function loadDashboardData() {
//   fetch("http://localhost:3000/api/bookings/all")
//     .then(res => res.json())
//     .then(result => {
//       if (result.success) {
//         updateStats(result.data);
//         loadBookingsTable(result.data);
//       }
//     })
//     .catch(err => console.error("Dashboard error:", err));
// }

// // ---------- STATS ----------
// function updateStats(bookings) {
//   const totalBookings = bookings.length;

//   const totalRevenue = bookings.reduce(
//     (sum, b) => sum + (b.payment?.paidAmount || 0),
//     0
//   );

//   const pendingPayments = bookings.filter(
//     b => (b.payment?.remainingAmount || 0) > 0
//   ).length;

//   document.getElementById("total-bookings").textContent = totalBookings;
//   document.getElementById("total-revenue").textContent = `₹${totalRevenue}`;
//   document.getElementById("pending-payments").textContent = pendingPayments;
// }

// // ---------- BOOKINGS TABLE ----------
// function loadBookingsTable(bookings) {
//   const tbody = document.getElementById("bookings-body");
//   tbody.innerHTML = "";

//   if (bookings.length === 0) {
//     tbody.innerHTML = `
//       <tr>
//         <td colspan="8" style="text-align:center;padding:30px;color:#999">
//           No bookings found
//         </td>
//       </tr>`;
//     return;
//   }

//   bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   bookings.forEach(b => {
//     const status =
//       b.payment.remainingAmount > 0 ? "Pending" : "Completed";
//     const statusClass =
//       status === "Completed" ? "status-success" : "status-pending";

//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td><strong>${b.bookingId}</strong></td>
//       <td>${b.name}<br><small>${b.mobile}</small></td>
//       <td>${b.package.type}</td>
//       <td>
//         ₹${b.package.price}<br>
//         <small>Paid: ₹${b.payment.paidAmount}</small>
//       </td>
//       <td>${b.payment.type}</td>
//       <td>
//         <span class="status-badge ${statusClass}">${status}</span>
//         ${
//           b.payment.remainingAmount > 0
//             ? `<small>₹${b.payment.remainingAmount} remaining</small>`
//             : ""
//         }
//       </td>
//       <td>${new Date(b.createdAt).toLocaleDateString()}</td>
//       <td>
//         <button onclick="viewBooking('${b.bookingId}')">👁</button>
//       </td>
//     `;
//     tbody.appendChild(row);
//   });
// }

// // ---------- SIDEBAR + LOGOUT ----------
// function setupEventListeners() {
//   const logoutBtn = document.getElementById("logout-btn");
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", () => {
//       localStorage.clear();
//       window.location.href = "admin-login.html";
//     });
//   }
// }

// // ---------- VIEW BOOKING ----------
// function viewBooking(id) {
//   fetch("http://localhost:3000/api/bookings/all")
//     .then(res => res.json())
//     .then(result => {
//       const b = result.data.find(x => x.bookingId === id);
//       if (!b) return;

//       alert(`
// Booking ID: ${b.bookingId}
// Name: ${b.name}
// Mobile: ${b.mobile}
// Email: ${b.email}
// Package: ${b.package.type}
// Total: ₹${b.package.price}
// Paid: ₹${b.payment.paidAmount}
// Remaining: ₹${b.payment.remainingAmount}
// Date: ${new Date(b.createdAt).toLocaleString()}
//       `);
//     });
// }

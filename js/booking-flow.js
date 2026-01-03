// ===============================
// OPTION–1 (NO SCREENSHOT, NO GATEWAY)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  initPlans();
  addAdminLoginLink();
  
  // Add event listener for "Book Your Journey" button
  const bookJourneyBtn = document.getElementById("book-journey");
  if (bookJourneyBtn) {
    bookJourneyBtn.addEventListener("click", () => {
      showPlanSelectionModal();
    });
  }
});

// --------------------
// PLAN SELECTION MODAL
// --------------------
function showPlanSelectionModal() {
  const modalHTML = `
  <div class="modal active" id="plan-selection-modal">
    <div class="modal-content" style="max-width: 800px;">
      <span class="close-modal">&times;</span>
      <h2 style="text-align: center; color: #8b0000; margin-bottom: 30px;">
        <i class="fas fa-gem" style="color: #d4af37;"></i> Select Your Package
      </h2>
      <div class="plan-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <!-- Silver Package -->
        <div class="plan-card" style="border: 2px solid #c0c0c0; border-radius: 12px; padding: 25px; text-align: center; transition: all 0.3s ease;">
          <h3 style="color: #c0c0c0; font-size: 1.5rem;">Silver</h3>
          <div class="price" style="font-size: 2rem; color: #333; font-weight: 700; margin: 15px 0;">₹10,000</div>
          <ul style="text-align: left; margin: 20px 0; list-style: none; padding: 0;">
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Comfortable Accommodation</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Basic Panda Ji Assistance</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Local Transport</li>
          </ul>
          <button class="select-plan-btn" data-plan="Silver" style="background: linear-gradient(135deg, #c0c0c0, #a0a0a0); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer; width: 100%;">
            Select Silver Package
          </button>
        </div>

        <!-- Gold Package -->
        <div class="plan-card" style="border: 3px solid #d4af37; border-radius: 12px; padding: 25px; text-align: center; transform: scale(1.05); background: linear-gradient(135deg, #fffaf0, #fff); position: relative;">
          <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: linear-gradient(45deg, #d4af37, #8b0000); color: white; padding: 5px 20px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">
            MOST POPULAR
          </div>
          <h3 style="color: #d4af37; font-size: 1.5rem;">Gold</h3>
          <div class="price" style="font-size: 2rem; color: #333; font-weight: 700; margin: 15px 0;">₹15,000</div>
          <ul style="text-align: left; margin: 20px 0; list-style: none; padding: 0;">
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Premium Accommodation</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Experienced Panda Ji</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> AC Transport</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Satvik Meals</li>
          </ul>
          <button class="select-plan-btn" data-plan="Gold" style="background: linear-gradient(45deg, #d4af37, #8b0000); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer; width: 100%;">
            Select Gold Package
          </button>
        </div>

        <!-- Platinum Package -->
        <div class="plan-card" style="border: 2px solid #e5e4e2; border-radius: 12px; padding: 25px; text-align: center; transition: all 0.3s ease;">
          <h3 style="color: #e5e4e2; font-size: 1.5rem;">Platinum</h3>
          <div class="price" style="font-size: 2rem; color: #333; font-weight: 700; margin: 15px 0;">₹25,000</div>
          <ul style="text-align: left; margin: 20px 0; list-style: none; padding: 0;">
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Luxury Accommodation</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Senior Panda Ji</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Premium AC Transport</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> All Meals Included</li>
            <li style="padding: 8px 0;"><i class="fas fa-check" style="color: #4CAF50;"></i> Complete Ritual Management</li>
          </ul>
          <button class="select-plan-btn" data-plan="Platinum" style="background: linear-gradient(135deg, #e5e4e2, #b0b0b0); color: #333; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer; width: 100%;">
            Select Platinum Package
          </button>
        </div>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Close modal functionality
  document.querySelector("#plan-selection-modal .close-modal").onclick = () => {
    document.getElementById("plan-selection-modal").remove();
  };

  // Add click event to plan selection buttons
  document.querySelectorAll(".select-plan-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const plan = btn.dataset.plan;
      document.getElementById("plan-selection-modal").remove();
      startBooking(plan);
    });
  });
}

// --------------------
// PLAN SELECTION
// --------------------
function initPlans() {
  document.querySelectorAll(".select-plan").forEach(btn => {
    btn.addEventListener("click", () => {
      const plan = btn.dataset.plan;
      startBooking(plan);
    });
  });
}

function startBooking(planType) {
  const prices = { Silver: 10000, Gold: 15000, Platinum: 25000 };
  const pkg = {
    name: `${planType} Package`,
    type: planType,
    basePrice: prices[planType], // Store base price separately
    price: prices[planType], // This will be updated based on number of people
    features: planType === "Silver" ? [
      "Comfortable Accommodation",
      "Basic Panda Ji Assistance",
      "Local Transport"
    ] : planType === "Gold" ? [
      "Premium Accommodation",
      "Experienced Panda Ji",
      "AC Transport",
      "Satvik Meals"
    ] : [
      "Luxury Accommodation",
      "Senior Panda Ji",
      "Premium AC Transport",
      "All Meals Included",
      "Complete Ritual Management"
    ]
  };
  localStorage.setItem("selectedPackage", JSON.stringify(pkg));
  showBookingForm();
}

// --------------------
// BOOKING FORM
// --------------------
function showBookingForm() {
  if (document.getElementById("booking-modal")) return;

  const html = `
  <div class="modal active" id="booking-modal">
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2 style="text-align: center; color: #8b0000; margin-bottom: 25px;">
        <i class="fas fa-user-check" style="color: #d4af37; margin-right: 10px;"></i> Booking Details
      </h2>
      <form id="booking-form">
        <div class="form-group">
          <input type="text" id="name" placeholder="Full Name" required>
          <i class="fas fa-user form-icon"></i>
        </div>
        <div class="form-group">
          <input type="tel" id="mobile" placeholder="Mobile Number" required>
          <i class="fas fa-phone form-icon"></i>
        </div>
        <div class="form-group">
          <input type="email" id="email" placeholder="Email Address" required>
          <i class="fas fa-envelope form-icon"></i>
        </div>
        <div class="form-group">
          <textarea id="address" placeholder="Full Address" rows="3" required></textarea>
          <i class="fas fa-home form-icon"></i>
        </div>
        <div class="form-row">
          <div class="form-group">
            <input type="date" id="travelDate" required>
            <i class="fas fa-calendar-alt form-icon"></i>
          </div>
          <div class="form-group">
            <select id="people" required>
              <option value="">No. of People</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="7">7 People</option>
              <option value="8">8 People</option>
              <option value="9">9 People</option>
              <option value="10">10 People</option>
            </select>
            <i class="fas fa-users form-icon"></i>
          </div>
        </div>
        <button type="submit" style="background: linear-gradient(45deg, #8b0000, #a52a2a); color: white; border: none; padding: 15px; border-radius: 8px; font-size: 1.1rem; font-weight: 600; width: 100%; cursor: pointer; transition: all 0.3s ease;">
          <i class="fas fa-lock" style="margin-right: 10px;"></i> Proceed to Payment
        </button>
      </form>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", html);

  // Add styles for form
  const style = document.createElement('style');
  style.textContent = `
    .form-group {
      position: relative;
      margin-bottom: 20px;
    }
    .form-group input, .form-group textarea, .form-group select {
      width: 100%;
      padding: 12px 15px 12px 40px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
      outline: none;
      border-color: #8b0000;
      box-shadow: 0 0 0 3px rgba(139, 0, 0, 0.1);
    }
    .form-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #8b0000;
      font-size: 1.1rem;
    }
    .form-group textarea {
      resize: vertical;
      min-height: 80px;
    }
    .form-row {
      display: flex;
      gap: 15px;
    }
    .form-row .form-group {
      flex: 1;
    }
    #booking-form button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(139, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(style);

  // Close modal functionality
  document.querySelector("#booking-modal .close-modal").onclick = () => {
    document.getElementById("booking-modal").remove();
  };

  document.getElementById("booking-form").onsubmit = e => {
    e.preventDefault();
    const pkg = JSON.parse(localStorage.getItem("selectedPackage"));
    const peopleCount = Number(document.getElementById("people").value);
    
    // Calculate total price based on number of people
    const totalPrice = pkg.basePrice * peopleCount;
    
    const booking = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      travelDate: document.getElementById("travelDate").value,
      peopleCount: peopleCount,
      package: {
        ...pkg,
        price: totalPrice // Update price based on number of people
      }
    };
    localStorage.setItem("bookingData", JSON.stringify(booking));
    document.getElementById("booking-modal").remove();
    showPaymentModal();
  };
}

// --------------------
// PAYMENT MODAL (MANUAL UPI) - FIXED TO OPEN IN CENTER
// --------------------
function showPaymentModal() {
  const booking = JSON.parse(localStorage.getItem("bookingData"));
  
  // Add inline CSS with fixed positioning
  const style = document.createElement('style');
  style.textContent = `
    /* Fix payment modal to center */
    .payment-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .payment-container {
      background: white;
      border-radius: 12px;
      max-width: 900px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    
    .payment-header {
      background: linear-gradient(45deg, #8b0000, #a52a2a);
      color: white;
      padding: 20px 30px;
      border-radius: 12px 12px 0 0;
    }
    
    .payment-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      padding: 30px;
    }
    
    /* QR Code Fix */
    .qr-box {
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      background: #fafafa;
      margin-bottom: 20px;
    }
    
    .qr-code-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
    
    .qr-code-image {
      width: 200px;
      height: 200px;
      object-fit: contain;
      border: 2px solid #4CAF50;
      border-radius: 10px;
      padding: 10px;
      background: white;
      box-shadow: 0 4px 8px rgba(76, 175, 80, 0.2);
    }
    
    .qr-instructions {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      width: 100%;
      border-left: 4px solid #4CAF50;
    }
    
    .qr-instructions p {
      margin: 5px 0;
      color: #333;
    }
    
    .qr-instructions small {
      color: #666;
      font-size: 12px;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .payment-content {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);

  const html = `
  <div class="payment-modal active" id="payment-modal">
    <div class="payment-container">
      <!-- Header -->
      <div class="payment-header">
        <h2><i class="fas fa-lock" style="margin-right: 10px;"></i> Secure Payment Gateway</h2>
      </div>

      <!-- Content -->
      <div class="payment-content">
        <!-- Left Panel -->
        <div class="left-panel">
          <!-- Package Summary -->
          <div class="summary-card">
            <div class="summary-title">
              <i class="fas fa-receipt"></i> Package Summary
            </div>
            <div class="summary-grid">
              <div class="summary-item">
                <div class="summary-label">Package:</div>
                <div class="summary-value">${booking.package.name}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Travel Date:</div>
                <div class="summary-value">${booking.travelDate}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">No. of People:</div>
                <div class="summary-value">${booking.peopleCount} (₹${booking.package.basePrice.toLocaleString()} × ${booking.peopleCount})</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Customer:</div>
                <div class="summary-value">${booking.name}</div>
              </div>
            </div>
            <div class="summary-total">
              <div class="summary-item">
                <div class="summary-label">Total Amount:</div>
                <div class="summary-value">₹${booking.package.price.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <!-- Payment Options -->
          <h3 class="options-title">Payment Options</h3>
          <div class="options-grid">
            <div class="payment-option selected">
              <div class="option-top">
                <div class="option-name">
                  <i class="fas fa-mobile-alt"></i> Manual UPI Transfer
                </div>
                <div class="option-badge">Recommended</div>
              </div>
              <div class="option-desc">
                Transfer directly to our UPI ID. No screenshots needed.
              </div>
              <div class="option-amount">₹${booking.package.price.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <!-- Right Panel -->
        <div class="right-panel">
          <!-- UPI Section -->
          <div class="upi-card">
            <div class="upi-title">
              <i class="fas fa-qrcode"></i> UPI Payment Details
            </div>
            
            <div class="upi-id-box">
              <span class="upi-id">6397714735@kotak811</span>
              <button class="copy-btn" onclick="copyUPI()">
                <i class="fas fa-copy"></i> Copy
              </button>
            </div>

            <div class="qr-box">
              <div class="qr-code-container">
                <!-- UPI QR Code Image -->
                <img src="../assets/images/upi-qr.jpeg" 
                     alt="Scan to Pay - MokshaYatra UPI QR Code"
                     class="qr-code-image">
                
                <div class="qr-instructions">
                  <p><strong>Scan to Pay</strong></p>
                  <p>Use any UPI app to scan</p>
                  <small>UPI ID: mokshayatra@upi</small>
                </div>
              </div>
            </div>

          <!-- Instructions -->

          <!-- Amount Input -->
          <div class="amount-section">
            <h4 class="amount-title">
              <i class="fas fa-rupee-sign"></i> Enter Payment Amount
            </h4>
            <div class="amount-input-group">
              <label>₹</label>
              <input type="number" id="paidAmount" 
                placeholder="Enter amount paid (₹1 minimum)"
                min="1" max="${booking.package.price}" 
                value="${booking.package.price}">
            </div>
            <small class="amount-hint">
              Minimum: ₹1 | Maximum: ₹${booking.package.price.toLocaleString()}
            </small>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="payment-footer">
        <button class="btn-cancel" onclick="cancelPayment()">
          <i class="fas fa-times"></i> Cancel
        </button>
        <button class="btn-confirm" id="confirmPayment">
          <i class="fas fa-check-circle"></i> I Have Completed Payment
        </button>
      </div>

      <!-- Close Button -->
      <button class="close-btn" onclick="cancelPayment()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", html);

  // Add UPI copy functionality
  window.copyUPI = function() {
    navigator.clipboard.writeText("6397714735@kotak811").then(() => {
      showToast("UPI ID copied to clipboard!");
    });
  };

  // Cancel payment function
  window.cancelPayment = function() {
    if (confirm("Are you sure you want to cancel the payment? Your booking will be saved for 24 hours.")) {
      document.getElementById("payment-modal").remove();
    }
  };

  // Confirm payment
  document.getElementById("confirmPayment").onclick = () => {
    const amt = Number(document.getElementById("paidAmount").value);
    const total = booking.package.price;
    
    if (!amt || amt < 1) {
      showToast("Please enter a valid amount (₹1 minimum)", "error");
      return;
    }
    if (amt > total) {
      showToast(`Amount cannot exceed ₹${total.toLocaleString()}`, "error");
      return;
    }
    completePayment(amt);
  };
}

// --------------------
// COMPLETE PAYMENT (AUTO SUCCESS)
// --------------------
function completePayment(paidAmount) {
  const booking = JSON.parse(localStorage.getItem("bookingData"));
  const total = booking.package.price;

  const bookingId = "MY" + Date.now();

  const record = {
    bookingId,
    name: booking.name,
    mobile: booking.mobile,
    email: booking.email,
    address: booking.address,
    travelDate: booking.travelDate,
    peopleCount: booking.peopleCount,
    package: {
      name: booking.package.name,
      type: booking.package.type,
      basePrice: booking.package.basePrice,
      price: booking.package.price,
      peopleCount: booking.peopleCount
    },
    payment: {
      type: paidAmount === total ? "full" : "advance",
      paidAmount: paidAmount,
      remainingAmount: Math.max(total - paidAmount, 0),
      status: "success",
      upiId: "6397714735@kotak811"
    },
    bookingDate: new Date().toISOString()
  };

  // SAVE TO LOCALSTORAGE FOR RECEIPT
  const existing = JSON.parse(localStorage.getItem("mokshayatra_bookings")) || [];
  const receiptRecord = {
    bookingId,
    name: booking.name,
    email: booking.email,
    mobile: booking.mobile,
    travelDate: booking.travelDate,
    peopleCount: booking.peopleCount,
    package: {
      name: booking.package.name,
      basePrice: booking.package.basePrice,
      price: booking.package.price,
      peopleCount: booking.peopleCount
    },
    paidAmount,
    remainingAmount: Math.max(total - paidAmount, 0),
    paymentMethod: "UPI",
    paymentStatus: "success",
    totalAmount: total
  };
  existing.push(receiptRecord);
  localStorage.setItem("mokshayatra_bookings", JSON.stringify(existing));

  // Save to database
  fetch("http://localhost:3000/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Booking saved in DB", data);
    })
    .catch(err => console.error("DB error:", err));

  document.getElementById("payment-modal").remove();
  showSuccess(receiptRecord);
}

// --------------------
// SUCCESS + RECEIPT
// --------------------
function showSuccess(data) {
  const html = `
  <div class="modal active">
    <div class="modal-content" style="max-width: 500px; text-align: center;">
      <div style="font-size: 5rem; color: #4CAF50; margin-bottom: 20px;">
        <i class="fas fa-check-circle"></i>
      </div>
      <h2 style="color: #4CAF50; margin-bottom: 20px;">Payment Successful!</h2>
      <div style="background: linear-gradient(135deg, #f0fff4, #fff); padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #4CAF50;">
        <p style="font-size: 1.1rem; margin: 10px 0;"><strong>Booking ID:</strong> ${data.bookingId}</p>
        <p style="font-size: 1.1rem; margin: 10px 0;"><strong>Package:</strong> ${data.package.name}</p>
        <p style="font-size: 1.1rem; margin: 10px 0;"><strong>No. of People:</strong> ${data.peopleCount}</p>
        <p style="font-size: 1.1rem; margin: 10px 0;"><strong>Total Amount:</strong> ₹${data.totalAmount.toLocaleString()}</p>
        <p style="font-size: 1.1rem; margin: 10px 0;"><strong>Amount Paid:</strong> ₹${data.paidAmount.toLocaleString()}</p>
        <p style="font-size: 1.1rem; margin: 10px 0;"><strong>Remaining:</strong> ₹${data.remainingAmount.toLocaleString()}</p>
        <p style="font-size: 1.1rem; margin: 10px 0;"><strong>Status:</strong> <span style="color: #4CAF50;">Confirmed ✅</span></p>
      </div>
      <div style="display: flex; gap: 15px; margin-top: 30px;">
        <button onclick="downloadReceipt()" style="flex: 1; background: linear-gradient(45deg, #8b0000, #a52a2a); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
          <i class="fas fa-download"></i> Download Receipt
        </button>
        <button onclick="location.reload()" style="flex: 1; background: linear-gradient(45deg, #4CAF50, #45a049); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">
          <i class="fas fa-home"></i> Back to Home
        </button>
      </div>
      <p style="margin-top: 20px; color: #666; font-size: 0.9rem;">
        <i class="fas fa-info-circle" style="color: #d4af37;"></i>
        We'll contact you within 24 hours for further details.
      </p>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", html);
}

function downloadReceipt() {
  // Get data safely
  const bookings = JSON.parse(localStorage.getItem("mokshayatra_bookings"));
  
  if (!bookings || bookings.length === 0) {
    alert("No booking data found!");
    return;
  }
  
  const data = bookings.slice(-1)[0]; // Get latest booking
  
  if (!data) {
    alert("Booking data is invalid!");
    return;
  }
  
  // Create HTML receipt
  const receiptHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>MokshaYatra Receipt - ${data.bookingId}</title>
    <style>
      /* Reset and base styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Arial', sans-serif;
        width: 210mm; /* A4 width */
        min-height: 297mm; /* A4 height */
        margin: 0 auto;
        padding: 10mm;
        background: white;
        color: #333;
        font-size: 12px;
        line-height: 1.4;
      }
      
      /* Compact layout */
      .receipt-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      /* Header - More compact */
      .header {
        background: #8b0000;
        color: white;
        padding: 12px 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
        margin-bottom: 15px;
      }
      
      .header h1 {
        font-size: 22px;
        margin-bottom: 5px;
        letter-spacing: 1px;
      }
      
      .header p {
        font-size: 12px;
        opacity: 0.9;
      }
      
      /* Main content - Optimized for single page */
      .content {
        flex: 1;
        border: 2px solid #8b0000;
        border-top: none;
        padding: 20px;
        border-radius: 0 0 8px 8px;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      /* Receipt title */
      .receipt-title {
        text-align: center;
        color: #4CAF50;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 2px solid #4CAF50;
        font-size: 18px;
      }
      
      /* Grid layout for sections */
      .sections-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 10px;
      }
      
      /* Section styling */
      .section {
        background: #f9f9f9;
        padding: 12px;
        border-radius: 6px;
        border-left: 3px solid #8b0000;
      }
      
      .section-title {
        color: #8b0000;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .section-title i {
        font-size: 14px;
      }
      
      /* Row styling - more compact */
      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        padding: 4px 0;
        font-size: 11px;
      }
      
      .row:last-child {
        margin-bottom: 0;
      }
      
      .label {
        font-weight: 600;
        color: #555;
        min-width: 120px;
      }
      
      .value {
        font-weight: 600;
        text-align: right;
        flex: 1;
      }
      
      /* Payment summary - more compact */
      .payment-summary {
        background: #f0fff4;
        padding: 15px;
        border-radius: 6px;
        border: 2px solid #4CAF50;
        margin-top: 10px;
      }
      
      .payment-summary .row {
        font-size: 13px;
        padding: 6px 0;
      }
      
      .payment-summary .total {
        font-size: 16px;
        color: #4CAF50;
        font-weight: bold;
        margin-top: 5px;
        padding-top: 8px;
        border-top: 2px solid #4CAF50;
      }
      
      /* Footer - more compact */
      .footer {
        margin-top: 15px;
        text-align: center;
        color: #666;
        font-size: 10px;
        padding-top: 12px;
        border-top: 1px solid #eee;
        line-height: 1.3;
      }
      
      /* Status badge */
      .status-badge {
        background: #4CAF50;
        color: white;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 10px;
        font-weight: bold;
        display: inline-block;
      }
      
      /* Print button - hidden when printing */
      .print-btn {
        display: block;
        margin: 15px auto;
        padding: 10px 25px;
        background: #8b0000;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
      }
      
      .print-btn:hover {
        background: #a52a2a;
        transform: translateY(-2px);
      }
      
      /* Hide elements when printing */
      @media print {
        body {
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          font-size: 11px;
        }
        
        .print-btn {
          display: none !important;
        }
        
        .header {
          padding: 10px 15px;
        }
        
        .content {
          padding: 15px;
          border: none;
        }
        
        /* Ensure single page */
        .receipt-container {
          page-break-inside: avoid;
          break-inside: avoid;
        }
      }
      
      /* Responsive adjustments */
      @media screen and (max-width: 768px) {
        body {
          width: 100%;
          padding: 10px;
        }
        
        .sections-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  </head>
  <body>
    <div class="receipt-container">
      <div class="header">
        <h1>MOKSHAYATRA</h1>
        <p>Sacred Pilgrimage to Gaya Ji</p>
      </div>
      
      <div class="content">
        <h2 class="receipt-title">
          <i class="fas fa-check-circle"></i> PAYMENT RECEIPT
        </h2>
        
        <div class="sections-grid">
          <!-- Receipt Details Section -->
          <div class="section">
            <h3 class="section-title">
              <i class="fas fa-receipt"></i> Receipt Details
            </h3>
            <div class="row">
              <span class="label">Receipt No:</span>
              <span class="value">${data.bookingId}</span>
            </div>
            <div class="row">
              <span class="label">Date:</span>
              <span class="value">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="row">
              <span class="label">Time:</span>
              <span class="value">${new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <!-- Customer Details Section -->
          <div class="section">
            <h3 class="section-title">
              <i class="fas fa-user"></i> Customer Details
            </h3>
            <div class="row">
              <span class="label">Name:</span>
              <span class="value">${data.name}</span>
            </div>
            <div class="row">
              <span class="label">Email:</span>
              <span class="value">${data.email}</span>
            </div>
            <div class="row">
              <span class="label">Mobile:</span>
              <span class="value">${data.mobile}</span>
            </div>
          </div>
          
          <!-- Booking Details Section -->
          <div class="section">
            <h3 class="section-title">
              <i class="fas fa-calendar-alt"></i> Booking Details
            </h3>
            <div class="row">
              <span class="label">Package:</span>
              <span class="value">${data.package?.name || "N/A"}</span>
            </div>
            <div class="row">
              <span class="label">Travel Date:</span>
              <span class="value">${data.travelDate || "To be confirmed"}</span>
            </div>
            <div class="row">
              <span class="label">No. of People:</span>
              <span class="value">${data.peopleCount || 1}</span>
            </div>
            <div class="row">
              <span class="label">Price per Person:</span>
              <span class="value">₹${data.package?.basePrice || 0}</span>
            </div>
          </div>
          
          <!-- Payment Status Section -->
          <div class="section">
            <h3 class="section-title">
              <i class="fas fa-credit-card"></i> Payment Status
            </h3>
            <div class="row">
              <span class="label">Status:</span>
              <span class="value">
                <span class="status-badge">${(data.paymentStatus || "SUCCESS").toUpperCase()}</span>
              </span>
            </div>
            <div class="row">
              <span class="label">Payment Method:</span>
              <span class="value">${data.paymentMethod || "UPI"}</span>
            </div>
            <div class="row">
              <span class="label">Transaction ID:</span>
              <span class="value">${data.bookingId}</span>
            </div>
          </div>
        </div>
        
        <!-- Payment Summary -->
        <div class="payment-summary">
          <h3 class="section-title" style="border-color: #4CAF50;">
            <i class="fas fa-rupee-sign"></i> Payment Summary
          </h3>
          <div class="row">
            <span class="label">Package Price (per person):</span>
            <span class="value">₹${data.package?.basePrice || 0}</span>
          </div>
          <div class="row">
            <span class="label">Number of People:</span>
            <span class="value">${data.peopleCount || 1}</span>
          </div>
          <div class="row">
            <span class="label">Total Package Price:</span>
            <span class="value">₹${data.totalAmount || data.package?.price || 0}</span>
          </div>
          <div class="row">
            <span class="label">Amount Paid:</span>
            <span class="value">₹${data.paidAmount || 0}</span>
          </div>
          <div class="row">
            <span class="label">Remaining Amount:</span>
            <span class="value">₹${data.remainingAmount || 0}</span>
          </div>
          <div class="row total">
            <span class="label">GRAND TOTAL:</span>
            <span class="value">₹${data.totalAmount || data.package?.price || 0}</span>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p><strong>Thank you for choosing MokshaYatra.</strong> May your journey bring peace to your ancestors.</p>
          <p>For any queries, contact: info@mokshayatra.com | +91 98765 43210</p>
          <p style="margin-top: 5px; font-style: italic;">
            <i class="fas fa-info-circle"></i> This is a computer-generated receipt. No signature required.
          </p>
        </div>
      </div>
      
      <button class="print-btn" onclick="window.print()">
        <i class="fas fa-print"></i> Print Receipt
      </button>
    </div>
    
    <script>
      // Auto-print after 1 second
      setTimeout(() => {
        window.print();
      }, 1000);
      
      // Close window after printing
      window.onafterprint = function() {
        setTimeout(() => {
          window.close();
        }, 500);
      };
    </script>
  </body>
  </html>
  `;
  
  // Open receipt in new window
  const receiptWindow = window.open('', '_blank');
  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();
}

// --------------------
// HELPER FUNCTIONS
// --------------------
function showToast(message, type = "success") {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#f44336' : '#4CAF50'};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// --------------------
function addAdminLoginLink() {
  const f = document.querySelector(".footer");
  if (f) {
    f.insertAdjacentHTML("beforeend",
      `<a href="admin/admin-login.html" style="color: #d4af37; text-decoration: none; font-weight: 500; margin-top: 10px; display: inline-block;">
        <i class="fas fa-user-shield" style="margin-right: 5px;"></i> Admin Login
      </a>`);
  }
}
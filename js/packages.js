// // Handle booking form submit
// bookingForm.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const data = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     mobile: document.getElementById("phone").value,
//     address: "Gaya, Bihar",
//     travelDate: document.getElementById("date").value,
//     peopleCount: document.getElementById("people").value,
//     planType: document.getElementById("plan").value,
//     paymentType: document.getElementById("paymentType").value
//   };

//   if (!data.paymentType) {
//     showToast("Please select payment option", "error");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:3000/api/bookings/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     });

//     const result = await res.json();

//     if (result.success) {
//       showToast(
//         `Booking Successful! 
// Paid: ₹${result.paidAmount}, 
// Remaining: ₹${result.remainingAmount}`,
//         "success"
//       );

//       bookingForm.reset();
//       modal.classList.remove("active");
//       document.body.style.overflow = "auto";
//     } else {
//       showToast("Booking failed. Try again.", "error");
//     }

//   } catch (err) {
//     console.error(err);
//     showToast("Server error. Try later.", "error");
//   }
// });

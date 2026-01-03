// // Payment System for MokshaYatra
// // This file handles payment calculations, UPI integration, and payment processing

// class PaymentSystem {
//     constructor() {
//         this.selectedPaymentType = 'full';
//         this.uploadedFile = null;
//         this.bookingData = null;
//         this.init();
//     }

//     init() {
//         console.log('Payment system initialized');
//         this.loadBookingData();
//     }

//     loadBookingData() {
//         const data = localStorage.getItem('bookingData');
//         if (data) {
//             this.bookingData = JSON.parse(data);
//             console.log('Booking data loaded:', this.bookingData);
//         }
//     }

//     // Calculate payment amounts based on package and payment type
//     calculatePayment(packageAmount, paymentType = 'full') {
//         let paidAmount = 0;
//         let remainingAmount = 0;
        
//         if (paymentType === 'full') {
//             paidAmount = packageAmount;
//             remainingAmount = 0;
//         } else if (paymentType === 'advance') {
//             paidAmount = Math.round(packageAmount * 0.1); // 10% advance
//             remainingAmount = packageAmount - paidAmount;
//         } else {
//             throw new Error('Invalid payment type. Must be "full" or "advance"');
//         }
        
//         return {
//             packageAmount,
//             paymentType,
//             paidAmount,
//             remainingAmount,
//             advancePercentage: paymentType === 'advance' ? 10 : 100
//         };
//     }

//     // Format currency in Indian format
//     formatCurrency(amount) {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0
//         }).format(amount);
//     }

//     // Generate UPI payment link
//     generateUPILink(amount, upiId = '8734573457@axl') {
//         // Remove any non-numeric characters from amount
//         const numericAmount = amount.toString().replace(/[^0-9]/g, '');
        
//         // Create UPI payment URL
//         const upiUrl = `upi://pay?pa=${upiId}&pn=MokshaYatra&am=${numericAmount}&cu=INR&tn=Booking%20Payment`;
        
//         return {
//             upiId: upiId,
//             amount: amount,
//             url: upiUrl,
//             qrData: `upi://pay?pa=${upiId}&am=${numericAmount}&pn=MokshaYatra&cu=INR`
//         };
//     }

//     // Generate QR code data URL (placeholder - can be replaced with actual QR generator)
//     generateQRCode(text, size = 200) {
//         // This is a placeholder. In production, use a QR code library like qrcode.js
//         const canvas = document.createElement('canvas');
//         canvas.width = size;
//         canvas.height = size;
//         const ctx = canvas.getContext('2d');
        
//         // Simple QR code-like pattern (replace with actual QR generation)
//         ctx.fillStyle = '#ffffff';
//         ctx.fillRect(0, 0, size, size);
        
//         // Draw pattern
//         ctx.fillStyle = '#000000';
//         const blockSize = size / 10;
        
//         for (let i = 0; i < 10; i++) {
//             for (let j = 0; j < 10; j++) {
//                 if ((i + j) % 3 === 0 || (i * j) % 7 === 0) {
//                     ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize);
//                 }
//             }
//         }
        
//         return canvas.toDataURL('image/png');
//     }

//     // Validate uploaded file
//     validateFile(file) {
//         const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//         const maxSize = 5 * 1024 * 1024; // 5MB
        
//         if (!validTypes.includes(file.type)) {
//             return {
//                 valid: false,
//                 error: 'Please upload an image file (JPEG, PNG, GIF, WebP)'
//             };
//         }
        
//         if (file.size > maxSize) {
//             return {
//                 valid: false,
//                 error: 'File size should be less than 5MB'
//             };
//         }
        
//         return {
//             valid: true,
//             file: file
//         };
//     }

//     // Process file upload
//     async processFileUpload(file) {
//         const validation = this.validateFile(file);
        
//         if (!validation.valid) {
//             throw new Error(validation.error);
//         }
        
//         this.uploadedFile = file;
        
//         // Convert file to base64 for preview
//         const base64 = await this.fileToBase64(file);
        
//         return {
//             success: true,
//             fileName: file.name,
//             fileSize: this.formatFileSize(file.size),
//             fileType: file.type,
//             base64: base64,
//             timestamp: new Date().toISOString()
//         };
//     }

//     // Convert file to base64
//     fileToBase64(file) {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = error => reject(error);
//         });
//     }

//     // Format file size
//     formatFileSize(bytes) {
//         if (bytes === 0) return '0 Bytes';
        
//         const k = 1024;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//         const i = Math.floor(Math.log(bytes) / Math.log(k));
        
//         return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//     }

//     // Generate booking ID
//     generateBookingId() {
//         const timestamp = Date.now();
//         const random = Math.floor(Math.random() * 10000);
//         return `MY${timestamp}${random}`;
//     }

//     // Prepare payment data for storage
//     preparePaymentData(paymentCalculation) {
//         if (!this.bookingData) {
//             throw new Error('No booking data found');
//         }
        
//         const bookingId = this.generateBookingId();
        
//         return {
//             bookingId: bookingId,
//             ...this.bookingData,
//             payment: {
//                 type: paymentCalculation.paymentType,
//                 packageAmount: paymentCalculation.packageAmount,
//                 paidAmount: paymentCalculation.paidAmount,
//                 remainingAmount: paymentCalculation.remainingAmount,
//                 status: 'pending',
//                 method: 'upi',
//                 upiId: '8734573457@axl',
//                 screenshot: this.uploadedFile ? this.uploadedFile.name : null,
//                 transactionDate: new Date().toISOString()
//             },
//             status: 'confirmed',
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString()
//         };
//     }

//     // Process payment
//     async processPayment(paymentType = 'full') {
//         try {
//             // Validate
//             if (!this.bookingData) {
//                 throw new Error('No booking data available');
//             }
            
//             if (!this.uploadedFile && paymentType !== 'test') {
//                 throw new Error('Please upload payment screenshot');
//             }
            
//             // Calculate payment
//             const paymentCalculation = this.calculatePayment(
//                 this.bookingData.package.price,
//                 paymentType
//             );
            
//             // Prepare data
//             const paymentData = this.preparePaymentData(paymentCalculation);
            
//             // Simulate payment processing
//             await this.simulatePaymentProcessing(paymentData);
            
//             // Save to storage
//             this.savePaymentToStorage(paymentData);
            
//             return {
//                 success: true,
//                 message: 'Payment processed successfully',
//                 data: paymentData
//             };
            
//         } catch (error) {
//             console.error('Payment processing error:', error);
//             return {
//                 success: false,
//                 error: error.message
//             };
//         }
//     }

//     // Simulate payment processing (replace with actual API call)
//     async simulatePaymentProcessing(paymentData) {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 paymentData.payment.status = 'success';
//                 paymentData.payment.transactionId = 'TXN' + Date.now();
//                 resolve(paymentData);
//             }, 1000);
//         });
//     }

//     // Save payment data to localStorage
//     savePaymentToStorage(paymentData) {
//         try {
//             let payments = JSON.parse(localStorage.getItem('mokshayatra_payments')) || [];
//             payments.push(paymentData);
//             localStorage.setItem('mokshayatra_payments', JSON.stringify(payments));
            
//             // Also save to bookings for admin panel
//             let bookings = JSON.parse(localStorage.getItem('mokshayatra_bookings')) || [];
//             bookings.push(paymentData);
//             localStorage.setItem('mokshayatra_bookings', JSON.stringify(bookings));
            
//             console.log('Payment saved:', paymentData.bookingId);
            
//         } catch (error) {
//             console.error('Error saving payment:', error);
//             throw new Error('Failed to save payment data');
//         }
//     }

//     // Generate receipt
//     generateReceipt(paymentData) {
//         const receipt = {
//             header: 'MOKSHAYATRA - BOOKING RECEIPT',
//             separator: '='.repeat(50),
//             details: {
//                 'Booking ID': paymentData.bookingId,
//                 'Date': new Date(paymentData.createdAt).toLocaleDateString('en-IN'),
//                 'Time': new Date(paymentData.createdAt).toLocaleTimeString('en-IN'),
//                 'Customer Name': paymentData.name,
//                 'Mobile': paymentData.mobile,
//                 'Email': paymentData.email,
//                 'Package': paymentData.package.name,
//                 'Package Type': paymentData.package.type,
//                 'Total Amount': this.formatCurrency(paymentData.payment.packageAmount),
//                 'Payment Type': paymentData.payment.type === 'full' ? 'Full Payment' : '10% Advance',
//                 'Paid Amount': this.formatCurrency(paymentData.payment.paidAmount),
//                 'Remaining Amount': this.formatCurrency(paymentData.payment.remainingAmount),
//                 'Payment Status': paymentData.payment.status.toUpperCase(),
//                 'Transaction Date': new Date(paymentData.payment.transactionDate).toLocaleString('en-IN')
//             },
//             footer: `
// Thank you for choosing MokshaYatra!
// For any queries, contact: +91 98765 43210

// Om Shanti

// ${'='.repeat(50)}
// This is a computer-generated receipt.
// Valid without signature.
//             `
//         };
        
//         return receipt;
//     }

//     // Download receipt as text file
//     downloadReceipt(paymentData) {
//         const receipt = this.generateReceipt(paymentData);
        
//         let receiptText = `${receipt.header}\n`;
//         receiptText += `${receipt.separator}\n\n`;
        
//         // Add details
//         Object.entries(receipt.details).forEach(([key, value]) => {
//             receiptText += `${key}: ${value}\n`;
//         });
        
//         receiptText += `\n${receipt.separator}\n`;
//         receiptText += receipt.footer;
        
//         // Create and trigger download
//         const blob = new Blob([receiptText], { type: 'text/plain' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `MokshaYatra_Receipt_${paymentData.bookingId}.txt`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
        
//         return true;
//     }

//     // Send WhatsApp notification
//     sendWhatsAppNotification(paymentData) {
//         const message = `Namaste! 🙏

// ✅ Your MokshaYatra booking is confirmed!

// 📋 *Booking Details:*
// Booking ID: ${paymentData.bookingId}
// Name: ${paymentData.name}
// Package: ${paymentData.package.name}
// Total Amount: ${this.formatCurrency(paymentData.payment.packageAmount)}
// Paid Amount: ${this.formatCurrency(paymentData.payment.paidAmount)}
// Payment Type: ${paymentData.payment.type === 'full' ? 'Full Payment' : '10% Advance'}
// Status: ${paymentData.payment.status.toUpperCase()}

// We will contact you within 24 hours for further details.
// Thank you for choosing MokshaYatra!

// Om Shanti 🙏`;

//         const phoneNumber = '919876543210'; // Replace with your number
//         const encodedMessage = encodeURIComponent(message);
//         const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
//         return whatsappUrl;
//     }

//     // Get payment statistics
//     getPaymentStats() {
//         const payments = JSON.parse(localStorage.getItem('mokshayatra_payments')) || [];
        
//         const totalBookings = payments.length;
//         const totalRevenue = payments.reduce((sum, payment) => sum + payment.payment.paidAmount, 0);
//         const pendingPayments = payments.filter(p => p.payment.remainingAmount > 0).length;
//         const today = new Date().toDateString();
//         const todayBookings = payments.filter(p => 
//             new Date(p.createdAt).toDateString() === today
//         ).length;
        
//         return {
//             totalBookings,
//             totalRevenue,
//             pendingPayments,
//             todayBookings,
//             averagePayment: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0
//         };
//     }

//     // Clear all payment data (for testing)
//     clearAllData() {
//         localStorage.removeItem('mokshayatra_payments');
//         localStorage.removeItem('mokshayatra_bookings');
//         localStorage.removeItem('bookingData');
//         this.bookingData = null;
//         this.uploadedFile = null;
        
//         return {
//             success: true,
//             message: 'All payment data cleared'
//         };
//     }
// }

// // Export for use in other files
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = PaymentSystem;
// } else {
//     // Browser global
//     window.PaymentSystem = PaymentSystem;
// }

// // Initialize payment system when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Create global payment system instance
//     window.mokshaPayment = new PaymentSystem();
    
//     // Add payment-related CSS if not already added
//     addPaymentStyles();
    
//     console.log('MokshaYatra Payment System ready');
// });

// // Add payment-specific styles
// function addPaymentStyles() {
//     if (document.getElementById('payment-styles')) return;
    
//     const styles = document.createElement('style');
//     styles.id = 'payment-styles';
//     styles.textContent = `
//         /* Payment-specific styles */
//         .payment-status {
//             padding: 4px 12px;
//             border-radius: 20px;
//             font-size: 0.85rem;
//             font-weight: 600;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//         }
        
//         .payment-status-success {
//             background: #d4edda;
//             color: #155724;
//         }
        
//         .payment-status-pending {
//             background: #fff3cd;
//             color: #856404;
//         }
        
//         .payment-status-failed {
//             background: #f8d7da;
//             color: #721c24;
//         }
        
//         .payment-amount {
//             font-weight: 700;
//             color: #8b0000;
//         }
        
//         .payment-amount::before {
//             content: '₹';
//             font-size: 0.9em;
//             margin-right: 2px;
//         }
        
//         .upi-qr-container {
//             text-align: center;
//             padding: 20px;
//             background: #f8f9fa;
//             border-radius: 10px;
//             border: 2px solid #e9ecef;
//         }
        
//         .upi-qr-placeholder {
//             width: 200px;
//             height: 200px;
//             margin: 0 auto;
//             background: linear-gradient(45deg, #f8f9fa 25%, #fff 25%, #fff 50%, #f8f9fa 50%, #f8f9fa 75%, #fff 75%, #fff);
//             background-size: 20px 20px;
//             border: 2px dashed #6c757d;
//             border-radius: 10px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: #6c757d;
//         }
        
//         .payment-instructions {
//             background: #e8f4fd;
//             border-left: 4px solid #2196F3;
//             padding: 15px;
//             border-radius: 0 8px 8px 0;
//             margin: 20px 0;
//         }
        
//         .payment-instructions h4 {
//             color: #0d47a1;
//             margin-bottom: 10px;
//             font-size: 1.1rem;
//         }
        
//         .payment-instructions ul {
//             margin: 0;
//             padding-left: 20px;
//         }
        
//         .payment-instructions li {
//             margin-bottom: 8px;
//             color: #37474f;
//         }
        
//         .screenshot-preview {
//             max-width: 200px;
//             max-height: 200px;
//             border: 2px solid #4CAF50;
//             border-radius: 8px;
//             margin-top: 10px;
//         }
        
//         .file-info {
//             font-size: 0.9rem;
//             color: #666;
//             margin-top: 5px;
//         }
//     `;
    
//     document.head.appendChild(styles);
// }

// // Utility function for showing payment notifications
// function showPaymentNotification(message, type = 'info') {
//     // Check if toast function exists from booking-flow.js
//     if (typeof showToast === 'function') {
//         showToast(message, type);
//     } else {
//         // Fallback notification
//         const notification = document.createElement('div');
//         notification.className = `payment-notification payment-notification-${type}`;
//         notification.textContent = message;
//         notification.style.cssText = `
//             position: fixed;
//             top: 20px;
//             right: 20px;
//             padding: 12px 20px;
//             border-radius: 8px;
//             color: white;
//             z-index: 10000;
//             font-weight: 500;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//             animation: slideIn 0.3s ease;
//         `;
        
//         if (type === 'success') {
//             notification.style.background = '#4CAF50';
//         } else if (type === 'error') {
//             notification.style.background = '#f44336';
//         } else {
//             notification.style.background = '#2196F3';
//         }
        
//         document.body.appendChild(notification);
        
//         // Auto remove after 3 seconds
//         setTimeout(() => {
//             notification.style.animation = 'slideOut 0.3s ease';
//             setTimeout(() => {
//                 document.body.removeChild(notification);
//             }, 300);
//         }, 3000);
//     }
// }

// // Add animation for notifications
// if (!document.getElementById('payment-animations')) {
//     const animationStyles = document.createElement('style');
//     animationStyles.id = 'payment-animations';
//     animationStyles.textContent = `
//         @keyframes slideIn {
//             from {
//                 transform: translateX(100%);
//                 opacity: 0;
//             }
//             to {
//                 transform: translateX(0);
//                 opacity: 1;
//             }
//         }
        
//         @keyframes slideOut {
//             from {
//                 transform: translateX(0);
//                 opacity: 1;
//             }
//             to {
//                 transform: translateX(100%);
//                 opacity: 0;
//             }
//         }
//     `;
//     document.head.appendChild(animationStyles);
// }
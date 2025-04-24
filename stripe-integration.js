// Stripe Integration for Cleanuity
// This script handles Apple Pay and Google Pay integration via Stripe

// Initialize Stripe with publishable key
// In production, this key would be set server-side
const stripe = Stripe('pk_test_51NXGvhLkjM8qTwQXgennPyXmVtWWLnkpnuFk2PiRSzVKUKMLHZSMMBTqmBTYjKCyDcaQGPwFMoQgYyRVPVELFXYZ00vGHnJDVm');

// Configure payment request options
const paymentRequest = stripe.paymentRequest({
  country: 'US',
  currency: 'usd',
  total: {
    label: 'Cleanuity Cleaning Service',
    amount: 14900, // $149.00 in cents
  },
  requestPayerName: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestShipping: false,
});

// Create and mount the payment request button
document.addEventListener('DOMContentLoaded', function() {
  // Check if the browser supports Apple Pay or Google Pay
  paymentRequest.canMakePayment().then(function(result) {
    if (result) {
      // Create payment request button element
      const prButton = document.getElementById('payment-request-button');
      
      // If the element exists, mount the button
      if (prButton) {
        const elements = stripe.elements();
        const paymentRequestButton = elements.create('paymentRequestButton', {
          paymentRequest: paymentRequest,
          style: {
            paymentRequestButton: {
              type: 'default', // 'default' | 'donate' | 'buy'
              theme: 'dark',   // 'dark' | 'light' | 'light-outline'
              height: '48px'
            }
          }
        });
        
        paymentRequestButton.mount('#payment-request-button');
        
        // Show the payment methods section
        document.querySelector('.wallet-payment-methods').style.display = 'block';
        
        // Add Apple Pay / Google Pay badge based on availability
        if (result.applePay) {
          document.querySelector('.apple-pay-badge').style.display = 'inline-block';
        }
        if (result.googlePay) {
          document.querySelector('.google-pay-badge').style.display = 'inline-block';
        }
      }
    } else {
      // Hide the payment request button container if not supported
      const prButtonContainer = document.getElementById('payment-request-container');
      if (prButtonContainer) {
        prButtonContainer.style.display = 'none';
      }
    }
  });
});

// Handle payment request completion
paymentRequest.on('paymentmethod', function(ev) {
  // In a real implementation, you would:
  // 1. Send the payment method ID to your server
  // 2. Confirm the payment on the server
  // 3. Handle success/failure
  
  // For demo purposes, we'll simulate a successful payment
  setTimeout(() => {
    ev.complete('success');
    
    // Show confirmation modal
    const confirmationModal = document.getElementById('confirmation-modal');
    if (confirmationModal) {
      confirmationModal.style.display = 'block';
    }
    
    // Update booking status in UI
    updateBookingStatus('confirmed');
  }, 1000);
});

// Update booking summary when service is selected
function updateBookingSummary(service, price) {
  const selectedService = document.getElementById('selected-service');
  const basePrice = document.getElementById('base-price');
  const totalPrice = document.getElementById('total-price');
  
  if (selectedService) selectedService.textContent = service;
  if (basePrice) basePrice.textContent = `$${price}`;
  if (totalPrice) totalPrice.textContent = `$${price}`;
  
  // Update payment request amount
  updatePaymentAmount(price * 100); // Convert to cents
}

// Update payment request amount when price changes
function updatePaymentAmount(amount) {
  paymentRequest.update({
    total: {
      label: 'Cleanuity Cleaning Service',
      amount: amount,
    }
  });
}

// Add event listeners to service selection
document.addEventListener('DOMContentLoaded', function() {
  const serviceTiles = document.querySelectorAll('.service-tile');
  
  serviceTiles.forEach(tile => {
    tile.addEventListener('click', function() {
      // Remove active class from all tiles
      serviceTiles.forEach(t => t.classList.remove('active'));
      
      // Add active class to selected tile
      this.classList.add('active');
      
      // Get service details
      const service = this.getAttribute('data-service');
      const price = parseInt(this.getAttribute('data-price'));
      
      // Update booking summary
      updateBookingSummary(
        service === 'standard' ? 'Standard Clean' : 
        service === 'deep' ? 'Deep Clean' : 'Move In/Out Clean',
        price
      );
    });
  });
  
  // Handle add-ons
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  
  addonCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateAddons();
    });
  });
});

// Update add-ons in booking summary
function updateAddons() {
  const addonsContainer = document.getElementById('summary-addons');
  const addonsPriceContainer = document.getElementById('addons-price-container');
  const addonsPrice = document.getElementById('addons-price');
  const basePrice = document.getElementById('base-price');
  const totalPrice = document.getElementById('total-price');
  
  if (!addonsContainer || !addonsPrice || !basePrice || !totalPrice) return;
  
  // Clear existing add-ons
  addonsContainer.innerHTML = '';
  
  let totalAddonPrice = 0;
  let hasAddons = false;
  
  // Get all checked add-ons
  const checkedAddons = document.querySelectorAll('.addon-checkbox:checked');
  
  checkedAddons.forEach(addon => {
    const name = addon.closest('.addon-item').querySelector('h3').textContent;
    const price = parseInt(addon.getAttribute('data-price'));
    
    // Add to total
    totalAddonPrice += price;
    hasAddons = true;
    
    // Add to summary
    const addonElement = document.createElement('div');
    addonElement.className = 'summary-addon';
    addonElement.innerHTML = `
      <span class="summary-label">+ ${name}:</span>
      <span class="summary-value">$${price}</span>
    `;
    
    addonsContainer.appendChild(addonElement);
  });
  
  // Update prices
  addonsPrice.textContent = `$${totalAddonPrice}`;
  
  // Show/hide add-ons price container
  addonsPriceContainer.style.display = hasAddons ? 'flex' : 'none';
  
  // Update total price
  const basePriceValue = parseInt(basePrice.textContent.replace('$', ''));
  totalPrice.textContent = `$${basePriceValue + totalAddonPrice}`;
  
  // Update payment request amount
  updatePaymentAmount((basePriceValue + totalAddonPrice) * 100); // Convert to cents
}

// Handle booking confirmation
function confirmBooking() {
  // In a real implementation, you would:
  // 1. Validate all inputs
  // 2. Create a payment intent on your server
  // 3. Confirm the payment with Stripe
  // 4. Handle success/failure
  
  // For demo purposes, we'll show the confirmation modal
  const confirmationModal = document.getElementById('confirmation-modal');
  if (confirmationModal) {
    confirmationModal.style.display = 'block';
  }
  
  // Update booking status in UI
  updateBookingStatus('confirmed');
}

// Update booking status in UI
function updateBookingStatus(status) {
  // This would update UI elements based on booking status
  console.log(`Booking status updated to: ${status}`);
}

// Domain verification for Apple Pay
// This would typically be handled server-side
function verifyDomain() {
  // In a real implementation, you would:
  // 1. Generate a verification file on your server
  // 2. Place it at /.well-known/apple-developer-merchantid-domain-association
  // 3. Verify the domain in the Stripe Dashboard
  
  console.log('Domain verification would be handled server-side');
}

// Export functions for use in other scripts
window.stripeIntegration = {
  confirmBooking,
  updateBookingSummary,
  updateAddons,
  verifyDomain
};

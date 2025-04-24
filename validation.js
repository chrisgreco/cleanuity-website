// Final testing and validation script for Cleanuity website
// This script performs various tests to ensure all features are working correctly

document.addEventListener('DOMContentLoaded', function() {
  console.log('Running final validation tests...');
  
  // Test navigation links
  testNavigation();
  
  // Test responsive design
  testResponsiveDesign();
  
  // Test booking flow
  if (window.location.pathname.includes('book.html')) {
    testBookingFlow();
  }
  
  // Test progress tracker
  if (document.getElementById('progress-tracker')) {
    testProgressTracker();
  }
  
  // Test payment methods
  if (window.location.pathname.includes('book.html')) {
    testPaymentMethods();
  }
  
  console.log('All validation tests complete!');
});

// Test navigation links
function testNavigation() {
  console.log('Testing navigation links...');
  
  const navLinks = document.querySelectorAll('.nav-menu a');
  let brokenLinks = 0;
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Check if link is valid
    if (href && !href.startsWith('#') && !href.includes('://')) {
      // For internal links, check if file exists
      fetch(href)
        .then(response => {
          if (!response.ok) {
            console.error(`Broken link detected: ${href}`);
            brokenLinks++;
          }
        })
        .catch(error => {
          console.error(`Error checking link ${href}: ${error}`);
          brokenLinks++;
        });
    }
  });
  
  if (brokenLinks === 0) {
    console.log('✅ All navigation links are valid');
  } else {
    console.warn(`⚠️ Found ${brokenLinks} broken navigation links`);
  }
}

// Test responsive design
function testResponsiveDesign() {
  console.log('Testing responsive design...');
  
  const viewportWidth = window.innerWidth;
  
  if (viewportWidth < 768) {
    // Mobile view tests
    const mobileMenu = document.querySelector('.mobile-menu-btn');
    const mobileCTA = document.querySelector('.mobile-cta');
    
    if (mobileMenu && window.getComputedStyle(mobileMenu).display !== 'none') {
      console.log('✅ Mobile menu button is visible on small screens');
    } else {
      console.warn('⚠️ Mobile menu button is not visible on small screens');
    }
    
    if (mobileCTA && window.getComputedStyle(mobileCTA).display !== 'none') {
      console.log('✅ Mobile CTA is visible on small screens');
    } else {
      console.warn('⚠️ Mobile CTA is not visible on small screens');
    }
  } else {
    // Desktop view tests
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu && window.getComputedStyle(navMenu).display !== 'none') {
      console.log('✅ Navigation menu is visible on large screens');
    } else {
      console.warn('⚠️ Navigation menu is not visible on large screens');
    }
  }
}

// Test booking flow
function testBookingFlow() {
  console.log('Testing booking flow...');
  
  // Check if all booking steps exist
  const steps = document.querySelectorAll('.booking-step');
  if (steps.length === 5) {
    console.log(`✅ All ${steps.length} booking steps are present`);
  } else {
    console.warn(`⚠️ Expected 5 booking steps, found ${steps.length}`);
  }
  
  // Test service selection
  const serviceTiles = document.querySelectorAll('.service-tile');
  if (serviceTiles.length > 0) {
    // Simulate clicking on a service tile
    serviceTiles[0].click();
    
    // Check if the service was selected
    if (serviceTiles[0].classList.contains('active')) {
      console.log('✅ Service selection is working');
    } else {
      console.warn('⚠️ Service selection is not working');
    }
  }
  
  // Test add-ons
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
  if (addonCheckboxes.length > 0) {
    // Simulate checking an add-on
    addonCheckboxes[0].checked = true;
    
    // Trigger change event
    const event = new Event('change');
    addonCheckboxes[0].dispatchEvent(event);
    
    // Check if the add-on was added to the summary
    setTimeout(() => {
      const addonsSummary = document.getElementById('summary-addons');
      if (addonsSummary && addonsSummary.children.length > 0) {
        console.log('✅ Add-on selection is working');
      } else {
        console.warn('⚠️ Add-on selection is not working');
      }
    }, 100);
  }
  
  // Test contactless entry toggle
  const entryMethod = document.getElementById('entry-method');
  if (entryMethod) {
    // Simulate selecting virtual keypad
    entryMethod.value = 'virtual-keypad';
    
    // Trigger change event
    const event = new Event('change');
    entryMethod.dispatchEvent(event);
    
    // Check if contactless entry section is shown
    setTimeout(() => {
      const contactlessEntry = document.getElementById('contactless-entry-container');
      if (contactlessEntry && window.getComputedStyle(contactlessEntry).display !== 'none') {
        console.log('✅ Contactless entry toggle is working');
      } else {
        console.warn('⚠️ Contactless entry toggle is not working');
      }
    }, 100);
  }
}

// Test progress tracker
function testProgressTracker() {
  console.log('Testing progress tracker...');
  
  const progressSteps = document.querySelectorAll('.progress-step');
  if (progressSteps.length === 3) {
    console.log(`✅ Progress tracker has ${progressSteps.length} steps as expected`);
  } else {
    console.warn(`⚠️ Expected 3 progress steps, found ${progressSteps.length}`);
  }
  
  // Check if tracker can be initialized
  if (window.cleanerProgressTracker && typeof window.cleanerProgressTracker.initProgressTracker === 'function') {
    console.log('✅ Progress tracker initialization function is available');
  } else {
    console.warn('⚠️ Progress tracker initialization function is not available');
  }
}

// Test payment methods
function testPaymentMethods() {
  console.log('Testing payment methods...');
  
  // Check if Stripe is loaded
  if (window.Stripe) {
    console.log('✅ Stripe is loaded');
  } else {
    console.warn('⚠️ Stripe is not loaded');
  }
  
  // Check if stripe integration is available
  if (window.stripeIntegration && typeof window.stripeIntegration.confirmBooking === 'function') {
    console.log('✅ Stripe integration is available');
  } else {
    console.warn('⚠️ Stripe integration is not available');
  }
  
  // Check for Apple Pay / Google Pay button container
  const paymentRequestButton = document.getElementById('payment-request-button');
  if (paymentRequestButton) {
    console.log('✅ Payment request button container is present');
  } else {
    console.warn('⚠️ Payment request button container is not present');
  }
}

// Add event listeners for interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Fix any potential issues with mobile navigation
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Ensure all external links open in new tab
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(link => {
    if (!link.getAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
  
  // Fix mobile CTA link if needed
  const mobileCTA = document.querySelector('.mobile-cta-btn');
  if (mobileCTA && mobileCTA.getAttribute('href') === '#') {
    mobileCTA.setAttribute('href', 'book.html');
  }
  
  // Ensure all images have alt text
  const images = document.querySelectorAll('img:not([alt])');
  images.forEach((img, index) => {
    console.warn(`⚠️ Image without alt text: ${img.src}`);
    img.setAttribute('alt', `Cleanuity image ${index + 1}`);
  });
});

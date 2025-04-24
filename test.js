// Test script for Cleanuity website functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('Running test script for Cleanuity website...');
    
    // Test navigation menu
    testNavigationMenu();
    
    // Test booking modal
    testBookingModal();
    
    // Test cleaner profiles
    testCleanerProfiles();
    
    // Test auto-rebook functionality
    testAutoRebook();
    
    // Test tracking functionality
    testTracking();
    
    // Test photo verification
    testPhotoVerification();
    
    // Test smart home integration
    testSmartHomeIntegration();
    
    console.log('All tests completed!');
});

// Test navigation menu functionality
function testNavigationMenu() {
    console.log('Testing navigation menu...');
    
    // Test mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        console.log('Mobile menu button found');
        
        // Simulate click
        mobileMenuBtn.click();
        
        // Check if menu is active
        if (navMenu.classList.contains('active')) {
            console.log('✓ Mobile menu toggle works');
        } else {
            console.error('✗ Mobile menu toggle failed');
        }
        
        // Reset
        mobileMenuBtn.click();
    } else {
        console.error('✗ Mobile menu elements not found');
    }
    
    // Test navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (navLinks.length > 0) {
        console.log(`✓ Found ${navLinks.length} navigation links`);
    } else {
        console.error('✗ Navigation links not found');
    }
}

// Test booking modal functionality
function testBookingModal() {
    console.log('Testing booking modal...');
    
    // Test opening booking modal
    const bookBtns = document.querySelectorAll('.book-btn');
    const bookingModal = document.getElementById('booking-modal');
    
    if (bookBtns.length > 0 && bookingModal) {
        console.log(`✓ Found ${bookBtns.length} booking buttons and booking modal`);
        
        // Simulate click on first button
        bookBtns[0].click();
        
        // Check if modal is displayed
        if (bookingModal.style.display === 'block') {
            console.log('✓ Booking modal opens correctly');
            
            // Test form elements
            testBookingForm();
            
            // Close modal
            const closeBtn = bookingModal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.click();
                
                // Check if modal is closed
                if (bookingModal.style.display !== 'block') {
                    console.log('✓ Booking modal closes correctly');
                } else {
                    console.error('✗ Booking modal close failed');
                }
            } else {
                console.error('✗ Close button not found in booking modal');
            }
        } else {
            console.error('✗ Booking modal failed to open');
        }
    } else {
        console.error('✗ Booking buttons or modal not found');
    }
}

// Test booking form elements
function testBookingForm() {
    console.log('Testing booking form elements...');
    
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        // Test cleaning type select
        const cleaningType = document.getElementById('cleaning-type');
        if (cleaningType && cleaningType.options.length > 0) {
            console.log(`✓ Cleaning type select has ${cleaningType.options.length} options`);
        } else {
            console.error('✗ Cleaning type select missing or has no options');
        }
        
        // Test date picker
        const datePicker = document.getElementById('cleaning-date');
        if (datePicker) {
            console.log('✓ Date picker found');
        } else {
            console.error('✗ Date picker not found');
        }
        
        // Test time select
        const timePicker = document.getElementById('cleaning-time');
        if (timePicker && timePicker.options.length > 0) {
            console.log(`✓ Time select has ${timePicker.options.length} options`);
        } else {
            console.error('✗ Time select missing or has no options');
        }
        
        // Test cleaner select
        const cleanerSelect = document.getElementById('cleaner-select');
        if (cleanerSelect && cleanerSelect.options.length > 0) {
            console.log(`✓ Cleaner select has ${cleanerSelect.options.length} options`);
            
            // Test cleaner selection
            if (cleanerSelect.options.length > 1) {
                cleanerSelect.value = cleanerSelect.options[1].value;
                
                // Trigger change event
                const event = new Event('change');
                cleanerSelect.dispatchEvent(event);
                
                // Check if cleaner details are displayed
                const cleanerDetails = document.getElementById('cleaner-details');
                if (cleanerDetails && cleanerDetails.innerHTML.trim() !== '') {
                    console.log('✓ Cleaner details display works');
                } else {
                    console.error('✗ Cleaner details display failed');
                }
            }
        } else {
            console.error('✗ Cleaner select missing or has no options');
        }
        
        // Test add-on checkboxes
        const addOnCheckboxes = document.querySelectorAll('.add-on-checkbox');
        if (addOnCheckboxes.length > 0) {
            console.log(`✓ Found ${addOnCheckboxes.length} add-on checkboxes`);
            
            // Test price calculation
            const totalPrice = document.getElementById('total-price');
            if (totalPrice) {
                const initialPrice = totalPrice.textContent;
                
                // Check first add-on
                addOnCheckboxes[0].checked = true;
                
                // Trigger change event
                const event = new Event('change');
                addOnCheckboxes[0].dispatchEvent(event);
                
                // Check if price updated
                if (totalPrice.textContent !== initialPrice) {
                    console.log('✓ Price calculation works');
                } else {
                    console.error('✗ Price calculation failed');
                }
                
                // Reset
                addOnCheckboxes[0].checked = false;
                addOnCheckboxes[0].dispatchEvent(event);
            } else {
                console.error('✗ Total price element not found');
            }
        } else {
            console.error('✗ Add-on checkboxes not found');
        }
    } else {
        console.error('✗ Booking form not found');
    }
}

// Test cleaner profiles functionality
function testCleanerProfiles() {
    console.log('Testing cleaner profiles...');
    
    // Test cleaner cards
    const cleanerCards = document.querySelectorAll('.cleaner-card');
    const cleanerProfileModal = document.getElementById('cleaner-profile-modal');
    
    if (cleanerCards.length > 0 && cleanerProfileModal) {
        console.log(`✓ Found ${cleanerCards.length} cleaner cards and profile modal`);
        
        // Simulate click on first card
        cleanerCards[0].click();
        
        // Check if modal is displayed
        if (cleanerProfileModal.style.display === 'block') {
            console.log('✓ Cleaner profile modal opens correctly');
            
            // Check profile content
            const profileName = cleanerProfileModal.querySelector('.cleaner-profile-info h3');
            const profileRating = cleanerProfileModal.querySelector('.cleaner-profile-info .rating');
            const profileBio = cleanerProfileModal.querySelector('.bio');
            
            if (profileName && profileRating && profileBio) {
                console.log('✓ Cleaner profile content loaded correctly');
            } else {
                console.error('✗ Cleaner profile content missing');
            }
            
            // Close modal
            const closeBtn = cleanerProfileModal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.click();
                
                // Check if modal is closed
                if (cleanerProfileModal.style.display !== 'block') {
                    console.log('✓ Cleaner profile modal closes correctly');
                } else {
                    console.error('✗ Cleaner profile modal close failed');
                }
            } else {
                console.error('✗ Close button not found in cleaner profile modal');
            }
        } else {
            console.error('✗ Cleaner profile modal failed to open');
        }
    } else {
        console.error('✗ Cleaner cards or profile modal not found');
    }
}

// Test auto-rebook functionality
function testAutoRebook() {
    console.log('Testing auto-rebook functionality...');
    
    // Test auto-rebook checkbox
    const autoRebookCheckbox = document.getElementById('auto-rebook');
    const rebookOptions = document.getElementById('rebook-options');
    
    if (autoRebookCheckbox && rebookOptions) {
        console.log('✓ Auto-rebook elements found');
        
        // Simulate checkbox change
        autoRebookCheckbox.checked = true;
        
        // Trigger change event
        const event = new Event('change');
        autoRebookCheckbox.dispatchEvent(event);
        
        // Check if options are displayed
        if (rebookOptions.style.display === 'block') {
            console.log('✓ Auto-rebook options display works');
        } else {
            console.error('✗ Auto-rebook options display failed');
        }
        
        // Test frequency select
        const rebookFrequencySelect = document.getElementById('rebook-frequency');
        if (rebookFrequencySelect && rebookFrequencySelect.options.length > 0) {
            console.log(`✓ Rebook frequency select has ${rebookFrequencySelect.options.length} options`);
        } else {
            console.error('✗ Rebook frequency select missing or has no options');
        }
        
        // Reset
        autoRebookCheckbox.checked = false;
        autoRebookCheckbox.dispatchEvent(event);
    } else {
        console.error('✗ Auto-rebook elements not found');
    }
}

// Test tracking functionality
function testTracking() {
    console.log('Testing tracking functionality...');
    
    // Test tracking modal
    const trackingModal = document.getElementById('tracking-modal');
    
    if (trackingModal) {
        console.log('✓ Tracking modal found');
        
        // Check tracking map
        const trackingMap = document.getElementById('tracking-map');
        if (trackingMap) {
            console.log('✓ Tracking map found');
        } else {
            console.error('✗ Tracking map not found');
        }
        
        // Check ETA display
        const etaTime = document.getElementById('eta-time');
        if (etaTime) {
            console.log('✓ ETA display found');
        } else {
            console.error('✗ ETA display not found');
        }
        
        // Check status items
        const statusItems = trackingModal.querySelectorAll('.status-item');
        if (statusItems.length > 0) {
            console.log(`✓ Found ${statusItems.length} status items`);
        } else {
            console.error('✗ Status items not found');
        }
    } else {
        console.error('✗ Tracking modal not found');
    }
}

// Test photo verification functionality
function testPhotoVerification() {
    console.log('Testing photo verification functionality...');
    
    // Test photo verification modal
    const photoVerificationModal = document.getElementById('photo-verification-modal');
    
    if (photoVerificationModal) {
        console.log('✓ Photo verification modal found');
        
        // Check verification photos
        const verificationPhotos = photoVerificationModal.querySelectorAll('.verification-photo');
        if (verificationPhotos.length > 0) {
            console.log(`✓ Found ${verificationPhotos.length} verification photos`);
        } else {
            console.error('✗ Verification photos not found');
        }
        
        // Check approval buttons
        const approveBtn = photoVerificationModal.querySelector('.btn-primary');
        const touchupBtn = photoVerificationModal.querySelector('.btn-secondary');
        
        if (approveBtn && touchupBtn) {
            console.log('✓ Approval and touch-up buttons found');
        } else {
            console.error('✗ Approval or touch-up buttons not found');
        }
    } else {
        console.error('✗ Photo verification modal not found');
    }
}

// Test smart home integration functionality
function testSmartHomeIntegration() {
    console.log('Testing smart home integration functionality...');
    
    // Test smart home modal
    const smartHomeModal = document.getElementById('smart-home-modal');
    
    if (smartHomeModal) {
        console.log('✓ Smart home modal found');
        
        // Check device toggles
        const smartHomeToggles = smartHomeModal.querySelectorAll('.smart-home-toggle');
        if (smartHomeToggles.length > 0) {
            console.log(`✓ Found ${smartHomeToggles.length} smart home toggles`);
        } else {
            console.error('✗ Smart home toggles not found');
        }
        
        // Check access schedule
        const accessSchedule = smartHomeModal.querySelector('h5');
        if (accessSchedule && accessSchedule.textContent.includes('Next Cleaning')) {
            console.log('✓ Access schedule found');
        } else {
            console.error('✗ Access schedule not found');
        }
        
        // Check add device form
        const deviceTypeSelect = smartHomeModal.querySelector('select');
        if (deviceTypeSelect) {
            console.log('✓ Device type select found');
        } else {
            console.error('✗ Device type select not found');
        }
    } else {
        console.error('✗ Smart home modal not found');
    }
}

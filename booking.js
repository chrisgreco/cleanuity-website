// Booking Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Variables to store booking data
    let bookingData = {
        service: null,
        servicePrice: 0,
        addons: [],
        addonsPrice: 0,
        date: null,
        time: null,
        cleaner: 'Any available cleaner',
        entryMethod: '',
        entryInstructions: '',
        cleaningNotes: '',
        totalPrice: 0
    };

    // Step Navigation
    const steps = document.querySelectorAll('.booking-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-step-btn');
    const prevButtons = document.querySelectorAll('.prev-step-btn');
    const confirmButtons = document.querySelectorAll('.confirm-booking-btn, .confirm-booking-btn-sidebar');
    
    let currentStep = 0;

    // Initialize calendar
    initCalendar();

    // Service Selection
    const serviceTiles = document.querySelectorAll('.service-tile');
    serviceTiles.forEach(tile => {
        tile.addEventListener('click', function() {
            // Remove selected class from all tiles
            serviceTiles.forEach(t => t.classList.remove('selected'));
            
            // Add selected class to clicked tile
            this.classList.add('selected');
            
            // Update booking data
            bookingData.service = this.getAttribute('data-service');
            bookingData.servicePrice = parseInt(this.getAttribute('data-price'));
            
            // Update summary
            updateServiceSummary();
            
            // Update price
            updatePriceCalculator();
        });
    });

    // Add-ons Selection
    const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const addonName = this.getAttribute('data-addon');
            const addonPrice = parseInt(this.getAttribute('data-price'));
            
            if (this.checked) {
                // Add addon to booking data
                bookingData.addons.push({
                    name: addonName,
                    price: addonPrice
                });
            } else {
                // Remove addon from booking data
                bookingData.addons = bookingData.addons.filter(addon => addon.name !== addonName);
            }
            
            // Update addons price
            bookingData.addonsPrice = bookingData.addons.reduce((total, addon) => total + addon.price, 0);
            
            // Update summary
            updateAddonsSummary();
            
            // Update price
            updatePriceCalculator();
        });
    });

    // Date Selection
    function initCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        const currentMonthElement = document.querySelector('.current-month');
        const prevMonthButton = document.querySelector('.prev-month');
        const nextMonthButton = document.querySelector('.next-month');
        
        const today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();
        
        // Generate calendar
        generateCalendar(currentMonth, currentYear);
        
        // Update month display
        updateMonthDisplay(currentMonth, currentYear);
        
        // Previous month button
        prevMonthButton.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
            updateMonthDisplay(currentMonth, currentYear);
        });
        
        // Next month button
        nextMonthButton.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
            updateMonthDisplay(currentMonth, currentYear);
        });
        
        function generateCalendar(month, year) {
            // Clear previous calendar days
            const dayElements = calendarGrid.querySelectorAll('.calendar-day');
            dayElements.forEach(day => day.remove());
            
            // Get first day of month
            const firstDay = new Date(year, month, 1).getDay();
            
            // Get number of days in month
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Add empty cells for days before first day of month
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('calendar-day', 'empty');
                calendarGrid.appendChild(emptyDay);
            }
            
            // Add days of month
            for (let i = 1; i <= daysInMonth; i++) {
                const day = document.createElement('div');
                day.classList.add('calendar-day');
                day.textContent = i;
                
                // Disable past days
                const currentDate = new Date(year, month, i);
                if (currentDate < today) {
                    day.classList.add('disabled');
                } else {
                    day.addEventListener('click', function() {
                        // Remove selected class from all days
                        const selectedDays = document.querySelectorAll('.calendar-day.selected');
                        selectedDays.forEach(d => d.classList.remove('selected'));
                        
                        // Add selected class to clicked day
                        this.classList.add('selected');
                        
                        // Update booking data
                        bookingData.date = new Date(year, month, i);
                        
                        // Update summary
                        updateDateTimeSummary();
                    });
                }
                
                calendarGrid.appendChild(day);
            }
        }
        
        function updateMonthDisplay(month, year) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            currentMonthElement.textContent = `${months[month]} ${year}`;
        }
    }

    // Time Selection
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected class from all time slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Add selected class to clicked time slot
            this.classList.add('selected');
            
            // Update booking data
            bookingData.time = this.getAttribute('data-time');
            
            // Update summary
            updateDateTimeSummary();
        });
    });

    // Cleaner Selection
    const rebookToggle = document.getElementById('rebook-toggle');
    const pastCleaners = document.getElementById('past-cleaners');
    const cleanerCards = document.querySelectorAll('.cleaner-card');
    const cleanerPreferenceOptions = document.querySelectorAll('input[name="cleaner-preference"]');
    
    rebookToggle.addEventListener('change', function() {
        if (this.checked) {
            pastCleaners.style.display = 'grid';
        } else {
            pastCleaners.style.display = 'none';
            cleanerCards.forEach(card => card.classList.remove('selected'));
            
            // Reset cleaner preference
            document.querySelector('input[name="cleaner-preference"][value="any"]').checked = true;
            
            // Update booking data
            bookingData.cleaner = 'Any available cleaner';
            
            // Update summary
            updateCleanerSummary();
        }
    });
    
    cleanerCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cleaner cards
            cleanerCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked cleaner card
            this.classList.add('selected');
            
            // Update booking data
            const cleanerName = this.querySelector('h4').textContent;
            bookingData.cleaner = cleanerName;
            
            // Update summary
            updateCleanerSummary();
        });
    });
    
    cleanerPreferenceOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.checked && !rebookToggle.checked) {
                // Update booking data based on selected preference
                switch (this.value) {
                    case 'any':
                        bookingData.cleaner = 'Any available cleaner';
                        break;
                    case 'highest-rated':
                        bookingData.cleaner = 'Highest rated cleaner';
                        break;
                    case 'eco-friendly':
                        bookingData.cleaner = 'Eco-friendly specialist';
                        break;
                }
                
                // Update summary
                updateCleanerSummary();
            }
        });
    });

    // Entry Method
    const entryMethodSelect = document.getElementById('entry-method');
    const smartHomeContainer = document.getElementById('smart-home-container');
    
    entryMethodSelect.addEventListener('change', function() {
        if (this.value === 'smart-lock') {
            smartHomeContainer.style.display = 'block';
        } else {
            smartHomeContainer.style.display = 'none';
        }
    });

    // Entry Instructions
    const entryInstructionsTextarea = document.getElementById('entry-instructions');
    const cleaningNotesTextarea = document.getElementById('cleaning-notes');
    
    entryInstructionsTextarea.addEventListener('input', function() {
        bookingData.entryInstructions = this.value;
    });
    
    cleaningNotesTextarea.addEventListener('input', function() {
        bookingData.cleaningNotes = this.value;
    });

    // Step Navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Validate current step
            if (validateStep(currentStep)) {
                // Hide current step
                steps[currentStep].classList.remove('active');
                progressSteps[currentStep].classList.remove('active');
                
                // Show next step
                currentStep++;
                steps[currentStep].classList.add('active');
                progressSteps[currentStep].classList.add('active');
                
                // Scroll to top of step
                window.scrollTo({
                    top: document.querySelector('.booking-header').offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide current step
            steps[currentStep].classList.remove('active');
            progressSteps[currentStep].classList.remove('active');
            
            // Show previous step
            currentStep--;
            steps[currentStep].classList.add('active');
            progressSteps[currentStep].classList.add('active');
            
            // Scroll to top of step
            window.scrollTo({
                top: document.querySelector('.booking-header').offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Confirm Booking
    confirmButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Validate final step
            if (validateStep(currentStep)) {
                // Show confirmation modal
                showConfirmationModal();
            }
        });
    });

    // Confirmation Modal
    const modal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Helper Functions
    function validateStep(step) {
        switch (step) {
            case 0: // Service
                if (!bookingData.service) {
                    alert('Please select a service type.');
                    return false;
                }
                return true;
            
            case 1: // Add-ons
                return true; // Add-ons are optional
            
            case 2: // Date & Time
                if (!bookingData.date) {
                    alert('Please select a date.');
                    return false;
                }
                if (!bookingData.time) {
                    alert('Please select a time.');
                    return false;
                }
                return true;
            
            case 3: // Cleaner
                return true; // Cleaner preference is pre-selected
            
            case 4: // Entry Instructions
                if (!entryMethodSelect.value) {
                    alert('Please select an entry method.');
                    return false;
                }
                if (!entryInstructionsTextarea.value) {
                    alert('Please provide entry instructions.');
                    return false;
                }
                return true;
            
            default:
                return true;
        }
    }

    function updateServiceSummary() {
        const selectedServiceElement = document.getElementById('selected-service');
        const basePriceElement = document.getElementById('base-price');
        
        if (bookingData.service) {
            let serviceName = '';
            switch (bookingData.service) {
                case 'standard':
                    serviceName = 'Standard Clean';
                    break;
                case 'deep':
                    serviceName = 'Deep Clean';
                    break;
                case 'move':
                    serviceName = 'Move In/Out Clean';
                    break;
            }
            
            selectedServiceElement.textContent = serviceName;
            basePriceElement.textContent = `$${bookingData.servicePrice}`;
        }
    }

    function updateAddonsSummary() {
        const summaryAddonsElement = document.getElementById('summary-addons');
        const addonsPriceElement = document.getElementById('addons-price');
        const addonsPriceContainer = document.getElementById('addons-price-container');
        
        // Clear previous addons
        summaryAddonsElement.innerHTML = '';
        
        if (bookingData.addons.length > 0) {
            // Add header
            const header = document.createElement('div');
            header.classList.add('summary-item');
            header.innerHTML = '<span class="summary-label">Add-ons:</span>';
            summaryAddonsElement.appendChild(header);
            
            // Add each addon
            bookingData.addons.forEach(addon => {
                const addonElement = document.createElement('div');
                addonElement.classList.add('summary-addon');
                
                let addonName = '';
                switch (addon.name) {
                    case 'fridge':
                        addonName = 'Inside Fridge Cleaning';
                        break;
                    case 'oven':
                        addonName = 'Oven Cleaning';
                        break;
                    case 'laundry':
                        addonName = 'Laundry Service';
                        break;
                    case 'windows':
                        addonName = 'Window Cleaning';
                        break;
                    case 'baseboards':
                        addonName = 'Baseboards';
                        break;
                }
                
                addonElement.innerHTML = `
                    <span class="addon-name">- ${addonName}</span>
                    <span class="addon-price">$${addon.price}</span>
                `;
                
                summaryAddonsElement.appendChild(addonElement);
            });
            
            // Update addons price
            addonsPriceElement.textContent = `$${bookingData.addonsPrice}`;
            addonsPriceContainer.style.display = 'flex';
        } else {
            addonsPriceContainer.style.display = 'none';
        }
    }

    function updateDateTimeSummary() {
        const selectedDatetimeElement = document.getElementById('selected-datetime');
        
        if (bookingData.date && bookingData.time) {
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            const dateString = bookingData.date.toLocaleDateString('en-US', options);
            
            let timeString = '';
            const hour = parseInt(bookingData.time);
            if (hour < 12) {
                timeString = `${hour}:00 AM`;
            } else if (hour === 12) {
                timeString = '12:00 PM';
            } else {
                timeString = `${hour - 12}:00 PM`;
            }
            
            selectedDatetimeElement.textContent = `${dateString} at ${timeString}`;
        }
    }

    function updateCleanerSummary() {
        const selectedCleanerElement = document.getElementById('selected-cleaner');
        selectedCleanerElement.textContent = bookingData.cleaner;
    }

    function updatePriceCalculator() {
        const totalPriceElement = document.getElementById('total-price');
        
        // Calculate total price
        bookingData.totalPrice = bookingData.servicePrice + bookingData.addonsPrice;
        
        // Update total price
        totalPriceElement.textContent = `$${bookingData.totalPrice}`;
        
        // Update mobile CTA price
        document.querySelector('.mobile-cta-btn').textContent = `Book a Clean – $${bookingData.totalPrice}`;
    }

    function showConfirmationModal() {
        // Update confirmation details
        document.getElementById('conf-service').textContent = document.getElementById('selected-service').textContent;
        document.getElementById('conf-datetime').textContent = document.getElementById('selected-datetime').textContent;
        document.getElementById('conf-cleaner').textContent = document.getElementById('selected-cleaner').textContent;
        document.getElementById('conf-total').textContent = document.getElementById('total-price').textContent;
        
        // Show modal
        modal.style.display = 'block';
    }
});

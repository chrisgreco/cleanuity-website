// Cleanuity Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
    
    // Booking Modal
    const bookBtns = document.querySelectorAll('.book-btn');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    if (bookBtns.length > 0 && bookingModal) {
        bookBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                bookingModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    // Cleaner Profile Modal
    const cleanerCards = document.querySelectorAll('.cleaner-card');
    const cleanerProfileModal = document.getElementById('cleaner-profile-modal');
    
    if (cleanerCards.length > 0 && cleanerProfileModal) {
        cleanerCards.forEach(card => {
            card.addEventListener('click', () => {
                cleanerProfileModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // You would typically fetch cleaner data here and populate the modal
                const cleanerId = card.dataset.id;
                loadCleanerProfile(cleanerId);
            });
        });
    }
    
    // Close Modals
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Add-on Selection
    const addOnCheckboxes = document.querySelectorAll('.add-on-checkbox');
    const totalPriceElement = document.getElementById('total-price');
    let basePrice = 0;
    
    if (totalPriceElement) {
        basePrice = parseFloat(totalPriceElement.dataset.basePrice || 0);
        
        if (addOnCheckboxes.length > 0) {
            addOnCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateTotalPrice);
            });
        }
    }
    
    function updateTotalPrice() {
        let total = basePrice;
        
        addOnCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseFloat(checkbox.dataset.price || 0);
            }
        });
        
        if (totalPriceElement) {
            totalPriceElement.textContent = '$' + total.toFixed(2);
        }
    }
    
    // Date and Time Picker Initialization
    const datePicker = document.getElementById('cleaning-date');
    const timePicker = document.getElementById('cleaning-time');
    
    if (datePicker) {
        // Set minimum date to today
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        datePicker.min = `${yyyy}-${mm}-${dd}`;
    }
    
    // Cleaner Selection
    const cleanerSelect = document.getElementById('cleaner-select');
    const cleanerDetails = document.getElementById('cleaner-details');
    
    if (cleanerSelect && cleanerDetails) {
        cleanerSelect.addEventListener('change', function() {
            const selectedCleaner = this.value;
            if (selectedCleaner) {
                // Fetch cleaner details and display
                fetchCleanerDetails(selectedCleaner);
            } else {
                cleanerDetails.innerHTML = '';
            }
        });
    }
    
    function fetchCleanerDetails(cleanerId) {
        // This would typically be an API call
        // For demo purposes, we'll use mock data
        const cleaners = {
            '1': {
                name: 'Maria Rodriguez',
                rating: 4.9,
                reviews: 127,
                image: 'images/cleaner1.jpg',
                specialty: 'Deep Cleaning Expert'
            },
            '2': {
                name: 'John Smith',
                rating: 4.8,
                reviews: 93,
                image: 'images/cleaner2.jpg',
                specialty: 'Eco-Friendly Cleaning'
            },
            '3': {
                name: 'Sarah Johnson',
                rating: 4.7,
                reviews: 85,
                image: 'images/cleaner3.jpg',
                specialty: 'Apartment Specialist'
            }
        };
        
        const cleaner = cleaners[cleanerId];
        
        if (cleaner && cleanerDetails) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(cleaner.rating)) {
                    stars += '<i class="fas fa-star"></i>';
                } else if (i === Math.ceil(cleaner.rating) && !Number.isInteger(cleaner.rating)) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            
            cleanerDetails.innerHTML = `
                <div class="selected-cleaner">
                    <img src="${cleaner.image}" alt="${cleaner.name}" class="selected-cleaner-img">
                    <div class="selected-cleaner-info">
                        <h4>${cleaner.name}</h4>
                        <div class="rating">${stars} (${cleaner.reviews} reviews)</div>
                        <p class="specialty">${cleaner.specialty}</p>
                    </div>
                </div>
            `;
        }
    }
    
    // Auto-Rebook Feature
    const autoRebookCheckbox = document.getElementById('auto-rebook');
    const rebookFrequencySelect = document.getElementById('rebook-frequency');
    const rebookOptions = document.getElementById('rebook-options');
    
    if (autoRebookCheckbox && rebookOptions) {
        autoRebookCheckbox.addEventListener('change', function() {
            rebookOptions.style.display = this.checked ? 'block' : 'none';
        });
    }
    
    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const bookingData = {};
            
            for (const [key, value] of formData.entries()) {
                bookingData[key] = value;
            }
            
            // This would typically be sent to a server
            console.log('Booking Data:', bookingData);
            
            // Show confirmation
            const bookingModal = document.getElementById('booking-modal');
            if (bookingModal) {
                bookingModal.style.display = 'none';
            }
            
            const confirmationModal = document.getElementById('confirmation-modal');
            if (confirmationModal) {
                confirmationModal.style.display = 'block';
            }
        });
    }
    
    // Real-Time Tracking Simulation
    const trackingMap = document.getElementById('tracking-map');
    const etaTime = document.getElementById('eta-time');
    
    if (trackingMap && etaTime) {
        // This would typically use a mapping API like Google Maps
        // For demo purposes, we'll simulate a cleaner approaching
        let minutes = 15;
        
        const trackingInterval = setInterval(() => {
            minutes--;
            etaTime.textContent = `${minutes} min`;
            
            if (minutes <= 0) {
                clearInterval(trackingInterval);
                etaTime.textContent = 'Arrived';
                
                const statusItems = document.querySelectorAll('.status-item');
                if (statusItems.length > 0) {
                    const arrivedStatus = statusItems[statusItems.length - 1];
                    const statusIcon = arrivedStatus.querySelector('.status-icon');
                    
                    if (statusIcon) {
                        statusIcon.classList.remove('pending');
                    }
                }
            }
        }, 3000); // Update every 3 seconds for demo
    }
    
    // Photo Verification Gallery
    const verificationPhotos = document.querySelectorAll('.verification-photo');
    const photoModal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    
    if (verificationPhotos.length > 0 && photoModal && modalImg) {
        verificationPhotos.forEach(photo => {
            photo.addEventListener('click', function() {
                photoModal.style.display = 'block';
                modalImg.src = this.src;
            });
        });
    }
    
    // Smart Home Integration Toggle
    const smartHomeToggles = document.querySelectorAll('.smart-home-toggle');
    
    if (smartHomeToggles.length > 0) {
        smartHomeToggles.forEach(toggle => {
            toggle.addEventListener('change', function() {
                const deviceId = this.dataset.device;
                const status = this.checked ? 'on' : 'off';
                
                // This would typically send a request to a smart home API
                console.log(`Device ${deviceId} turned ${status}`);
                
                // Update UI
                const statusIndicator = document.querySelector(`.device-status[data-device="${deviceId}"]`);
                if (statusIndicator) {
                    statusIndicator.textContent = status.toUpperCase();
                    statusIndicator.className = `device-status ${status}`;
                }
            });
        });
    }
    
    // Load cleaner profile data
    function loadCleanerProfile(cleanerId) {
        // This would typically be an API call
        // For demo purposes, we'll use mock data
        const cleaners = {
            '1': {
                name: 'Maria Rodriguez',
                rating: 4.9,
                reviews: 127,
                image: 'images/cleaner1.jpg',
                specialty: 'Deep Cleaning Expert',
                bio: 'Maria has been cleaning homes in Manhattan for over 8 years. She specializes in deep cleaning and has a keen eye for detail. Her clients appreciate her thoroughness and friendly demeanor.',
                cleans: 342,
                years: 8,
                languages: 'English, Spanish',
                reviews: [
                    {
                        author: 'Jennifer K.',
                        date: 'March 15, 2025',
                        rating: 5,
                        text: 'Maria is amazing! My apartment has never been cleaner. She paid attention to every detail and even organized my kitchen cabinets.'
                    },
                    {
                        author: 'Michael T.',
                        date: 'February 28, 2025',
                        rating: 5,
                        text: 'Punctual, professional, and perfect cleaning. Will definitely book Maria again!'
                    }
                ]
            },
            '2': {
                name: 'John Smith',
                rating: 4.8,
                reviews: 93,
                image: 'images/cleaner2.jpg',
                specialty: 'Eco-Friendly Cleaning',
                bio: 'John is passionate about eco-friendly cleaning. He uses only natural, non-toxic products that are safe for families, pets, and the environment. He has been with Cleanuity for 5 years.',
                cleans: 215,
                years: 5,
                languages: 'English',
                reviews: [
                    {
                        author: 'Sarah M.',
                        date: 'April 2, 2025',
                        rating: 5,
                        text: 'As someone with allergies, I appreciate John\'s commitment to using natural cleaning products. My home smells fresh without any harsh chemical odors.'
                    },
                    {
                        author: 'David L.',
                        date: 'March 20, 2025',
                        rating: 4,
                        text: 'Great job overall. Very thorough and respectful of my space.'
                    }
                ]
            }
        };
        
        const cleaner = cleaners[cleanerId];
        
        if (cleaner) {
            const profileModal = document.getElementById('cleaner-profile-modal');
            if (!profileModal) return;
            
            const profileImg = profileModal.querySelector('.cleaner-profile-img');
            const profileName = profileModal.querySelector('.cleaner-profile-info h3');
            const profileRating = profileModal.querySelector('.cleaner-profile-info .rating');
            const profileSpecialty = profileModal.querySelector('.cleaner-profile-info .specialty');
            const profileBio = profileModal.querySelector('.bio');
            const profileCleans = profileModal.querySelector('.stat-number.cleans');
            const profileYears = profileModal.querySelector('.stat-number.years');
            const profileLanguages = profileModal.querySelector('.languages');
            const reviewsContainer = profileModal.querySelector('.cleaner-reviews');
            
            if (profileImg) profileImg.src = cleaner.image;
            if (profileName) profileName.textContent = cleaner.name;
            
            if (profileRating) {
                let stars = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= Math.floor(cleaner.rating)) {
                        stars += '<i class="fas fa-star"></i>';
                    } else if (i === Math.ceil(cleaner.rating) && !Number.isInteger(cleaner.rating)) {
                        stars += '<i class="fas fa-star-half-alt"></i>';
                    } else {
                        stars += '<i class="far fa-star"></i>';
                    }
                }
                profileRating.innerHTML = `${stars} (${cleaner.reviews} reviews)`;
            }
            
            if (profileSpecialty) profileSpecialty.textContent = cleaner.specialty;
            if (profileBio) profileBio.textContent = cleaner.bio;
            if (profileCleans) profileCleans.textContent = cleaner.cleans;
            if (profileYears) profileYears.textContent = cleaner.years;
            if (profileLanguages) profileLanguages.textContent = cleaner.languages;
            
            if (reviewsContainer && cleaner.reviews) {
                let reviewsHTML = '';
                
                cleaner.reviews.forEach(review => {
                    let stars = '';
                    for (let i = 1; i <= 5; i++) {
                        stars += i <= review.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
                    }
                    
                    reviewsHTML += `
                        <div class="review">
                            <div class="review-header">
                                <span class="review-author">${review.author}</span>
                                <span class="review-date">${review.date}</span>
                            </div>
                            <div class="review-rating">${stars}</div>
                            <p class="review-text">${review.text}</p>
                        </div>
                    `;
                });
                
                reviewsContainer.innerHTML = reviewsHTML;
            }
        }
    }
});

// Photo Verification Functionality for Cleanuity

class PhotoVerification {
    constructor() {
        this.photos = [];
        this.notes = '';
    }
    
    // Initialize photo verification controls
    initControls() {
        // Photo modal functionality
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
        
        // Close photo modal
        const closePhotoModal = photoModal ? photoModal.querySelector('.close-modal') : null;
        if (closePhotoModal) {
            closePhotoModal.addEventListener('click', function() {
                photoModal.style.display = 'none';
            });
        }
        
        // Approve cleaning button
        const approveBtn = document.getElementById('approve-cleaning-btn');
        if (approveBtn) {
            approveBtn.addEventListener('click', () => {
                this.approveCleaningResults();
            });
        }
        
        // Request touch-up button
        const touchupBtn = document.getElementById('request-touchup-btn');
        if (touchupBtn) {
            touchupBtn.addEventListener('click', () => {
                this.requestTouchup();
            });
        }
    }
    
    // Load verification photos
    loadVerificationPhotos(cleaningId) {
        // In a real implementation, this would fetch photos from a server
        // For demo purposes, we'll use mock data
        
        const mockPhotos = [
            {
                id: 1,
                url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                area: 'Kitchen',
                timestamp: '2025-04-23T15:30:00Z'
            },
            {
                id: 2,
                url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                area: 'Bathroom',
                timestamp: '2025-04-23T15:35:00Z'
            },
            {
                id: 3,
                url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                area: 'Living Room',
                timestamp: '2025-04-23T15:40:00Z'
            },
            {
                id: 4,
                url: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                area: 'Bedroom',
                timestamp: '2025-04-23T15:45:00Z'
            }
        ];
        
        this.photos = mockPhotos;
        this.notes = 'All areas cleaned as requested. Paid special attention to kitchen and bathroom as noted in your instructions. Organized books on living room shelf. Left windows open slightly for fresh air as requested.';
        
        // Update UI
        this.updatePhotoVerificationUI();
    }
    
    // Update photo verification UI
    updatePhotoVerificationUI() {
        const photoContainer = document.querySelector('#photo-verification-modal .modal-body > div:first-child');
        const notesElement = document.querySelector('#photo-verification-modal .modal-body > div:nth-child(2) > p');
        
        if (photoContainer && this.photos.length > 0) {
            let photosHTML = '';
            
            this.photos.forEach(photo => {
                photosHTML += `
                    <img src="${photo.url}" alt="${photo.area}" class="verification-photo" style="width: 100%; border-radius: 8px; cursor: pointer;" data-id="${photo.id}">
                `;
            });
            
            photoContainer.innerHTML = photosHTML;
            
            // Re-attach click events
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
        }
        
        if (notesElement) {
            notesElement.textContent = this.notes;
        }
    }
    
    // Show photo verification modal
    showPhotoVerification(cleaningId) {
        const photoVerificationModal = document.getElementById('photo-verification-modal');
        
        if (photoVerificationModal) {
            // Load photos
            this.loadVerificationPhotos(cleaningId);
            
            // Show modal
            photoVerificationModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Approve cleaning results
    approveCleaningResults() {
        // In a real implementation, this would send approval to the server
        console.log('Cleaning approved');
        
        // Show rating modal or form
        this.showRatingForm();
        
        // Close photo verification modal
        const photoVerificationModal = document.getElementById('photo-verification-modal');
        if (photoVerificationModal) {
            photoVerificationModal.style.display = 'none';
        }
        
        // Show notification
        this.showNotification('Cleaning approved. Thank you for your feedback!');
    }
    
    // Request touch-up
    requestTouchup() {
        // In a real implementation, this would send a touch-up request to the server
        console.log('Touch-up requested');
        
        // Show touch-up form
        this.showTouchupForm();
        
        // Show notification
        this.showNotification('Touch-up requested. Your cleaner will be notified.');
    }
    
    // Show rating form
    showRatingForm() {
        // In a real implementation, this would show a rating form or modal
        console.log('Rating form would show here');
        
        // For demo purposes, just show a notification
        this.showNotification('Please rate your cleaning experience!');
    }
    
    // Show touch-up form
    showTouchupForm() {
        // Create and show a touch-up form modal
        const touchupFormHTML = `
            <div class="modal" id="touchup-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Request Touch-up</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="touchup-form">
                            <div class="form-group">
                                <label for="touchup-areas">Areas Needing Touch-up</label>
                                <select id="touchup-areas" class="form-control" multiple required>
                                    <option value="kitchen">Kitchen</option>
                                    <option value="bathroom">Bathroom</option>
                                    <option value="living-room">Living Room</option>
                                    <option value="bedroom">Bedroom</option>
                                </select>
                                <small>Hold Ctrl/Cmd to select multiple areas</small>
                            </div>
                            <div class="form-group">
                                <label for="touchup-details">Details</label>
                                <textarea id="touchup-details" class="form-control" rows="4" placeholder="Please provide details about what needs to be touched up" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="touchup-time">Preferred Time</label>
                                <select id="touchup-time" class="form-control" required>
                                    <option value="">Select a time</option>
                                    <option value="asap">As Soon As Possible</option>
                                    <option value="today">Later Today</option>
                                    <option value="tomorrow">Tomorrow</option>
                                    <option value="schedule">Schedule Specific Time</option>
                                </select>
                            </div>
                            <div id="specific-time-container" style="display: none;">
                                <div class="form-group">
                                    <label for="touchup-date">Date</label>
                                    <input type="date" id="touchup-date" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="touchup-hour">Time</label>
                                    <select id="touchup-hour" class="form-control">
                                        <option value="9">9:00 AM</option>
                                        <option value="10">10:00 AM</option>
                                        <option value="11">11:00 AM</option>
                                        <option value="12">12:00 PM</option>
                                        <option value="13">1:00 PM</option>
                                        <option value="14">2:00 PM</option>
                                        <option value="15">3:00 PM</option>
                                        <option value="16">4:00 PM</option>
                                        <option value="17">5:00 PM</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" form="touchup-form" class="btn btn-primary">Submit Request</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add to document
        const touchupModalContainer = document.createElement('div');
        touchupModalContainer.innerHTML = touchupFormHTML;
        document.body.appendChild(touchupModalContainer.firstChild);
        
        // Get modal elements
        const touchupModal = document.getElementById('touchup-modal');
        const closeModalBtn = touchupModal.querySelector('.close-modal');
        const touchupForm = document.getElementById('touchup-form');
        const touchupTimeSelect = document.getElementById('touchup-time');
        const specificTimeContainer = document.getElementById('specific-time-container');
        
        // Show modal
        touchupModal.style.display = 'block';
        
        // Handle close button
        closeModalBtn.addEventListener('click', function() {
            touchupModal.style.display = 'none';
            document.body.removeChild(touchupModal);
        });
        
        // Handle specific time selection
        touchupTimeSelect.addEventListener('change', function() {
            specificTimeContainer.style.display = this.value === 'schedule' ? 'block' : 'none';
        });
        
        // Handle form submission
        touchupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const areas = Array.from(document.getElementById('touchup-areas').selectedOptions).map(option => option.text);
            const details = document.getElementById('touchup-details').value;
            const timePreference = document.getElementById('touchup-time').value;
            
            // In a real implementation, this would send the data to a server
            console.log('Touch-up request submitted:', { areas, details, timePreference });
            
            // Close modal
            touchupModal.style.display = 'none';
            document.body.removeChild(touchupModal);
            
            // Show confirmation
            this.showNotification('Touch-up request submitted. We will contact you shortly to confirm.');
        });
    }
    
    // Show a notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'photo-verification-notification';
        notification.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; background-color: #1AACA0; color: white; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 9999; max-width: 300px;">
                <p style="margin: 0;">${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize photo verification when the modal is opened
document.addEventListener('DOMContentLoaded', function() {
    const photoVerification = new PhotoVerification();
    
    // Initialize controls
    photoVerification.initControls();
    
    // Add button to show photo verification (for demo purposes)
    const viewPhotosBtn = document.getElementById('view-photos-btn');
    if (viewPhotosBtn) {
        viewPhotosBtn.addEventListener('click', function() {
            photoVerification.showPhotoVerification('demo-cleaning');
        });
    }
    
    // When cleaning is completed in tracking
    const trackingModal = document.getElementById('tracking-modal');
    if (trackingModal) {
        // This would typically be triggered by a real-time event
        // For demo purposes, we'll use a timeout
        const showVerificationAfterTracking = function() {
            if (trackingModal.style.display === 'block') {
                setTimeout(() => {
                    trackingModal.style.display = 'none';
                    photoVerification.showPhotoVerification('demo-cleaning');
                }, 15000); // Show after 15 seconds of tracking for demo
            }
        };
        
        // When tracking modal is opened
        const trackCleanerBtn = document.getElementById('track-cleaner-btn');
        if (trackCleanerBtn) {
            trackCleanerBtn.addEventListener('click', function() {
                showVerificationAfterTracking();
            });
        }
    }
});

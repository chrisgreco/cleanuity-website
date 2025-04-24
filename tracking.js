// Real-Time Tracking Functionality for Cleanuity

class CleanerTracking {
    constructor(mapElementId, etaElementId) {
        this.mapElement = document.getElementById(mapElementId);
        this.etaElement = document.getElementById(etaElementId);
        this.statusElements = document.querySelectorAll('.status-item');
        this.currentStatus = 0;
        this.eta = 15; // minutes
        this.trackingInterval = null;
        this.cleanerLocation = {
            lat: 40.7128, // Default to NYC coordinates
            lng: -74.0060
        };
        this.destinationLocation = {
            lat: 40.7200, // Slightly different for demo
            lng: -73.9950
        };
    }

    // Initialize tracking
    initTracking() {
        this.updateStatus(1); // Set status to "Cleaner on the way"
        this.startETACountdown();
        
        // In a real implementation, this would connect to a real-time service
        // like Firebase, WebSockets, or a location tracking API
        console.log('Tracking initialized for cleaner');
    }

    // Update the ETA countdown
    startETACountdown() {
        this.trackingInterval = setInterval(() => {
            this.eta--;
            
            if (this.etaElement) {
                this.etaElement.textContent = `${this.eta} min`;
            }
            
            // Update map position (in a real implementation)
            this.updateCleanerPosition();
            
            // When cleaner arrives
            if (this.eta <= 0) {
                clearInterval(this.trackingInterval);
                
                if (this.etaElement) {
                    this.etaElement.textContent = 'Arrived';
                }
                
                this.updateStatus(2); // Set status to "Arrived at location"
                
                // After a delay, update to cleaning in progress
                setTimeout(() => {
                    this.updateStatus(3); // "Cleaning in progress"
                    
                    // After another delay, update to cleaning completed
                    setTimeout(() => {
                        this.updateStatus(4); // "Cleaning completed"
                        this.showPhotoVerification();
                    }, 10000); // 10 seconds for demo, would be longer in real app
                }, 5000); // 5 seconds for demo
            }
        }, 1000); // Update every second for demo
    }

    // Update the cleaner's position on the map
    updateCleanerPosition() {
        // In a real implementation, this would update a marker on a Google Maps or Mapbox instance
        // For demo purposes, we'll just log the updated position
        
        // Calculate new position (simple linear interpolation for demo)
        const progress = 1 - (this.eta / 15); // 0 to 1 based on ETA
        
        const newLat = this.cleanerLocation.lat + (this.destinationLocation.lat - this.cleanerLocation.lat) * progress;
        const newLng = this.cleanerLocation.lng + (this.destinationLocation.lng - this.cleanerLocation.lng) * progress;
        
        console.log(`Cleaner position updated: ${newLat}, ${newLng}`);
        
        // In a real implementation, this would update the map
        // map.setCenter({lat: newLat, lng: newLng});
        // marker.setPosition({lat: newLat, lng: newLng});
    }

    // Update the status indicators
    updateStatus(statusIndex) {
        if (this.statusElements && statusIndex < this.statusElements.length) {
            // Update status icons
            for (let i = 0; i <= statusIndex; i++) {
                const statusIcon = this.statusElements[i].querySelector('.status-icon');
                if (statusIcon) {
                    statusIcon.classList.remove('pending');
                }
                
                // Update status times
                if (i === statusIndex) {
                    const statusTime = this.statusElements[i].querySelector('.status-time');
                    if (statusTime) {
                        const now = new Date();
                        statusTime.textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
                    }
                }
            }
        }
    }

    // Show photo verification modal after cleaning is completed
    showPhotoVerification() {
        const photoModal = document.getElementById('photo-verification-modal');
        if (photoModal) {
            setTimeout(() => {
                photoModal.style.display = 'block';
            }, 3000); // Show after 3 seconds
        }
    }

    // Stop tracking
    stopTracking() {
        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
        }
    }
}

// Initialize tracking when the tracking modal is opened
document.addEventListener('DOMContentLoaded', function() {
    const trackButton = document.getElementById('track-cleaner-btn');
    const trackingModal = document.getElementById('tracking-modal');
    
    if (trackButton && trackingModal) {
        trackButton.addEventListener('click', function() {
            trackingModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Initialize tracking
            const tracking = new CleanerTracking('tracking-map', 'eta-time');
            tracking.initTracking();
            
            // Store the tracking instance on the modal for later access
            trackingModal.tracking = tracking;
        });
    }
    
    // Stop tracking when modal is closed
    const closeModalBtns = document.querySelectorAll('.close-modal');
    if (closeModalBtns.length > 0) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal && modal.tracking) {
                    modal.tracking.stopTracking();
                }
            });
        });
    }
});

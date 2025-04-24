// Cleaner Progress Tracker for Cleanuity
// This script handles the real-time tracking of cleaners with Domino's Pizza-style UI

// Tracker states
const TRACKER_STATES = {
  SCHEDULED: 'scheduled',
  EN_ROUTE: 'en-route',
  ARRIVED: 'arrived',
  CLEANING: 'cleaning',
  COMPLETED: 'completed'
};

// Initialize the progress tracker
function initProgressTracker(bookingId, containerId = 'progress-tracker') {
  const trackerContainer = document.getElementById(containerId);
  if (!trackerContainer) return;

  // Set up initial state
  window.cleanerTracker = {
    bookingId: bookingId,
    currentState: TRACKER_STATES.SCHEDULED,
    startTime: null,
    estimatedArrival: null,
    estimatedCompletion: null,
    cleaner: null,
    beforePhotos: [],
    afterPhotos: []
  };

  // Render initial tracker state
  renderTrackerState();

  // In a real implementation, we would set up a WebSocket or polling
  // to get real-time updates from the server
  setupTrackerUpdates();
}

// Render the tracker based on current state
function renderTrackerState() {
  const tracker = window.cleanerTracker;
  if (!tracker) return;

  const trackerContainer = document.getElementById('progress-tracker');
  if (!trackerContainer) return;

  // Update progress steps
  const steps = trackerContainer.querySelectorAll('.progress-step');
  if (steps.length >= 3) {
    // Reset all steps
    steps.forEach(step => {
      step.classList.remove('active', 'completed');
    });

    // Update steps based on current state
    switch (tracker.currentState) {
      case TRACKER_STATES.SCHEDULED:
        // All steps are in future state
        break;
      case TRACKER_STATES.EN_ROUTE:
        steps[0].classList.add('active');
        break;
      case TRACKER_STATES.ARRIVED:
        steps[0].classList.add('completed');
        steps[1].classList.add('active');
        break;
      case TRACKER_STATES.CLEANING:
        steps[0].classList.add('completed');
        steps[1].classList.add('active');
        break;
      case TRACKER_STATES.COMPLETED:
        steps[0].classList.add('completed');
        steps[1].classList.add('completed');
        steps[2].classList.add('completed');
        break;
    }
  }

  // Update status text and times
  updateStatusText();

  // Show/hide photo verification section based on state
  const photoSection = document.querySelector('.progress-photo-verification');
  if (photoSection) {
    photoSection.style.display = tracker.currentState === TRACKER_STATES.COMPLETED ? 'block' : 'none';
  }
}

// Update the status text in the tracker
function updateStatusText() {
  const tracker = window.cleanerTracker;
  if (!tracker) return;

  // Update step status text
  const steps = document.querySelectorAll('.progress-step');
  if (steps.length >= 3) {
    // En Route step
    const enRouteStatus = steps[0].querySelector('.progress-step-status');
    if (enRouteStatus) {
      if (tracker.currentState === TRACKER_STATES.SCHEDULED) {
        enRouteStatus.textContent = tracker.estimatedArrival ? 
          `Estimated: ${formatTime(tracker.estimatedArrival)}` : 
          'Pending';
      } else if (tracker.currentState === TRACKER_STATES.EN_ROUTE) {
        enRouteStatus.textContent = tracker.estimatedArrival ? 
          `ETA: ${formatTime(tracker.estimatedArrival)}` : 
          'On the way';
      } else {
        enRouteStatus.textContent = tracker.startTime ? 
          `Arrived at ${formatTime(tracker.startTime)}` : 
          'Completed';
      }
    }

    // Cleaning step
    const cleaningStatus = steps[1].querySelector('.progress-step-status');
    if (cleaningStatus) {
      if (tracker.currentState === TRACKER_STATES.SCHEDULED || 
          tracker.currentState === TRACKER_STATES.EN_ROUTE) {
        cleaningStatus.textContent = 'Pending';
      } else if (tracker.currentState === TRACKER_STATES.ARRIVED || 
                tracker.currentState === TRACKER_STATES.CLEANING) {
        cleaningStatus.textContent = 'In progress';
      } else {
        cleaningStatus.textContent = 'Completed';
      }
    }

    // Completed step
    const completedStatus = steps[2].querySelector('.progress-step-status');
    if (completedStatus) {
      if (tracker.currentState === TRACKER_STATES.COMPLETED) {
        completedStatus.textContent = 'Verified with photos';
      } else {
        completedStatus.textContent = tracker.estimatedCompletion ? 
          `Estimated: ${formatTime(tracker.estimatedCompletion)}` : 
          'Pending';
      }
    }
  }

  // Update details section
  const currentStatus = document.querySelector('.status-active');
  if (currentStatus) {
    let statusText = 'Scheduled';
    switch (tracker.currentState) {
      case TRACKER_STATES.EN_ROUTE:
        statusText = 'Cleaner en route';
        break;
      case TRACKER_STATES.ARRIVED:
      case TRACKER_STATES.CLEANING:
        statusText = 'Cleaning in progress';
        break;
      case TRACKER_STATES.COMPLETED:
        statusText = 'Cleaning completed';
        break;
    }
    currentStatus.textContent = statusText;
  }
}

// Format time for display
function formatTime(date) {
  if (!date) return '';
  
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Set up tracker updates (simulated for demo)
function setupTrackerUpdates() {
  const tracker = window.cleanerTracker;
  if (!tracker) return;

  // In a real implementation, this would connect to a WebSocket or set up polling
  // For demo purposes, we'll simulate updates with timeouts

  // Simulate cleaner being assigned and en route
  setTimeout(() => {
    updateTrackerState(TRACKER_STATES.EN_ROUTE, {
      cleaner: {
        name: 'Maria Rodriguez',
        rating: 4.9,
        photo: 'https://randomuser.me/api/portraits/women/65.jpg'
      },
      estimatedArrival: new Date(Date.now() + 15 * 60000) // 15 minutes from now
    });
  }, 5000);

  // Simulate cleaner arrived and cleaning in progress
  setTimeout(() => {
    updateTrackerState(TRACKER_STATES.CLEANING, {
      startTime: new Date(),
      estimatedCompletion: new Date(Date.now() + 120 * 60000) // 2 hours from now
    });
  }, 10000);

  // Simulate cleaning completed with photos
  setTimeout(() => {
    updateTrackerState(TRACKER_STATES.COMPLETED, {
      beforePhotos: [
        {
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop',
          caption: 'Kitchen - Before'
        },
        {
          url: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=1471&auto=format&fit=crop',
          caption: 'Living Room - Before'
        }
      ],
      afterPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1470&auto=format&fit=crop',
          caption: 'Kitchen - After'
        },
        {
          url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1470&auto=format&fit=crop',
          caption: 'Living Room - After'
        }
      ]
    });
  }, 15000);
}

// Update the tracker state
function updateTrackerState(newState, updates = {}) {
  const tracker = window.cleanerTracker;
  if (!tracker) return;

  // Update tracker state
  tracker.currentState = newState;
  
  // Apply any additional updates
  Object.assign(tracker, updates);

  // Render the updated state
  renderTrackerState();

  // If photos are provided, render them
  if (updates.beforePhotos || updates.afterPhotos) {
    renderPhotoVerification();
  }

  // Dispatch event for other components to react
  const event = new CustomEvent('trackerUpdate', { 
    detail: { 
      state: newState,
      tracker: { ...tracker }
    } 
  });
  document.dispatchEvent(event);
}

// Render photo verification section
function renderPhotoVerification() {
  const tracker = window.cleanerTracker;
  if (!tracker || !tracker.beforePhotos || !tracker.afterPhotos) return;

  const photoSection = document.querySelector('.progress-photo-verification');
  if (!photoSection) return;

  // Show the section
  photoSection.style.display = 'block';

  // Clear existing content
  const photoComparison = photoSection.querySelector('.photo-comparison');
  if (photoComparison) {
    photoComparison.innerHTML = '';

    // Add before photos
    if (tracker.beforePhotos.length > 0) {
      const beforeContainer = document.createElement('div');
      beforeContainer.className = 'photo-container';
      
      const beforeImg = document.createElement('img');
      beforeImg.src = tracker.beforePhotos[0].url;
      beforeImg.alt = tracker.beforePhotos[0].caption;
      
      const beforeCaption = document.createElement('p');
      beforeCaption.textContent = tracker.beforePhotos[0].caption;
      
      beforeContainer.appendChild(beforeImg);
      beforeContainer.appendChild(beforeCaption);
      photoComparison.appendChild(beforeContainer);
    }

    // Add after photos
    if (tracker.afterPhotos.length > 0) {
      const afterContainer = document.createElement('div');
      afterContainer.className = 'photo-container';
      
      const afterImg = document.createElement('img');
      afterImg.src = tracker.afterPhotos[0].url;
      afterImg.alt = tracker.afterPhotos[0].caption;
      
      const afterCaption = document.createElement('p');
      afterCaption.textContent = tracker.afterPhotos[0].caption;
      
      afterContainer.appendChild(afterImg);
      afterContainer.appendChild(afterCaption);
      photoComparison.appendChild(afterContainer);
    }
  }
}

// Initialize tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page with a tracker
  const trackerContainer = document.getElementById('progress-tracker');
  if (trackerContainer) {
    // Generate a random booking ID for demo purposes
    const bookingId = Math.floor(Math.random() * 10000);
    initProgressTracker(bookingId);
  }
});

// Export functions for use in other scripts
window.cleanerProgressTracker = {
  initProgressTracker,
  updateTrackerState,
  TRACKER_STATES
};

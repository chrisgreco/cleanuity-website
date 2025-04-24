// Auto-Rebook Functionality for Cleanuity

class AutoRebook {
    constructor() {
        this.rebookOptions = {
            frequency: 'biweekly',
            nextDate: null,
            cleaner: null,
            service: null,
            addOns: []
        };
    }
    
    // Initialize auto-rebook controls
    initControls() {
        const autoRebookCheckbox = document.getElementById('auto-rebook');
        const rebookOptionsDiv = document.getElementById('rebook-options');
        const rebookFrequencySelect = document.getElementById('rebook-frequency');
        
        if (autoRebookCheckbox && rebookOptionsDiv) {
            autoRebookCheckbox.addEventListener('change', function() {
                rebookOptionsDiv.style.display = this.checked ? 'block' : 'none';
            });
        }
        
        if (rebookFrequencySelect) {
            rebookFrequencySelect.addEventListener('change', (e) => {
                this.rebookOptions.frequency = e.target.value;
                this.updateNextRebookDate();
            });
        }
        
        // Handle form submission with auto-rebook
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                if (autoRebookCheckbox && autoRebookCheckbox.checked) {
                    this.setupAutoRebook(e);
                }
            });
        }
    }
    
    // Set up auto-rebook based on form data
    setupAutoRebook(formEvent) {
        // Get form data
        const formData = new FormData(formEvent.target);
        
        // Get selected cleaner
        const cleanerSelect = document.getElementById('cleaner-select');
        if (cleanerSelect && cleanerSelect.value) {
            this.rebookOptions.cleaner = {
                id: cleanerSelect.value,
                name: cleanerSelect.options[cleanerSelect.selectedIndex].text
            };
        }
        
        // Get selected service
        const cleaningType = document.getElementById('cleaning-type');
        if (cleaningType && cleaningType.value) {
            this.rebookOptions.service = {
                type: cleaningType.value,
                name: cleaningType.options[cleaningType.selectedIndex].text
            };
        }
        
        // Get selected add-ons
        const addOnCheckboxes = document.querySelectorAll('.add-on-checkbox:checked');
        if (addOnCheckboxes.length > 0) {
            this.rebookOptions.addOns = [];
            addOnCheckboxes.forEach(checkbox => {
                const label = document.querySelector(`label[for="${checkbox.id}"]`);
                this.rebookOptions.addOns.push({
                    id: checkbox.id,
                    name: label ? label.textContent.split('(')[0].trim() : checkbox.id,
                    price: parseFloat(checkbox.dataset.price || 0)
                });
            });
        }
        
        // Calculate next date based on frequency
        this.updateNextRebookDate();
        
        // In a real implementation, this would be sent to a server
        console.log('Auto-rebook set up:', this.rebookOptions);
        
        // Show in confirmation modal
        this.updateConfirmationModal();
    }
    
    // Update the next rebook date based on frequency
    updateNextRebookDate() {
        const cleaningDate = document.getElementById('cleaning-date');
        if (cleaningDate && cleaningDate.value) {
            const baseDate = new Date(cleaningDate.value);
            let nextDate = new Date(baseDate);
            
            switch (this.rebookOptions.frequency) {
                case 'weekly':
                    nextDate.setDate(baseDate.getDate() + 7);
                    break;
                case 'biweekly':
                    nextDate.setDate(baseDate.getDate() + 14);
                    break;
                case 'monthly':
                    nextDate.setMonth(baseDate.getMonth() + 1);
                    break;
            }
            
            this.rebookOptions.nextDate = nextDate;
            
            // Format date for display
            const formattedDate = nextDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Update any UI elements showing next date
            const nextRebookDateElement = document.getElementById('next-rebook-date');
            if (nextRebookDateElement) {
                nextRebookDateElement.textContent = formattedDate;
            }
        }
    }
    
    // Update confirmation modal with auto-rebook info
    updateConfirmationModal() {
        const confirmationModal = document.getElementById('confirmation-modal');
        if (!confirmationModal) return;
        
        // Check if auto-rebook section exists, if not create it
        let autoRebookSection = confirmationModal.querySelector('.auto-rebook-info');
        
        if (!autoRebookSection) {
            const modalBody = confirmationModal.querySelector('.modal-body');
            if (!modalBody) return;
            
            // Create auto-rebook section
            autoRebookSection = document.createElement('div');
            autoRebookSection.className = 'auto-rebook-info';
            autoRebookSection.style.backgroundColor = '#f8f9fa';
            autoRebookSection.style.borderRadius = '8px';
            autoRebookSection.style.padding = '20px';
            autoRebookSection.style.textAlign = 'left';
            autoRebookSection.style.marginBottom = '20px';
            autoRebookSection.style.marginTop = '20px';
            
            // Add heading
            const heading = document.createElement('h4');
            heading.textContent = 'Auto-Rebook Scheduled:';
            autoRebookSection.appendChild(heading);
            
            // Add next date
            const nextDatePara = document.createElement('p');
            const formattedDate = this.rebookOptions.nextDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            nextDatePara.innerHTML = `<strong>Next Cleaning:</strong> <span id="next-rebook-date">${formattedDate}</span>`;
            autoRebookSection.appendChild(nextDatePara);
            
            // Add frequency
            const frequencyPara = document.createElement('p');
            const frequencyMap = {
                'weekly': 'Weekly',
                'biweekly': 'Bi-weekly',
                'monthly': 'Monthly'
            };
            frequencyPara.innerHTML = `<strong>Frequency:</strong> ${frequencyMap[this.rebookOptions.frequency]}`;
            autoRebookSection.appendChild(frequencyPara);
            
            // Add cleaner if selected
            if (this.rebookOptions.cleaner) {
                const cleanerPara = document.createElement('p');
                cleanerPara.innerHTML = `<strong>Cleaner:</strong> ${this.rebookOptions.cleaner.name}`;
                autoRebookSection.appendChild(cleanerPara);
            }
            
            // Add one-click confirmation button
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'btn btn-primary';
            confirmBtn.textContent = 'Confirm Next Cleaning';
            confirmBtn.style.marginTop = '10px';
            confirmBtn.addEventListener('click', () => {
                this.confirmNextCleaning();
            });
            autoRebookSection.appendChild(confirmBtn);
            
            // Insert before the last buttons
            const lastButtons = modalBody.querySelector('button').parentElement;
            modalBody.insertBefore(autoRebookSection, lastButtons);
        } else {
            // Update existing section
            const nextDateElement = autoRebookSection.querySelector('#next-rebook-date');
            if (nextDateElement && this.rebookOptions.nextDate) {
                const formattedDate = this.rebookOptions.nextDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                nextDateElement.textContent = formattedDate;
            }
        }
    }
    
    // Confirm next cleaning with one click
    confirmNextCleaning() {
        // In a real implementation, this would send a confirmation to the server
        console.log('Next cleaning confirmed:', this.rebookOptions);
        
        // Show notification
        this.showNotification(`Your next cleaning has been confirmed for ${this.rebookOptions.nextDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`);
        
        // Update next date based on frequency for future rebooking
        const currentDate = this.rebookOptions.nextDate;
        let nextDate = new Date(currentDate);
        
        switch (this.rebookOptions.frequency) {
            case 'weekly':
                nextDate.setDate(currentDate.getDate() + 7);
                break;
            case 'biweekly':
                nextDate.setDate(currentDate.getDate() + 14);
                break;
            case 'monthly':
                nextDate.setMonth(currentDate.getMonth() + 1);
                break;
        }
        
        this.rebookOptions.nextDate = nextDate;
        
        // Update UI
        this.updateConfirmationModal();
    }
    
    // Show a notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'auto-rebook-notification';
        notification.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; background-color: #28a745; color: white; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 9999; max-width: 300px;">
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

// Initialize auto-rebook functionality
document.addEventListener('DOMContentLoaded', function() {
    const autoRebook = new AutoRebook();
    autoRebook.initControls();
});

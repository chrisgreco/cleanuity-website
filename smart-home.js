// Smart Home Integration Functionality for Cleanuity

class SmartHomeIntegration {
    constructor() {
        this.connectedDevices = {
            'front-door': {
                name: 'Front Door Lock',
                type: 'Amazon Key',
                status: true
            },
            'building-access': {
                name: 'Building Access',
                type: 'SmartThings',
                status: true
            }
        };
        
        this.accessSchedules = [
            {
                date: 'April 25, 2025',
                timeWindow: '10:00 AM - 1:00 PM',
                cleaner: 'Maria Rodriguez'
            }
        ];
    }
    
    // Initialize smart home controls
    initControls() {
        const toggles = document.querySelectorAll('.smart-home-toggle');
        
        if (toggles.length > 0) {
            toggles.forEach(toggle => {
                toggle.addEventListener('change', (e) => {
                    const deviceId = e.target.dataset.device;
                    this.toggleDevice(deviceId, e.target.checked);
                });
            });
        }
        
        // Add device button
        const addDeviceBtn = document.getElementById('add-device-btn');
        if (addDeviceBtn) {
            addDeviceBtn.addEventListener('click', () => {
                this.addNewDevice();
            });
        }
        
        // Modify schedule button
        const modifyScheduleBtn = document.getElementById('modify-schedule-btn');
        if (modifyScheduleBtn) {
            modifyScheduleBtn.addEventListener('click', () => {
                this.showScheduleEditor();
            });
        }
    }
    
    // Toggle a smart home device
    toggleDevice(deviceId, status) {
        if (this.connectedDevices[deviceId]) {
            this.connectedDevices[deviceId].status = status;
            
            // Update UI
            const statusIndicator = document.querySelector(`.device-status[data-device="${deviceId}"]`);
            if (statusIndicator) {
                statusIndicator.textContent = status ? 'ON' : 'OFF';
                statusIndicator.className = `device-status ${status ? 'on' : 'off'}`;
                statusIndicator.style.color = status ? '#28a745' : '#dc3545';
            }
            
            // In a real implementation, this would send a request to a smart home API
            console.log(`Device ${deviceId} (${this.connectedDevices[deviceId].name}) turned ${status ? 'on' : 'off'}`);
            
            // If this is a door lock, we would trigger unlock/lock
            if (deviceId.includes('door') || deviceId.includes('access')) {
                this.simulateLockAction(deviceId, status);
            }
        }
    }
    
    // Simulate lock/unlock action
    simulateLockAction(deviceId, status) {
        const actionType = status ? 'unlocked' : 'locked';
        console.log(`${this.connectedDevices[deviceId].name} ${actionType}`);
        
        // Show notification
        this.showNotification(`${this.connectedDevices[deviceId].name} has been ${actionType}`);
    }
    
    // Add a new smart home device
    addNewDevice() {
        const deviceTypeSelect = document.getElementById('new-device-type');
        
        if (deviceTypeSelect && deviceTypeSelect.value) {
            const deviceType = deviceTypeSelect.value;
            const deviceId = `device-${Object.keys(this.connectedDevices).length + 1}`;
            
            // Map select values to display names
            const deviceNames = {
                'door-lock': 'Door Lock',
                'garage': 'Garage Door',
                'building': 'Building Access',
                'other': 'Other Device'
            };
            
            // Add to connected devices
            this.connectedDevices[deviceId] = {
                name: deviceNames[deviceType] || 'New Device',
                type: 'Smart Device',
                status: false
            };
            
            // In a real implementation, this would initiate a device pairing process
            console.log(`Adding new device: ${deviceNames[deviceType]}`);
            
            // Show notification
            this.showNotification(`New device pairing initiated. Please follow the instructions for your ${deviceNames[deviceType]}.`);
            
            // Reset select
            deviceTypeSelect.value = '';
            
            // In a real implementation, this would refresh the device list
            this.refreshDeviceList();
        }
    }
    
    // Show schedule editor
    showScheduleEditor() {
        // In a real implementation, this would show a modal with date/time pickers
        console.log('Opening schedule editor');
        
        // For demo purposes, just show a notification
        this.showNotification('Schedule editor would open here, allowing you to modify access times.');
    }
    
    // Refresh the device list
    refreshDeviceList() {
        // In a real implementation, this would update the UI with the current device list
        console.log('Device list should refresh');
        
        // For demo purposes, just show a notification
        this.showNotification('Device added successfully. Please complete setup in your device app.');
    }
    
    // Show a notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'smart-home-notification';
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
    
    // Grant temporary access for a cleaner
    grantTemporaryAccess(cleanerName, date, startTime, endTime) {
        // In a real implementation, this would set up temporary access codes
        console.log(`Granting temporary access to ${cleanerName} on ${date} from ${startTime} to ${endTime}`);
        
        // Add to access schedules
        this.accessSchedules.push({
            date: date,
            timeWindow: `${startTime} - ${endTime}`,
            cleaner: cleanerName
        });
        
        // Show notification
        this.showNotification(`Temporary access granted to ${cleanerName} for ${date}, ${startTime} - ${endTime}`);
    }
    
    // Revoke access
    revokeAccess(index) {
        if (index < this.accessSchedules.length) {
            const schedule = this.accessSchedules[index];
            
            // Remove from schedules
            this.accessSchedules.splice(index, 1);
            
            // Show notification
            this.showNotification(`Access for ${schedule.cleaner} on ${schedule.date} has been revoked`);
        }
    }
}

// Initialize smart home integration when the modal is opened
document.addEventListener('DOMContentLoaded', function() {
    const smartHomeBtn = document.getElementById('smart-home-btn');
    const smartHomeModal = document.getElementById('smart-home-modal');
    
    if (smartHomeBtn && smartHomeModal) {
        // Create instance
        const smartHome = new SmartHomeIntegration();
        
        smartHomeBtn.addEventListener('click', function() {
            smartHomeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Initialize controls
            smartHome.initControls();
        });
        
        // Store the instance on the modal for later access
        smartHomeModal.smartHome = smartHome;
    }
    
    // Smart home checkbox in booking form
    const smartHomeCheckbox = document.getElementById('smart-home');
    const smartHomeTypeSelect = document.getElementById('smart-home-type');
    
    if (smartHomeCheckbox && smartHomeTypeSelect) {
        smartHomeCheckbox.addEventListener('change', function() {
            smartHomeTypeSelect.style.display = this.checked ? 'block' : 'none';
        });
    }
});

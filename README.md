# Cleanuity Website

This repository contains the source code for the Cleanuity website - a modern residential cleaning service built for busy New Yorkers who value trust, simplicity, and seamless experience.

## Features

- **Auto-Rebook Flow**: Book your favorite cleaner with just one click
- **Cleaner Profiles**: View detailed stats and ratings for each cleaner
- **Real-Time Tracking**: Track your cleaner's arrival with Uber Eats-style ETA
- **Photo Verification**: Receive photo proof of completed cleans
- **Smart Home Integration**: Support for keyless entry and smart home systems
- **Content Management**: Built-in Netlify CMS for easy content updates

## Getting Started

### Prerequisites

- Node.js (for local development)
- Git (for version control)

### Local Development

1. Clone this repository
```
git clone https://github.com/chrisgreco/cleanuity-website.git
cd cleanuity-website
```

2. Install dependencies (if needed)
```
npm install
```

3. Run a local server
```
npx http-server
```

4. View the site at http://localhost:8080

## Deployment

This website is deployed on Netlify. Any changes pushed to the main branch will automatically trigger a new deployment.

### Manual Deployment

If you need to manually deploy:

1. Zip the entire project directory
2. Upload to Netlify through their dashboard

## Content Management

The website includes Netlify CMS for easy content management:

1. Navigate to https://cleanuity.com/admin/
2. Log in with your credentials
3. Edit content through the user-friendly interface

## File Structure

- `index.html` - Main homepage
- `book.html` - Booking page
- `css/` - Stylesheets
  - `styles.css` - Main stylesheet
  - `booking.css` - Styles for booking page
  - `final-enhancements.css` - Latest style enhancements
  - `final-polish.css` - Final UI polish
  - `mobile-cta.css` - Mobile call-to-action styles
- `js/` - JavaScript files
  - `main.js` - Core functionality
  - `auto-rebook.js` - Auto-rebook feature
  - `tracking.js` - Real-time cleaner tracking
  - `photo-verification.js` - Photo verification system
  - `smart-home.js` - Smart home integration
  - `progress-tracker.js` - Cleaner progress tracker
  - `stripe-integration.js` - Payment processing
  - `validation.js` - Form validation
- `images/` - Image assets
  - `logo.png` - Cleanuity logo
  - `cleaners/` - Cleaner profile images
- `admin/` - Netlify CMS configuration
- `content/` - Content files for CMS

## Making Changes

### Text Changes

Edit the HTML files directly or use the Netlify CMS.

### Style Changes

Modify the CSS files in the `css/` directory.

### Functionality Changes

Update JavaScript files in the `js/` directory.

## Support

For questions or support, contact support@manus.ai

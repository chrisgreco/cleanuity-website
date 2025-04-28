# Cleanuity Website

A mobile-first, single-page website for Cleanuity, a premium cleaning service in NYC. The website allows customers to book cleaners through BookingKoala integration.

## Features

- Mobile-first responsive design
- Fast loading (optimized for <3 seconds load time)
- Single-page layout with smooth scrolling
- BookingKoala integration for booking management
- Trust-building elements and testimonials
- FAQ accordion section

## Technical Details

- HTML5, CSS3, and JavaScript
- No frameworks or libraries (except Font Awesome for icons)
- Minified CSS and JavaScript for performance
- Google Fonts (Inter) for typography
- Optimized for mobile devices with thumb-friendly scrolling

## Structure

- `index.html` - Main HTML file
- `css/` - CSS stylesheets
  - `styles.css` - Original CSS
  - `styles.min.css` - Minified CSS for production
- `js/` - JavaScript files
  - `main.js` - Original JavaScript
  - `main.min.js` - Minified JavaScript for production
- `assets/` - Images and other assets
  - `cleanuity-logo.png` - Main logo
  - `cleanuity-logo-with-tagline.png` - Logo with tagline

## Deployment

The website is designed to be deployed as a static site on Netlify or similar platforms. The booking functionality is handled through BookingKoala's external service.

## Development Notes

- The website follows the specifications provided in the Cleanuity Build Guide
- Color palette: White (#FFFFFF), Cleanuity Green (#4CAF50), Dark Gray (#222222)
- Font: Inter (with Helvetica Neue as fallback)
- All form submissions redirect to BookingKoala for processing
- No dynamic pricing is shown on the website (handled by BookingKoala)

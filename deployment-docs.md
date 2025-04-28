# Cleanuity Website - Deployment Documentation

## Overview

This document provides information about the Cleanuity website deployment, including URLs, features, and technical details.

## Deployment URLs

- Production URL: https://fzkaptvk.manus.space
- Previous deployment: https://jdcmesol.manus.space

## Features Implemented

- Mobile-first, single-page design with thumb scrolling
- Fast loading (optimized for <3 seconds load time)
- Complete booking form with BookingKoala integration
- Trust-building elements (badges, testimonials, FAQ)
- Responsive design that works on all device sizes

## Technical Implementation

### HTML Structure
- Single HTML file with all required sections
- Semantic markup for accessibility
- Proper meta tags for SEO

### CSS Implementation
- Mobile-first responsive design
- Minified CSS for performance
- Additional mobile-specific fixes for form elements
- Color palette: White (#FFFFFF), Cleanuity Green (#4CAF50), Dark Gray (#222222)

### JavaScript Functionality
- Accordion functionality for FAQ section
- Form submission handling with BookingKoala redirection
- Smooth scrolling for anchor links
- Intersection Observer for fade-in animations
- Mobile-specific touch enhancements

### Performance Optimizations
- Minified CSS and JavaScript
- Image dimensions specified to prevent layout shifts
- Limited animations for better performance
- Optimized font loading with preconnect
- Mobile-specific form element sizing

## Testing Performed

- Local development testing
- Mobile responsiveness testing
- Form functionality testing
- Accordion functionality testing
- Performance testing

## BookingKoala Integration

The website integrates with BookingKoala for handling the booking process:

1. User fills out the booking form on the Cleanuity website
2. Upon clicking "Check Availability," the user is redirected to BookingKoala
3. BookingKoala handles all dynamic booking logic, pricing, payment processing, and SMS notifications

## Maintenance Notes

- The website is deployed as a static site
- No backend databases or server-side processing required
- Updates can be made by modifying the HTML, CSS, and JavaScript files and redeploying

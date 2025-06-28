# reCAPTCHA v2 Setup Guide for Nolyx Society

## Step 1: Create New reCAPTCHA Site Key

1. **Go to Google reCAPTCHA Admin Console**
   - Visit: https://www.google.com/recaptcha/admin/create
   - Sign in with your Google account

2. **Create New Site**
   - **Label**: Enter "Nolyx Society" or any descriptive name
   - **reCAPTCHA type**: Select "reCAPTCHA v2" → "I'm not a robot" Checkbox
   - **Domains**: Add your domains (CRITICAL - this fixes the current error):
     - `localhost` (for development)
     - `127.0.0.1` (for local testing)
     - `localhost:5173` (for Vite dev server - IMPORTANT!)
     - `nolyx.sytes.net` (your production domain)
     - Add any other domains you'll use
   - **Accept the reCAPTCHA Terms of Service**
   - Click **Submit**

3. **Get Your Keys**
   - **Site Key**: This goes in your frontend code (public)
   - **Secret Key**: This goes in your backend code (private)

## Step 2: Update the Site Key in Your Application

After getting your new site key, you'll need to update it in the verification page.

## Step 3: Test the Integration

1. **Local Testing**
   - Run your development server
   - Navigate to `/verif`
   - Complete the reCAPTCHA
   - Verify it works correctly

2. **Production Testing**
   - Deploy to your production domain
   - Test the reCAPTCHA functionality
   - Ensure form submission works

## Step 4: Security Best Practices

1. **Domain Restrictions**
   - Only add domains you actually use
   - Don't use wildcard domains unless necessary

2. **Monitor Usage**
   - Check the reCAPTCHA admin console regularly
   - Monitor for unusual activity

3. **Keep Keys Secure**
   - Never commit secret keys to version control
   - Use environment variables for sensitive data

## Troubleshooting

### Common Issues:
1. **"Invalid site key"** - Check domain configuration
2. **reCAPTCHA not loading** - Check network connectivity
3. **Verification failing** - Ensure proper callback implementation
4. **reCAPTCHA error on localhost:5173** - Make sure `localhost:5173` is added to your reCAPTCHA domain list

### Debug Steps:
1. Check browser console for errors
2. Verify domain is added to reCAPTCHA admin (including port numbers like :5173)
3. Test with different browsers
4. Check network requests in developer tools
5. Clear browser cache after updating reCAPTCHA settings

### Current Error Fix:
If you're seeing "reCAPTCHA error:" in the console when accessing localhost:5173/verif, you need to:
1. Go to your Google reCAPTCHA admin console
2. Edit your site settings
3. Add `localhost:5173` to the domains list
4. Save the changes
5. Clear your browser cache
6. Refresh the page
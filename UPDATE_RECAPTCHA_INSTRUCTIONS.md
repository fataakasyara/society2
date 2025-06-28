# 🔑 How to Update reCAPTCHA Site Key

## Quick Update Steps

1. **Get your new site key** from Google reCAPTCHA admin console
2. **Update the configuration file**: `src/config/recaptcha.js`
3. **Replace the site key** in the `RECAPTCHA_CONFIG` object
4. **Test the integration** on both development and production

## Detailed Instructions

### 1. Create New reCAPTCHA Site Key

Visit: https://www.google.com/recaptcha/admin/create

**Configuration:**
- **Type**: reCAPTCHA v2 ("I'm not a robot" Checkbox)
- **Domains**: 
  - `localhost` (for development)
  - `127.0.0.1` (for local testing)
  - `nolyx.sytes.net` (your production domain)
  - Any other domains you use

### 2. Update Configuration

Edit `src/config/recaptcha.js`:

```javascript
export const RECAPTCHA_CONFIG = {
  // Replace with your new site key
  SITE_KEY: 'YOUR_NEW_SITE_KEY_HERE',
  
  // Optional: separate key for development
  DEV_SITE_KEY: 'YOUR_DEV_SITE_KEY_HERE',
  
  // ... rest of config
}
```

### 3. Verify Integration

1. **Development Testing:**
   ```bash
   npm run dev
   ```
   - Navigate to `/verif`
   - Complete reCAPTCHA
   - Check browser console for any errors

2. **Production Testing:**
   - Deploy to production
   - Test reCAPTCHA functionality
   - Monitor for any issues

### 4. Security Checklist

- ✅ Site key is for the correct domain
- ✅ reCAPTCHA type is v2 checkbox
- ✅ No console errors during verification
- ✅ Form submission works correctly
- ✅ Old site key is deactivated (if needed)

## Troubleshooting

### Common Issues:

1. **"Invalid site key" error**
   - Check domain configuration in reCAPTCHA admin
   - Ensure site key matches the domain

2. **reCAPTCHA not loading**
   - Check network connectivity
   - Verify script loading in browser dev tools

3. **Verification failing**
   - Check callback function implementation
   - Verify token is being captured correctly

### Debug Tools:

The verification page includes debug information in development mode showing:
- Current site key (first 20 characters)
- Environment details
- reCAPTCHA load status

## Testing Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify domain configuration in reCAPTCHA admin
3. Test with different browsers
4. Check network requests in developer tools
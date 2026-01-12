# Lake Arrowhead Pediatrics — Website Template

## Edit clinic info in one place
Open: `assets/js/settings.js`

Update:
- clinicName, phoneDisplay/phoneE164, faxDisplay, email
- addressLines, googleMapsQuery
- hours
- providers (names, bios, photos)
- portal URLs
- insurance highlight text
- appointmentRequest.endpointUrl (optional)

## Replace photos
Replace these files with your real photos (keep filenames the same):
- `assets/img/banner.jpg` (wide mountain banner)
- `assets/img/provider-rocha.jpg`
- `assets/img/provider-kate.jpg`

## Appointment request form
By default, the form shows a message because no secure endpoint is configured.
To enable:
1) Set `appointmentRequest.endpointUrl` in `assets/js/settings.js` to your secure webhook (HTTPS).
2) Ensure your endpoint accepts JSON POST and handles PHI appropriately.

## Deploy
This is a static site — upload the folder to your host (Cloudflare Pages, Netlify, S3, etc.).
Update `site.baseUrl` in `assets/js/settings.js` and re-export `sitemap.xml` if desired.

## Pages included
- Home (`index.html`)
- About
- Services
- New Patients (forms + policies)
- Insurance & Billing
- Resources (after-hours + links placeholders)
- FAQs
- Reviews
- Patient Portal (placeholder links)
- Contact (appointment request form)
- Website Privacy
- Notice of Privacy Practices (placeholder)
- Terms


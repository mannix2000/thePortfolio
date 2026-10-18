# Deployment Guide

This project is ready for either Netlify or Vercel.

## Before Deploying

1. Open a terminal in `react-portfolio`.
2. Run `npm install` if dependencies are not installed yet.
3. Create a `.env` file and set these EmailJS variables if you want the contact form to deliver messages by email:
   `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`.
4. In EmailJS, make sure your template accepts `from_name`, `from_email`, `subject`, `message`, `reply_to`, and `to_email`.
5. Run `npm run build` and confirm the build completes successfully.
6. Check that `public/media/` and `public/documents/` contain the images and resume.

## Netlify

1. Push the `react-portfolio` folder to a GitHub repository.
2. Sign in to Netlify.
3. Choose `Add new site` then `Import an existing project`.
4. Select your Git provider and choose the repository.
5. Set the base directory to `react-portfolio` only if the repository root contains other folders. If the repository contains only this app, leave it blank.
6. Set the build command to `npm run build`.
7. Set the publish directory to `dist`.
8. Deploy the site.
9. After the first deploy, open the site and verify:
   the intro overlay works, the images load, both PDF download buttons work, and the contact form sends an email.

`netlify.toml` is already included for SPA routing.

## Vercel

1. Push the `react-portfolio` folder to a GitHub repository.
2. Sign in to Vercel.
3. Click `Add New...` then `Project`.
4. Import the repository.
5. If needed, set the root directory to `react-portfolio`.
6. Keep the framework preset as `Vite`.
7. Confirm the build command is `npm run build`.
8. Confirm the output directory is `dist`.
9. Deploy the project.
10. After deploy, verify the same runtime checks:
    intro overlay, images, resume download, and contact form email delivery.

`vercel.json` is already included for SPA routing.

## Recommended Checks After Deploy

1. Test the site on desktop and mobile widths.
2. Click `Download Resume` and confirm `Emmanuel-Magallanes-Resume.pdf` downloads.
4. Submit the contact form and confirm the message arrives at `magallanesmannix2000@gmail.com`.
5. Open browser dev tools and confirm there are no missing asset requests.

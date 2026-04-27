# Deployment Guide

This project is ready for either Netlify or Vercel.

## Before Deploying

1. Open a terminal in `react-portfolio`.
2. Run `npm install` if dependencies are not installed yet.
3. Run `npm run build` and confirm the build completes successfully.
4. Check that `public/media/` and `public/documents/` contain the images, resume, and portfolio PDF.

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
   the intro overlay works, the images load, and both PDF download buttons work.

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
    intro overlay, images, resume download, and portfolio PDF download.

`vercel.json` is already included for SPA routing.

## Recommended Checks After Deploy

1. Test the site on desktop and mobile widths.
2. Click `Download Resume` and confirm `Emmanuel-Magallanes-Resume.pdf` downloads.
3. Click `Download PDF Portfolio` and confirm `Emmanuel-Magallanes-Portfolio.pdf` downloads.
4. Open browser dev tools and confirm there are no missing asset requests.

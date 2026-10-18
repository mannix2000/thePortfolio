# Emmanuel Magallanes React Portfolio

React + TypeScript + Vite portfolio site based on the original Emmanuel Magallanes portfolio and its one-page PDF version.

## Local Development

```bash
npm install
npm run dev
```

To enable the contact form email delivery, create a `.env` file in `react-portfolio` with these values from your EmailJS account:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

The contact form is set to send messages to `magallanesmannix2000@gmail.com`.

## Production Build

```bash
npm run build
npm run preview
```

## Project Assets

- `public/media/` contains the bundled local images used by the site.
- `public/documents/Emmanuel-Magallanes-Resume.pdf` is the resume download.

## Deployment

Step-by-step deployment instructions are in [DEPLOYMENT.md](./DEPLOYMENT.md).

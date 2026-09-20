# Silent House Group

A modern, brutalist web application for Silent House Group built with Next.js 15, Tailwind CSS, GSAP, and Payload CMS 3.0.

## Overview

This repository contains the full stack for the Silent House website. It features a custom brutalist design, smooth scrolling via Lenis, advanced scroll-triggered animations via GSAP, and a fully integrated headless CMS using Payload 3.0 powered by a local SQLite database.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Lenis](https://github.com/darkroomengineering/lenis) Smooth Scroll
- **CMS / Backend**: [Payload CMS 3.0](https://payloadcms.com/)
- **Database**: SQLite (Local file `silent-house.db`)

## Getting Started

### Prerequisites
Make sure you have Node.js 18+ installed on your machine.

### Installation

1. Clone the repository and install the dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to view the frontend.

## Managing Content (Payload CMS)

The CMS is built directly into the Next.js app. 

1. Access the Admin Dashboard at: [http://localhost:3000/admin](http://localhost:3000/admin)
2. You will be prompted to create your first admin user upon visiting for the first time.

### Available Collections
- **Pages**: Manage text and SEO for the `home` and `contact` pages.
- **Featured Works**: Projects shown on the home page with scroll-triggered pinning.
- **Divisions**: The three main branches (Studios, Productions, Touring).
- **Press**: Press articles and links shown on the home page.
- **Posts (Journal)**: Articles, case studies, and updates shown on the `/journal` page.
- **Contact Inquiries**: Form submissions from the contact page.

## Database & Seeding

This project uses a local SQLite database stored in `silent-house.db`. 

If you want to pre-populate the database with sample data (Featured Works, Divisions, Press, etc.), you can trigger the seed script by running the following command while the dev server is running:

```bash
curl -s http://localhost:3000/api/seed
```
*Note: Make sure you have created your first Admin user in the Payload dashboard before running the seed script, otherwise the CMS might reject the data creation.*

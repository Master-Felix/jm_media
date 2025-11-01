# JM Media - Modern Visual Production

A professional, responsive website for JM Media, a photography and video production studio based in Mlolongo, Kenya.

## 🖼️ Preview

![JM Media website preview](assets/images/JM_MEDIA.png)

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Interactive Portfolio**: Filterable portfolio showcasing photography and video work
- **Service Showcase**: Comprehensive service offerings with category filtering
- **Contact Form**: Integrated form submission with Formspree for client inquiries
- **SEO Optimized**: Complete meta tags, Open Graph, and Twitter Card support
- **Structured Data**: Schema.org markup for better search engine visibility
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Image Gallery**: Modal lightbox for portfolio items
- **Social Integration**: WhatsApp floating button and social media links

## 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with CSS variables and modern features
- **JavaScript**: Vanilla JS for interactivity and animations
- **Bootstrap 5.3.3**: Responsive grid and components
- **Bootstrap Icons**: Icon library
- **Google Fonts**: Inter font family
- **Formspree**: Contact form handling

## 📁 Project Structure

jm_media/
├── assets/
│   ├── css/
│   │   └── style.css          # Custom stylesheet
│   ├── images/
│   │   ├── logo.png           # Brand logo
│   │   ├── about.jpeg         # About section image
│   │   ├── h1.jpeg - h5.jpeg  # Hero carousel images
│   │   ├── portfolio/         # Portfolio images
│   │   └── team/              # Team member photos
│   └── js/
│       └── script.js          # JavaScript functionality
├── index.html                 # Main HTML file
├── README.md                  # Project documentation
└── .gitignore                # Git ignore file

## 🎨 Sections

1. **Hero Carousel**: Eye-catching image carousel with multiple slides
2. **Services**: Photography, video production, branding, post-production, streaming, and audio services
3. **Portfolio**: Filterable gallery of past work (Commercial, Wedding, Corporate, etc.)
4. **Testimonials**: Client testimonials and reviews
5. **About**: Company story and team members
6. **Contact**: Contact form and business information
7. **Location**: Interactive Google Maps integration

## 🛠️ Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/jm-media.git
cd jm-media
```

2.Open `index.html` in your web browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js http-server
npx http-server
```

3.Visit `http://localhost:8000` in your browser

## ⚙️ Configuration

### Form Configuration

The contact form uses Formspree. To set it up:

1. Create an account at [Formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form action in `index.html` (line 604):

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Google Maps

The location section uses an embedded Google Map. To update:

1. Get your location's coordinates from Google Maps
2. Update the iframe src in `index.html` (line 759-765)

### Social Media Links

Update social media URLs in:

- Navigation (lines 722-748)
- Footer (lines 788-794)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Features

- Lazy loading for non-critical images
- CSS animations optimized with hardware acceleration
- Smooth transitions and hover effects
- Intersection Observer for scroll animations
- Optimized image formats

## 📝 License

This project is proprietary and confidential. All rights reserved by JM Media.

## 📞 Contact

**JM Media**  
Location: Mlolongo, Kenya  
Phone: +254 711 615 597  
Email: <jouniourabed@gmail.com>  

## 👨‍💻 Team

- **Abadnego Joseph** - Founder & Executive Editor
- **Peter Makau** - Video Production Lead
- **Mike Rodriguez** - Post-Production Specialist

---

Built with ❤️ for JM Media © 2025

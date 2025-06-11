# 💖 For My Love - Romantic Website

A beautiful, animated romantic website built with Next.js and Framer Motion to celebrate your love story.

## ✨ Features

- 🎭 **Hero Section** with animated title and floating hearts
- ⏰ **Live Love Counter** showing time since your special date (Jan 1, 2025)
- 🎵 **Music Player** with background song support
- 📸 **Photo Gallery** for your favorite memories
- 💞 **Animated Love Elements** with floating GIFs and hearts
- 💌 **Love Note Section** with your personal message
- 🎥 **Video Section** for your special video
- 🎉 **Secret Easter Egg** - click the heart 3 times!
- 📱 **Fully Responsive** design for all devices

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### 📅 Change the Love Counter Date
Edit the date in `src/app/page.tsx`:
```javascript
const startDate = new Date('2025-01-01T00:00:00'); // Change this date
```

### 🎵 Add Your Love Song
1. Add your MP3 file to the `public` folder as `love-song.mp3`
2. The music player will automatically use this file

### 📸 Add Your Photos
Currently using emoji placeholders. To add real photos:
1. Add your images to the `public` folder
2. Update the gallery section in `src/app/page.tsx`
3. Replace the emoji divs with Next.js Image components

### 💌 Customize the Love Message
Edit the love note text in the "Love Note Section" of `src/app/page.tsx`

### 🎥 Add Your Video
Replace the video placeholder section with:
- YouTube/Vimeo embed
- Local video file
- Or keep the cute placeholder

### 🎨 Customize Colors
The website uses a pink/rose/purple color scheme. You can customize colors in:
- Tailwind classes throughout the components
- CSS gradients and backgrounds

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Dancing Script, Lora, Poppins)
- **Language:** TypeScript

## 📁 Project Structure

```
for-my-love/
├── src/
│   └── app/
│       ├── page.tsx        # Main romantic website
│       ├── layout.tsx      # Root layout with fonts
│       └── globals.css     # Global styles
├── public/               # Static assets (add your photos/music here)
└── package.json         # Dependencies
```

## 🎁 Easter Eggs

- Click the heart in the hero section 3 times to unlock a secret message!
- Hover over various elements for delightful animations
- All hearts and love elements have interactive animations

## 🚀 Deployment

Deploy to Vercel (recommended):

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

Or use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

## 💡 Tips for Personalization

1. **Photos:** Add 6 photos of you and your loved one to replace the emoji placeholders
2. **Music:** Choose a meaningful song in MP3 format
3. **Message:** Write your own heartfelt message in the love note section
4. **Video:** Add a special video or keep the cute placeholder
5. **Date:** Make sure to set the correct "first day together" date
6. **Colors:** Adjust the color scheme to match your preferences

## 🎉 Special Features

- **Smooth Animations:** Everything animates beautifully as you scroll
- **Mobile Optimized:** Looks perfect on phones, tablets, and desktops
- **Performance:** Built with Next.js for optimal loading speeds
- **Interactive:** Hover effects and clickable easter eggs throughout

---

Made with 💖 for celebrating love stories everywhere!

Enjoy your romantic website! 🌹✨

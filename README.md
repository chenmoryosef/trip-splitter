# 💰 Trip Expense Splitter

A real-time expense splitting app for trips and shared activities. Perfect for Chen & Maya's adventures!

## ✨ Features

- **👥 Two-Person Splitting**: Designed for Chen and Maya
- **💰 Real-time Sync**: Changes appear instantly on both devices
- **📱 Cross-Platform**: Works on iPhone and Android browsers
- **🔄 GitHub Gist Storage**: Free, reliable cloud sync via GitHub
- **💾 Offline Support**: Works offline, syncs when back online
- **🧮 Smart Balance Calculation**: Shows who owes what automatically
- **📊 Individual Totals**: See how much each person has spent
- **🎨 Modern UI**: Clean, mobile-first design

## 🚀 Quick Start

### 1. Deploy to GitHub Pages

1. **Create Repository**:
   ```bash
   # Create new repo on GitHub named "trip-splitter" (public)
   git remote add origin https://github.com/YOUR_USERNAME/trip-splitter.git
   git add trip_expense_splitter.html README.md
   git commit -m "Add trip expense splitter app"
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.com
   - Settings → Pages → Deploy from branch
   - Select "main" branch and "/ (root)" folder
   - Your app will be live at: `https://YOUR_USERNAME.github.io/trip-splitter/trip_expense_splitter.html`

### 2. Share with Your Friend

1. Open your deployed app URL
2. Add your first expense
3. App automatically creates a GitHub Gist and shows sharing URL
4. Send the sharing URL to Maya
5. Both devices will sync automatically every 5 seconds!

## 📖 How It Works

### First Time Setup:
1. Chen opens the app and adds an expense
2. App creates a private GitHub Gist automatically
3. App shows a sharing URL like: `https://your-username.github.io/trip-splitter/trip_expense_splitter.html?gist=abc123`
4. Chen shares this URL with Maya
5. Maya opens the URL and sees all expenses in real-time

### Daily Usage:
- Add expenses from either device
- See real-time balance updates
- Track who spent what with individual totals
- Settlement shows exactly who owes what to whom

## 🔄 Sync Technology

### GitHub Gist Backend:
- **Free**: Uses GitHub's free API (5000 requests/hour)
- **Reliable**: GitHub's 99.9% uptime
- **Private**: Creates private gists (only accessible with the link)
- **No Setup**: Works immediately without accounts or API keys

### Real-time Features:
- Polls for updates every 5 seconds
- Shows sync status (Online/Offline/Syncing)
- Offline support with localStorage backup
- Automatic conflict resolution

## 🛠️ Technical Details

### Stack:
- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
- **Storage**: GitHub Gist API + localStorage fallback  
- **Deployment**: GitHub Pages
- **Sync**: Polling-based real-time updates

### File Structure:
```
trip-splitter/
├── trip_expense_splitter.html (Complete single-file app)
├── README.md (This file)
└── Other files (can be ignored)
```

## 🚨 Troubleshooting

### Sync Not Working?
- Check internet connection
- Look for sync status indicator (top-right corner)
- Try refreshing the page
- Check browser console for errors

### Can't Share URL?
- Make sure you've added at least one expense first
- The sharing prompt appears after creating the first expense
- Copy the URL from your browser's address bar

### Data Lost?
- Data is backed up locally in browser storage
- Original data is stored in GitHub Gist
- Try opening the original sharing URL

## 📱 Mobile Installation

### iPhone (Safari):
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. App installs like a native app

### Android (Chrome):
1. Open the app in Chrome  
2. Tap the menu (three dots)
3. Select "Add to Home screen"
4. App installs like a native app

## 🔒 Privacy & Security

- **Private Gists**: Only accessible with the sharing URL
- **No Personal Data**: Only stores expense descriptions and amounts
- **Local Backup**: Data also stored locally on each device
- **No Tracking**: No analytics or user tracking

## 📊 Balance Calculation

### Individual Balances:
- **Chen Spent**: Total amount Chen paid out
- **Maya Spent**: Total amount Maya paid out

### Settlement:
- **Equal Split**: Each person pays half of every expense
- **Chen Pays All**: Chen covers the full expense
- **Maya Pays All**: Maya covers the full expense
- **Final Settlement**: Shows who owes money to whom

## 🤝 Contributing

Feel free to fork and improve! This is a simple, self-contained app perfect for personal use.

---

Built with ❤️ for Chen & Maya's trips

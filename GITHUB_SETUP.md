# 🚀 Push to GitHub - Setup Guide

Your repository is ready! Follow these steps to get it on GitHub.

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `DSA-Cracker` (or your preferred name)
3. Description: "Daily DSA problem solving journey with JavaScript - Auto-updating progress dashboard"
4. **Keep it Public** (so badges display)
5. **DO NOT** initialize with README (you already have one)
6. Click "Create repository"

## Step 2: Connect & Push

GitHub will show you commands. Use these instead:

```bash
cd /Users/nikunjshetye/Documents/PiyushGarg/DSA-Cracker

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/DSA-Cracker.git

# Push everything
git push -u origin main
```

## Step 3: Verify Automation

1. Go to your repo on GitHub
2. Check the **Actions** tab - you should see the workflow
3. Your README should display with all stats!

## Step 4: Test Auto-Update

1. Add a new problem file with metadata
2. Commit and push
3. Watch GitHub Actions auto-update your README! ✨

## Example: Adding Your Second Problem

```bash
# Create a new problem file (use the template from Notes/METADATA_TEMPLATE.md)
# Then:
git add .
git commit -m "✅ Solved: Valid Parentheses"
git push

# GitHub Action will automatically update README stats!
```

## Updating Your LeetCode Username

If you need to change your LeetCode username later, edit the README.md:

```markdown
![LeetCode Stats](https://leetcard.jacoblin.cool/YOUR_USERNAME?theme=dark&font=Ubuntu&ext=heatmap)
```

## Manual README Update

If you want to update locally before pushing:

```bash
npm run update-readme
```

---

## What Happens on Every Push?

1. 🔍 GitHub Action scans all topic folders
2. 📊 Parses metadata from each `.js` file
3. 🧮 Calculates total, difficulty breakdown, streak
4. ✍️ Updates README sections
5. 💾 Commits changes back to repo
6. ✨ Your dashboard is always up-to-date!

---

## Troubleshooting

**Q: Badges not showing?**
- Make sure repo is **Public**
- Check that you pushed the README.md

**Q: GitHub Action not running?**
- Check `.github/workflows/update-readme.yml` exists
- Verify you're pushing to `main` branch
- Check Actions tab for error logs

**Q: Stats not updating?**
- Ensure problem files have metadata headers
- Check `@topic` matches folder name exactly
- Run `npm run update-readme` locally to debug

---

## File Structure Reference

```
DSA-Cracker/
├── .github/workflows/
│   └── update-readme.yml        # Auto-update workflow
├── Arrays/
│   └── TwoSum.js                # Sample problem
├── Notes/
│   ├── METADATA_TEMPLATE.md     # How to add metadata
│   └── PATTERNS.md              # Track learnings
├── scripts/
│   └── update-readme.js         # The automation script
├── .gitignore
├── package.json
└── README.md                    # Your dashboard!
```

---

🎉 **You're all set!** Push to GitHub and watch your dashboard come alive!

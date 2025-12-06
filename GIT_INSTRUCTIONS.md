# Git Setup Instructions

It looks like `git` is not installed on your computer. You need it to submit your assignment properly.

## Step 1: Install Git
1.  Download Git from: https://git-scm.com/downloads
2.  Install it (just click "Next" through all the options).
3.  **Restart your computer** (or at least restart VS Code) after installing.

## Step 2: Initialize Repository
Once Git is installed, open your terminal in VS Code and run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit"
```

## Step 3: Link to GitHub
1.  Go to https://github.com/new
2.  Name your repository (e.g., `cyberguard-backend`).
3.  Click **"Create repository"**.
4.  Copy the commands under **"…or push an existing repository from the command line"**.
5.  Paste them into your VS Code terminal. They will look like this:

```bash
git remote add origin https://github.com/YOUR_USERNAME/cyberguard-backend.git
git branch -M main
git push -u origin main
```

## Alternative (If you can't install Git)
If you absolutely cannot install Git, you can manually upload files to GitHub:
1.  Create the repo on GitHub.
2.  Click **"uploading an existing file"**.
3.  Drag and drop all your project files (excluding `node_modules`).
4.  Click **"Commit changes"**.
*(Note: This is not recommended as it won't show your commit history properly)*

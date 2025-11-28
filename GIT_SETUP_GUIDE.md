# Git Setup and Version Control Guide

## Installing Git

### Windows
1. Download Git from: https://git-scm.com/download/win
2. Run the installer and follow the setup wizard
3. Verify installation:
   ```bash
   git --version
   ```

### Mac
```bash
brew install git
```

### Linux
```bash
sudo apt-get install git
```

---

## Initial Git Setup

### 1. Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. Initialize Repository
Navigate to your project folder:
```bash
cd c:\Users\DELL\OneDrive\Desktop\Dproject\dr-online-frontend
git init
```

### 3. Create .gitignore (if not exists)
The project already has a .gitignore file from Create React App.

---

## Creating Commit History

### Stage 1: Initial Setup
```bash
git add .
git commit -m "Initial commit: Create React app setup"
```

### Stage 2: Add Tailwind CSS
```bash
git add tailwind.config.js postcss.config.js src/index.css
git commit -m "feat: Configure Tailwind CSS"
```

### Stage 3: Add Components
```bash
git add src/components/
git commit -m "feat: Add Navbar and Footer components"
```

### Stage 4: Add Home Page
```bash
git add src/pages/Home.js
git commit -m "feat: Add Home page with registration forms"
```

### Stage 5: Add About Page
```bash
git add src/pages/About.js
git commit -m "feat: Add About page with mission and values"
```

### Stage 6: Add Services Page
```bash
git add src/pages/Services.js
git commit -m "feat: Add Services page with interactive modals"
```

### Stage 7: Add Contact Page
```bash
git add src/pages/Contact.js
git commit -m "feat: Add Contact page with form and FAQ"
```

### Stage 8: Add Discussions Page
```bash
git add src/pages/Discussions.js
git commit -m "feat: Add Discussion forum with topic creation"
```

### Stage 9: Update App.js
```bash
git add src/App.js
git commit -m "feat: Configure routing for all pages"
```

### Stage 10: Update README
```bash
git add README.md
git commit -m "docs: Update README with comprehensive documentation"
```

---

## Creating GitHub Repository

### 1. Create Repository on GitHub
1. Go to https://github.com
2. Click "New repository"
3. Name it `dr-online-frontend`
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### 2. Link Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/dr-online-frontend.git
git branch -M main
git push -u origin main
```

---

## Regular Git Workflow

### Check Status
```bash
git status
```

### Add Changes
```bash
# Add specific files
git add filename.js

# Add all changes
git add .
```

### Commit Changes
```bash
git commit -m "Your commit message"
```

### Push to GitHub
```bash
git push origin main
```

### Pull Latest Changes
```bash
git pull origin main
```

---

## Commit Message Conventions

Use these prefixes for clear commit history:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples:
```bash
git commit -m "feat: Add user authentication"
git commit -m "fix: Resolve navigation bug on mobile"
git commit -m "docs: Update API documentation"
git commit -m "style: Format code with Prettier"
```

---

## Viewing Commit History

```bash
# View all commits
git log

# View compact log
git log --oneline

# View last 5 commits
git log -5

# View commits with files changed
git log --stat
```

---

## Branching Strategy

### Create a New Branch
```bash
git checkout -b feature/new-feature
```

### Switch Between Branches
```bash
git checkout main
git checkout feature/new-feature
```

### Merge Branch
```bash
git checkout main
git merge feature/new-feature
```

### Delete Branch
```bash
git branch -d feature/new-feature
```

---

## Troubleshooting

### Undo Last Commit (Keep Changes)
```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

### Discard Uncommitted Changes
```bash
git checkout -- filename.js
```

### View Remote URL
```bash
git remote -v
```

### Change Remote URL
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/new-repo.git
```

---

## Tips for Good Commits

1. **Commit Often** - Make small, frequent commits
2. **Write Clear Messages** - Describe what and why
3. **Review Before Commit** - Check `git status` and `git diff`
4. **Test Before Push** - Ensure code works before pushing
5. **Use Branches** - Keep main branch stable

---

## Example Complete Workflow

```bash
# Start working on a new feature
git checkout -b feature/add-login

# Make changes to files
# ... edit files ...

# Check what changed
git status
git diff

# Stage changes
git add .

# Commit changes
git commit -m "feat: Add login functionality"

# Push to GitHub
git push origin feature/add-login

# Switch back to main
git checkout main

# Merge feature
git merge feature/add-login

# Push to GitHub
git push origin main

# Delete feature branch
git branch -d feature/add-login
```

---

**Remember:** Always pull before you push to avoid conflicts!

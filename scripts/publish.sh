#!/bin/bash

# Get the current version from package.json
VERSION=$(node -p "require('./package.json').version")

# Get the current date
DATE=$(date +"%Y-%m-%d")

# Commit message
COMMIT_MESSAGE="Release v$VERSION - $DATE"

# Compile the extension
npm run compile

# Package the extension
vsce package

# Publish to VS Code Marketplace
vsce publish

# Git commands
git add .
git commit -m "$COMMIT_MESSAGE"
git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin main
git push origin "v$VERSION"

echo "✅ Published version $VERSION and pushed to GitHub" 
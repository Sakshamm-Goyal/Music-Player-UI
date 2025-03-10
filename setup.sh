#!/bin/bash

# Install dependencies with force flag
npm install --force sass
npm install bootstrap react-bootstrap
npm install @fortawesome/fontawesome-free

# Create necessary directories if they don't exist
mkdir -p app
mkdir -p components
mkdir -p utils
mkdir -p types
mkdir -p data

# Check if installation was successful
if [ $? -eq 0 ]; then
  echo "Dependencies installed successfully!"
  echo "Starting development server..."
  npm run dev
else
  echo "Error installing dependencies. Please try again."
  exit 1
fi


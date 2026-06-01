#! /bin/bash

# Exit on error
set -e

# Run Linting
npm run lint

# Determine which part of the Mesh AI tests to run using package.json version
VERSION=$(cat package.json | grep -o '"version": "[^"]*"' | cut -d'"' -f4)
echo "Version: $VERSION"

if [ "$VERSION" == "1.0.0" ]; then
  echo "Running Part 1 of the Mesh AI tests"
  npx se-test-mesh-ai-part1
elif [ "$VERSION" == "2.0.0" ]; then
  echo "Running Part 2 of the Mesh AI tests"
  npx se-test-mesh-ai-part2
elif [ "$VERSION" == "3.0.0" ]; then
  echo "Running Part 3 of the Mesh AI tests"
  npx se-test-mesh-ai-part3
else
  echo "Unknown version: $VERSION"
  exit 1
fi

#! /bin/bash

# Exit on error
set -e

# Run Linting
npm run lint

# Determine which part to run from package.json "part": 1, "1", "1.0", or "1.0.0"
PART_NUMBER=$(node -e "
  const pkg = require('./package.json');
  if (pkg.part === undefined) {
    console.error('package.json must define \"part\"');
    process.exit(1);
  }
  const match = String(pkg.part).match(/^(\d+)/);
  if (!match) {
    console.error('Invalid part:', pkg.part);
    process.exit(1);
  }
  process.stdout.write(match[1]);
")
echo "Part number: $PART_NUMBER"

case $PART_NUMBER in
  1)
    echo "Running Part 1 of the Mesh AI tests"
    npx se-test-mesh-ai-part1
  ;;
  2)
    echo "Running Part 2 of the Mesh AI tests"
    npx se-test-mesh-ai-part2
  ;;
  3)
    echo "Running Part 3 of the Mesh AI tests"
    npx se-test-mesh-ai-part3
  ;;
  *)
    echo "Unknown part number: $PART_NUMBER"
    exit 1
  ;;
esac
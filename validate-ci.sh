#!/bin/bash

# CI/CD Workflow Validation Script
# This script validates the GitHub Actions workflows for the POS Portal App

echo "🔍 Validating CI/CD Workflows for POS Portal App"
echo "================================================="

WORKFLOWS_DIR=".github/workflows"
ERRORS=0

# Check if workflows directory exists
if [ ! -d "$WORKFLOWS_DIR" ]; then
    echo "❌ Workflows directory not found!"
    exit 1
fi

echo "✅ Workflows directory found"

# List all workflow files
echo ""
echo "📋 Available workflows:"
for file in "$WORKFLOWS_DIR"/*.yml; do
    if [ -f "$file" ]; then
        echo "  - $(basename "$file")"
    fi
done

# Validate YAML syntax
echo ""
echo "🔧 Validating YAML syntax..."
for file in "$WORKFLOWS_DIR"/*.yml; do
    if [ -f "$file" ]; then
        echo -n "  Checking $(basename "$file")... "
        if python3 -c "import yaml; yaml.safe_load(open('$file'))" 2>/dev/null; then
            echo "✅"
        else
            echo "❌"
            ERRORS=$((ERRORS + 1))
        fi
    fi
done

# Check for required workflow components
echo ""
echo "🔍 Checking workflow components..."

check_workflow_component() {
    local file=$1
    local component=$2
    local pattern=$3
    
    if grep -q "$pattern" "$file"; then
        echo "  ✅ $component found in $(basename "$file")"
    else
        echo "  ❌ $component missing in $(basename "$file")"
        ERRORS=$((ERRORS + 1))
    fi
}

# Check frontend workflow
if [ -f "$WORKFLOWS_DIR/frontend-ci.yml" ]; then
    check_workflow_component "$WORKFLOWS_DIR/frontend-ci.yml" "Self-hosted runner" "runs-on: self-hosted"
    check_workflow_component "$WORKFLOWS_DIR/frontend-ci.yml" "Node.js setup" "actions/setup-node"
    check_workflow_component "$WORKFLOWS_DIR/frontend-ci.yml" "Frontend build" "npm run build"
    check_workflow_component "$WORKFLOWS_DIR/frontend-ci.yml" "Frontend test" "npm test"
fi

# Check backend workflow
if [ -f "$WORKFLOWS_DIR/backend-ci.yml" ]; then
    check_workflow_component "$WORKFLOWS_DIR/backend-ci.yml" "Self-hosted runner" "runs-on: self-hosted"
    check_workflow_component "$WORKFLOWS_DIR/backend-ci.yml" "Node.js setup" "actions/setup-node"
    check_workflow_component "$WORKFLOWS_DIR/backend-ci.yml" "Backend build" "npm run build"
    check_workflow_component "$WORKFLOWS_DIR/backend-ci.yml" "Backend lint" "npm run lint"
fi

# Check application structure
echo ""
echo "🏗️  Checking application structure..."
if [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
    echo "  ✅ Frontend application found"
else
    echo "  ❌ Frontend application not found"
    ERRORS=$((ERRORS + 1))
fi

if [ -d "backend" ] && [ -f "backend/package.json" ]; then
    echo "  ✅ Backend application found"
else
    echo "  ❌ Backend application not found"
    ERRORS=$((ERRORS + 1))
fi

# Final report
echo ""
echo "📊 Validation Summary"
echo "===================="
if [ $ERRORS -eq 0 ]; then
    echo "🎉 All validations passed! CI/CD workflows are ready."
    echo ""
    echo "📚 Next steps:"
    echo "  1. Commit and push the workflows to trigger them"
    echo "  2. Set up self-hosted runners in your GitHub repository"
    echo "  3. Monitor the first workflow runs in GitHub Actions"
    echo "  4. Check the README.md in .github/workflows/ for detailed usage"
    exit 0
else
    echo "⚠️  Found $ERRORS validation errors. Please fix them before proceeding."
    exit 1
fi
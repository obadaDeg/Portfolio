#!/bin/bash

# Multi-Persona Portfolio - Quick Setup Script
# This script helps you set up the development environment

set -e

echo "🚀 Multi-Persona Portfolio - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@8.15.0
fi

echo "✅ pnpm version: $(pnpm -v)"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✅ Docker version: $(docker --version)"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker Compose version: $(docker-compose --version)"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "🐳 Starting PostgreSQL database..."
docker-compose up -d

echo ""
echo "⏳ Waiting for database to be ready..."
sleep 5

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 You can now start the development server:"
echo "   pnpm dev"
echo ""
echo "📍 Access the application at:"
echo "   - Frontend: http://localhost:3000"
echo "   - Admin:    http://localhost:3000/admin"
echo ""
echo "📚 Next steps:"
echo "   1. Visit http://localhost:3000/admin"
echo "   2. Create your first admin user"
echo "   3. Start creating personas and projects"
echo ""
echo "📖 For more information, see README.md"
echo ""

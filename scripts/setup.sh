#!/bin/bash
# setup_python.sh - Python Environment Setup for macOS/Linux

echo "🐍 Python Environment Setup for Recommendation Engine"
echo "=================================================="
echo ""
echo "Choose your setup method:"
echo "1) Modern (UV) - Fast, modern Python package manager ⚡"
echo "2) Traditional (pip + venv) - Classic approach 📦"
echo "3) Just install UV alongside existing setup 🔧"
echo ""
read -p "Enter choice (1/2/3): " choice

case $choice in
  1)
    echo ""
    echo "🚀 Setting up with UV (Modern approach)..."
    
    # Check if uv is installed
    if ! command -v uv &> /dev/null; then
        echo "📦 Installing UV..."
        curl -LsSf https://astral.sh/uv/install.sh | sh
        # Add to current session
        export PATH="$HOME/.cargo/bin:$PATH"
        # Source the shell to get uv in PATH
        source ~/.bashrc 2>/dev/null || source ~/.zshrc 2>/dev/null || true
    else
        echo "✅ UV already installed: $(uv --version)"
    fi
    
    # Verify uv is available
    if ! command -v uv &> /dev/null; then
        echo "🔄 Please restart your terminal or run: source ~/.bashrc (or ~/.zshrc)"
        echo "Then run: uv add sentence-transformers torch"
        exit 0
    fi
    
    # Initialize project (without overwriting existing files)
    echo "🔧 Initializing UV project..."
    uv init --no-readme --no-pin-python 2>/dev/null || echo "ℹ️  Project files already exist"
    
    # Add dependencies
    echo "📥 Adding dependencies..."
    uv add sentence-transformers torch
    
    echo ""
    echo "🎉 Modern setup complete!"
    echo ""
    echo "Usage:"
    echo "  uv run python src/core/recommend_similar_products.py data/mocks/washing_machines/data.json 4"
    echo "  uv add package-name  # Add more packages"
    echo "  uv run <command>     # Run any command with dependencies available"
    ;;
    
  2)
    echo ""
    echo "📦 Setting up with traditional pip + venv..."
    
    # Check if Python is installed
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python3 not found. Please install Python3 first."
        echo "   macOS: brew install python"
        echo "   Ubuntu/Debian: sudo apt install python3 python3-pip python3-venv"
        exit 1
    fi
    
    echo "✅ Python3 found: $(python3 --version)"
    
    # Create and activate virtual environment
    echo "🔧 Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    
    # Install dependencies
    echo "📥 Installing dependencies..."
    pip install --upgrade pip
    pip install sentence-transformers torch
    
    # Create requirements.txt
    echo "📄 Creating requirements.txt..."
    pip freeze > requirements.txt
    
    echo ""
    echo "🎉 Traditional setup complete!"
    echo ""
    echo "Usage:"
    echo "  source venv/bin/activate  # Activate environment first"
    echo "  python src/core/recommend_similar_products.py data/mocks/washing_machines/data.json 4"
    echo "  deactivate  # When done working"
    ;;
    
  3)
    echo ""
    echo "🛠  Installing UV alongside existing setup..."
    
    if ! command -v uv &> /dev/null; then
        echo "📦 Installing UV..."
        curl -LsSf https://astral.sh/uv/install.sh | sh
        export PATH="$HOME/.cargo/bin:$PATH"
        source ~/.bashrc 2>/dev/null || source ~/.zshrc 2>/dev/null || true
        
        if command -v uv &> /dev/null; then
            echo "✅ UV installed: $(uv --version)"
        else
            echo "🔄 UV installed but not in PATH. Please restart terminal or run:"
            echo "   source ~/.bashrc (or ~/.zshrc)"
        fi
    else
        echo "✅ UV already installed: $(uv --version)"
    fi
    
    echo ""
    echo "🎉 UV is now available!"
    echo ""
    echo "You can now use UV commands like:"
    echo "  uv pip install package-name  # Drop-in pip replacement"
    echo "  uv add package-name          # Modern dependency management"
    echo "  uv run python script.py      # Run with automatic venv"
    ;;
    
  *)
    echo "❌ Invalid choice. Please run again and select 1, 2, or 3."
    exit 1
    ;;
esac

echo ""
echo "🏁 Setup completed successfully!"
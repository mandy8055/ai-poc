# AI Product Recommendation Engine

An AI-powered product recommendation engine that generates and works with mock product data. The system uses GraphQL for type definitions and includes capabilities for generating mock washing machine data and providing product recommendations.

## Features

- GraphQL schema for product definitions
- Mock data generation for washing machines
- AI-powered product recommendations
- TypeScript support
- Python-based recommendation engine

## Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)
- Python 3.x (for recommendation engine)
- TypeScript

## Project Structure

```
├── src/
│   ├── core/
│   │   └── recommend_similar_products.py   # Python AI recommendation engine
│   ├── data/
│   │   ├── generated/                      # GraphQL generated types
│   │   └── mocks/                          # Mock data generators
│   ├── schemas/
│   │   └── product/                        # GraphQL schema definitions
│   └── mocks/
│       └── washing_machines/               # Generated mock data
├── config/                                 # Configuration files
├── build/                                  # Compiled TypeScript output
├── venv/                                   # Python virtual environment (ignored)
└── scripts/setup.sh                        # Python environment setup script
```

## Getting Started

### Installation

1. Clone the repository

```bash
git clone https://github.com/mandy8055/ai-poc.git
cd ai-poc
```

2. Install dependencies

```bash
pnpm install
```

### Python Environment Setup

Interactive Setup (Recommended)

```bash
chmod +x scripts/setup.sh
.scripts/setup.sh

# Or via npm
pnpm run setup:python
```

The script will guide you through:

- **Modern (UV)** - Fast, modern Python package manager (like pnpm for Python)
- **Traditional (pip + venv)** - Classic approach with virtual environments

### Development Workflow

Follow this sequence for proper setup:

```bash
# 1. Generate GraphQL types (required first)
pnpm run codegen

# 2. Build TypeScript
pnpm run build

# 3. Generate mock data
pnpm run generate:washers

# 4. Test AI recommendations
pnpm run recommend:demo
```

Alternatively, you can run the mock data generation directly after codegen (it includes the build step):

```bash
pnpm run codegen
pnpm run generate:washers  # This will automatically run build first
```

### Available Scripts

#### Core Development

- `pnpm run codegen` - Generate TypeScript types from GraphQL schema
- `pnpm run codegen:watch` - Generate types in watch mode
- `pnpm run build` - Compile TypeScript files
- `pnpm run start` - Start the server

#### Python Environment

- `pnpm run setup:python` - Interactive Python environment setup
- `pnpm run python:activate` - Show activation instructions

#### Mock Data Generation

- `pnpm run generate:washers` - Generate 20 washing machine products

#### AI Recommendations

- `pnpm run recommend:demo` - Run demo with traditional Python setup

## Working with the Project

1. **GraphQL Schema Changes**

   - Modify schemas in `src/schemas/product/`
   - Run `pnpm run codegen` to update TypeScript types

2. **Mock Data Generation**

   - Configuration for mock data is in `src/data/utils/`
   - Generated data will be available in the build directory

3. **Recommendation Engine**
   - Python-based engine in `src/core/`
   - Takes generated mock data as input
   - Provides product recommendations based on similarity

### AI Recommendation Engine

The Python-based engine uses **sentence-transformers** for content-based filtering:

```bash
# Test different products (index 0-19)
python src/core/recommend_similar_products.py data/mocks/washing_machines/data.json 7
```

**How it works:**

1. Loads pre-trained `all-MiniLM-L6-v2` model
2. Creates embeddings from product features (brand, family)
3. Calculates cosine similarity between products
4. Returns top 5 most similar products with similarity scores
5. Analyzes price similarity (±20% threshold)

## Python Dependencies

The recommendation engine requires:

- **sentence-transformers** - Pre-trained transformer models for embeddings
- **torch** - PyTorch framework (automatically installed)

First run downloads the AI model (~100MB), subsequent runs are fast.

## Technology Stack

- **Frontend**: TypeScript, GraphQL
- **Backend**: Node.js
- **AI/ML**: Python, sentence-transformers, PyTorch
- **Package Management**: pnpm (Node.js), UV/pip (Python)
- **Build Tools**: TypeScript Compiler, GraphQL Code Generator

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GraphQL       │    │   TypeScript     │    │   Python ML     │
│   Schema        │───▶│   Mock Data      │───▶│   Recommendation│
│   Definition    │    │   Generation     │    │   Engine        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

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
│   │   └── recommend_similar_products.py   # Python recommendation engine
│   ├── data/
│   │   ├── generated/                      # GraphQL generated types
│   │   └── utils/                          # Data generation utilities
│   ├── mocks/
│   │   └── washing_machines/               # Mock data for washing machines
│   └── schemas/
│       └── product/                        # GraphQL schema definitions
└── build/                                  # Compiled output
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

### Development Workflow

The project requires a specific order of commands to set up and generate data properly:

1. **Generate GraphQL Types** (Required first)

```bash
pnpm run codegen
```

2. **Build the Project**

```bash
pnpm run build
```

3. **Generate Mock Data**

```bash
pnpm run generate:washers
```

Alternatively, you can run the mock data generation directly after codegen (it includes the build step):

```bash
pnpm run codegen
pnpm run generate:washers  # This will automatically run build first
```

### Available Scripts

- `pnpm run codegen`: Generate TypeScript types from GraphQL schema
- `pnpm run codegen:watch`: Generate types in watch mode
- `pnpm run build`: Compile TypeScript files
- `pnpm run generate:washers`: Generate mock data for washing machines
- `pnpm run test:washing`: Test the recommendation engine with sample data

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

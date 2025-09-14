import type { CodegenConfig } from '@graphql-codegen/cli'; // Good practice for TypeScript config

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/schemas/product/*.graphql',
  generates: {
    'src/data/generated/graphql.ts': {
      // This is the output file path
      plugins: [
        'typescript', // Plugin 1
        'typescript-operations', // Plugin 2
      ],
      config: {
        // <--- THIS `config` OBJECT SHOULD BE HERE, inside the "src/generated/graphql.ts" configuration
        enumsAsTypes: true,
        skipTypename: true,
      },
    },
    // If you had another output file, its config would be here:
    // "another-file.ts": {
    //   plugins: ["some-other-plugin"],
    //   config: { /* ... */ }
    // }
  },
};

export default config;

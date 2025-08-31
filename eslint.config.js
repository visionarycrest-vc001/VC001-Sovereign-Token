// 📝 ESLint Configuration - VC001 Sovereign Archive
// Modern ESLint 9.x configuration for comprehensive JavaScript/TypeScript linting

import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        
        // Browser globals (for apps/viewer files)
        document: 'readonly',
        window: 'readonly',
        fetch: 'readonly',
        marked: 'readonly', // Third-party library
      },
    },
    rules: {
      // 🔧 Code Quality Rules
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      'no-console': 'off', // Allow console for this project
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-redeclare': 'error',
      
      // 🎨 Code Style Rules  
      'indent': ['error', 2],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'only-multiline'],
      
      // 🔒 Security Rules
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      
      // 🧹 Best Practices
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
    },
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.git/**',
      '*.min.js',
      'build/**',
      'docs-generated/**',
    ],
  },
  {
    // 🧪 Specific rules for test files
    files: ['**/*.test.js', '**/*.spec.js', '**/test/**/*.js'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
];
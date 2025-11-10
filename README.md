# bitcubeqa

## Project Overview

This project contains automated tests for the Factorial Calculator application at `https://qainterview.pythonanywhere.com/`. The test suite validates:

- Factorial calculations for various inputs (positive, zero, negative, large integers)
- HTTP response handling and JSON response validation
- Website navigation links (About, Terms and Conditions, Privacy)
- Content validation for navigation pages

## Test Suite

### Factorial Calculation Tests

- **Calculate factorial of 6** - Tests basic factorial calculation
- **Calculate factorial of 56** - Tests factorial with larger numbers
- **Calculate factorial of 0** - Tests edge case (0! = 1)
- **Calculate factorial of 258** - Tests factorial with large positive integers
- **Calculate factorial of big int 344444444446** - Tests with very large integers
- **Calculate factorial of negative int -17** - Tests negative integer handling and HTTP response validation

### Navigation Tests

- **Navigation to About page** - Verifies About page is filled with content (more than 1 line)
- **Navigation to Terms and Conditions** - Verifies Terms and Conditions page is covered with content
- **Navigation to Privacy page** - Verifies Privacy page is covered with content

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/talenttinaapi/bitcubeqa>
cd bitcubeqa
```

2. Install dependencies:

```bash
npm install
```

This will install Playwright and all required dependencies listed in `package.json`.

## Running the Tests

### Run all tests in the factorial test suite using Bash:

```bash
npx playwright test tests/factorial.spec.ts
```

Or simply:

```bash
npx playwright test factorial.spec.ts
```

### Run tests with specific options:

Run tests in headed mode (show browser window):

```bash
npx playwright test factorial.spec.ts --headed
```

Run tests with a specific browser (chromium, firefox, webkit):

```bash
npx playwright test factorial.spec.ts --project=chromium
```

Run a specific test by name:

```bash
npx playwright test -g "Calculate factorial of 6" factorial.spec.ts
```

Run tests in debug mode:

```bash
npx playwright test factorial.spec.ts --debug
```

### View test report:

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Test Configuration

Tests are configured in `playwright.config.ts`. Key configurations:

- **Test timeout**: 30 seconds per test
- **Browsers**: Chromium, Firefox, WebKit
- **Retry**: Failed tests are retried once
- **Screenshot on failure**: Automatically captured
- **Video on failure**: Recorded for debugging

## Project Structure

```
bitcubeqa/
├── tests/
│   ├── factorial.spec.ts
│   └── example.spec.ts       
├── playwright.config.ts       
├── package.json             
├── README.md                
└── LICENSE                   
```

## Notes

- Tests are independent and can run in any order

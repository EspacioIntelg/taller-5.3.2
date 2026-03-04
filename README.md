# Playwright POM — AutomationTestStore

Quick scaffold to run the "Happy Path": register a new user and login.

Setup

```bash
npm install
npm i -D @playwright/test
npx playwright install
```

Run tests

```bash
npm test
# or run single test
npx playwright test tests/registration.spec.ts
```

Open report

```bash
npm run test:report
```

Files of interest:

- [playwright.config.ts](playwright.config.ts)
- [tests/registration.spec.ts](tests/registration.spec.ts)
- [pages/HomePage.ts](pages/HomePage.ts)
- [pages/AuthPage.ts](pages/AuthPage.ts)
- [pages/HeaderComponent.ts](pages/HeaderComponent.ts)
- [utils/testData.ts](utils/testData.ts)

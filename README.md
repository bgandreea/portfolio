# Quality Assurance Portfolio

A responsive GitHub Pages portfolio for a Quality Assurance Engineer. It includes:

- a professional introduction and skills section;
- a complete test case example;
- a practical regression test plan example;
- a Python automation example using pytest and Selenium;
- live cards for public GitHub repositories;
- responsive navigation, repository filtering, accessibility basics, and reduced motion support;
- automated deployment through GitHub Actions.

## 1. Personalize the site

Edit `src/config.ts`:

```ts
export const portfolioConfig = {
  name: "Andreea",
  role: "Quality Assurance Engineer",
  siteUrl: "https://YOUR_GITHUB_USERNAME.github.io/portfolio",
  githubUsername: "YOUR_GITHUB_USERNAME",
  linkedInUrl: "https://www.linkedin.com/in/YOUR_LINKEDIN_SLUG",
  headline: "Test planning, automation, and release support.",
  metaDescription: "Short summary used for search and social previews.",
  contactMessage: "I am available to discuss quality assurance opportunities.",
  focus: "UI and API testing",
  approach: "Risk-based testing",
  about: [
    "First paragraph for the About section.",
    "Second paragraph for the About section."
  ],
  // ...
};
```

At minimum, replace:

- `YOUR_GITHUB_USERNAME`
- `YOUR_LINKEDIN_SLUG`
- `siteUrl` with your published GitHub Pages URL

The repository section calls the public GitHub API in the browser. GitHub applies rate limits to requests that are not authenticated.

Page title, description, Open Graph tags, and the social preview image are generated from `src/config.ts` at build time.

## 2. Run the portfolio locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## 3. Verify the production build

```bash
npm run typecheck
npm run build
npm run preview
```

## 4. Python automation example

The automation sample displayed on the website is also available as a Python file:

- [`automation/test_sign_in.py`](automation/test_sign_in.py)
- [`automation/requirements.txt`](automation/requirements.txt)

The selectors and URLs are examples. Update them to match the application you are testing.

On Windows PowerShell, create an environment and install the dependencies without activating the environment:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r automation\requirements.txt
```

Set the test environment values:

```powershell
$env:BASE_URL = "https://your-test-environment.example"
$env:E2E_EMAIL = "qa.user@example.com"
$env:E2E_PASSWORD = "your-test-password"
```

Run the sample:

```powershell
.\.venv\Scripts\python.exe -m pytest automation\test_sign_in.py -v
```

Do not commit real credentials. Use test accounts and environment variables.

## 5. Publish with GitHub Pages

1. Create a new GitHub repository.
2. Push these files to its `master` branch.
3. Open **Settings > Pages** in the repository.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Push a commit or manually run the **Deploy portfolio to GitHub Pages** workflow.

The workflow builds the site and publishes the `dist` directory.

## Test documentation

Standalone Markdown copies are available here:

- [`docs/test-case.md`](docs/test-case.md)
- [`docs/test-plan.md`](docs/test-plan.md)

Edit both the Markdown files and `src/content.ts` when replacing the examples with your own work.

## Main customization files

- Personal details and skills: `src/config.ts`
- Test examples: `src/content.ts`
- Page structure and behavior: `src/main.ts`
- Visual design: `src/styles.css`
- Social preview image and metadata: generated at build time from `src/config.ts`
- Typecheck CI: `.github/workflows/ci.yml`
- Deployment: `.github/workflows/deploy.yml`

## Privacy note

Do not commit real passwords, production credentials, private URLs, client data, or confidential defect evidence. Use sanitized test data and environment variables for secrets.

## License

MIT

export const portfolioConfig = {
  name: "Andreea Georgiana Baboi",
  role: "Quality Assurance Engineer - Manual and Automation",
  // Public GitHub Pages URL without a trailing slash (update if your Pages URL differs).
  siteUrl: "https://bgandreea.github.io/portfolio" as string,
  githubUsername: "bgandreea" as string,
  headline: "Test planning, automation, and release support.",
  intro:
    "I create and maintain automated tests, investigate defects, and support reliable software releases.",
  availability: "Open to Quality Assurance (manual and/or automation) and SDET opportunities",
  location: "Denmark",
  focus: "UI and API testing",
  approach: "Risk-based testing",
  linkedInUrl: "https://www.linkedin.com/in/andreea-baboi",
  metaDescription:
    "Quality Assurance Engineer portfolio featuring test planning, automation samples, and public GitHub repositories.",
  contactMessage:
    "I am available to discuss quality assurance, software testing, and related opportunities.",
  about: [
    "I am a Quality Assurance Engineer focused on manual testing, test planning, defect investigation, automated test writing and automated checks.",
    "I value maintainable tests, clear reporting, and practical coverage of the areas that matter most to users and the business."
  ],
  showForkedRepositories: false,
  repositoryLimit: 8,
  skills: [
    "Python",
    "Selenium",
    "Pytest",
    "API Testing",
    "UI Testing",
    "Test Planning",
    "Regression Testing",
    "Exploratory Testing",
    "CI/CD",
    "GitHub Actions"
  ]
} as const;

export const pageTitle = `${portfolioConfig.name} | ${portfolioConfig.role}`;

export const ogImageUrl = `${portfolioConfig.siteUrl.replace(/\/$/, "")}/og-image.svg`;

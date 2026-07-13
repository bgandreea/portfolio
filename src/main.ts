import "./styles.css";
import { pageTitle, portfolioConfig } from "./config";
import { automationSnippet, testCase, testPlan } from "./content";

type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  homepage: string | null;
  topics?: string[];
};

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root was not found.");
}

document.title = pageTitle;

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      })[character] ?? character
  );

const icon = (name: "arrow" | "github" | "link" | "star" | "fork" | "check") => {
  const icons = {
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.84a9.6 9.6 0 0 1 2.5.34c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07.07l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15M14 11a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 20l1.15-1.15"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.8 2.75 5.57 6.15.9-4.45 4.33 1.05 6.12L12 16.83l-5.5 2.89 1.05-6.12L3.1 9.27l6.15-.9L12 2.8Z"/></svg>',
    fork: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v2c0 2 1.5 3 3 3h6c1.5 0 3-1 3-3V7M12 12v5"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'
  };

  return icons[name];
};

const renderList = (items: readonly string[]) =>
  `<ul class="check-list">${items
    .map((item) => `<li>${icon("check")}<span>${escapeHtml(item)}</span></li>`)
    .join("")}</ul>`;

const isPlaceholderUsername = portfolioConfig.githubUsername === "YOUR_GITHUB_USERNAME";
const githubProfileUrl = isPlaceholderUsername
  ? "https://github.com/"
  : `https://github.com/${portfolioConfig.githubUsername}`;

app.innerHTML = `
  <header class="site-header" id="top">
    <a class="brand" href="#top" aria-label="Back to top">
      <span class="brand-mark">QA</span>
      <span>${escapeHtml(portfolioConfig.name)}</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span><span class="sr-only">Toggle navigation</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
      <a href="#about">About</a>
      <a href="#artifacts">Test artifacts</a>
      <a href="#repositories">Repositories</a>
      <a class="nav-cta" href="#contact">Contact</a>
    </nav>
  </header>

  <main id="main-content">
    <section class="hero section-shell" aria-labelledby="hero-title">
      <div class="hero-copy reveal">
        <p class="eyebrow"><span class="status-dot"></span>${escapeHtml(portfolioConfig.availability)}</p>
        <h1 id="hero-title"><span>${escapeHtml(portfolioConfig.headline)}</span></h1>
        <p class="hero-role">${escapeHtml(portfolioConfig.role)}</p>
        <p class="hero-intro">${escapeHtml(portfolioConfig.intro)}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#artifacts">Explore my work ${icon("arrow")}</a>
          <a class="button button-ghost" href="${githubProfileUrl}" target="_blank" rel="noreferrer">${icon("github")} GitHub profile</a>
        </div>
        <dl class="hero-facts">
          <div><dt>Focus</dt><dd>${escapeHtml(portfolioConfig.focus)}</dd></div>
          <div><dt>Based in</dt><dd>${escapeHtml(portfolioConfig.location)}</dd></div>
          <div><dt>Approach</dt><dd>${escapeHtml(portfolioConfig.approach)}</dd></div>
        </dl>
      </div>
      <div class="hero-visual reveal" aria-label="Stylized quality engineering dashboard">
        <div class="signal-card signal-card-primary">
          <div class="window-bar"><span></span><span></span><span></span></div>
          <div class="code-lines" aria-hidden="true">
            <span class="line line-wide"></span>
            <span class="line line-mid"></span>
            <span class="line line-short"></span>
            <span class="line line-wide"></span>
          </div>
          <div class="run-summary">
            <div class="run-score">98<span>%</span></div>
            <div><strong>Smoke test pass rate</strong><small>Example execution summary</small></div>
          </div>
        </div>
        <div class="signal-card signal-card-small signal-pass">
          <span class="signal-icon">✓</span><div><strong>42 passed</strong><small>Smoke suite</small></div>
        </div>
        <div class="signal-card signal-card-small signal-risk">
          <span class="signal-icon">!</span><div><strong>1 risk</strong><small>Under review</small></div>
        </div>
        <div class="grid-glow"></div>
      </div>
    </section>

    <section class="section-shell about" id="about" aria-labelledby="about-title">
      <div class="section-heading reveal">
        <p class="section-kicker">01 / About</p>
        <h2 id="about-title">About me</h2>
      </div>
      <div class="about-grid reveal">
        <div class="about-copy">
          ${portfolioConfig.about.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </div>
        <div class="skills" aria-label="Technical skills">
          ${portfolioConfig.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}
        </div>
      </div>
    </section>

    <section class="artifacts-section" id="artifacts" aria-labelledby="artifacts-title">
      <div class="section-shell">
        <div class="section-heading reveal">
          <p class="section-kicker">02 / Test artifacts</p>
          <h2 id="artifacts-title">Test documentation samples</h2>
          <p>Examples of a test case, a regression test plan, and an automated UI test.</p>
        </div>

        <article class="artifact-card reveal">
          <div class="artifact-header">
            <div>
              <p class="artifact-type">Test case | ${escapeHtml(testCase.id)}</p>
              <h3>${escapeHtml(testCase.title)}</h3>
            </div>
            <div class="artifact-badges"><span>${escapeHtml(testCase.priority)}</span><span>${escapeHtml(testCase.type)}</span></div>
          </div>
          <div class="artifact-meta">
            <div><span>Feature</span><strong>${escapeHtml(testCase.feature)}</strong></div>
            <div><span>Test data</span><strong>${escapeHtml(testCase.data.email)}</strong></div>
          </div>
          <div class="artifact-columns">
            <div>
              <h4>Preconditions</h4>
              ${renderList(testCase.preconditions)}
            </div>
            <div>
              <h4>Coverage notes</h4>
              <p>${escapeHtml(testCase.notes)}</p>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Action</th><th>Expected result</th></tr></thead>
              <tbody>
                ${testCase.steps
                  .map(
                    ({ step, action, expected }) =>
                      `<tr><td>${step}</td><td>${escapeHtml(action)}</td><td>${escapeHtml(expected)}</td></tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </article>

        <article class="artifact-card reveal">
          <div class="artifact-header">
            <div>
              <p class="artifact-type">Test plan | Version ${escapeHtml(testPlan.version)}</p>
              <h3>${escapeHtml(testPlan.title)}</h3>
            </div>
            <div class="artifact-badges"><span>Risk-based</span><span>Regression</span></div>
          </div>
          <p class="artifact-objective">${escapeHtml(testPlan.objective)}</p>
          <div class="plan-grid">
            <div class="plan-panel"><h4>In scope</h4>${renderList(testPlan.scope.included)}</div>
            <div class="plan-panel"><h4>Strategy</h4>${renderList(testPlan.strategy)}</div>
            <div class="plan-panel"><h4>Entry criteria</h4>${renderList(testPlan.entryCriteria)}</div>
            <div class="plan-panel"><h4>Exit criteria</h4>${renderList(testPlan.exitCriteria)}</div>
          </div>
          <details class="artifact-details">
            <summary>Risks, exclusions, and deliverables <span>+</span></summary>
            <div class="details-grid">
              <div><h4>Risks &amp; mitigations</h4>${renderList(testPlan.risks)}</div>
              <div><h4>Out of scope</h4>${renderList(testPlan.scope.excluded)}</div>
              <div><h4>Deliverables</h4>${renderList(testPlan.deliverables)}</div>
            </div>
          </details>
        </article>

        <article class="automation-card reveal" aria-labelledby="automation-title">
          <div>
            <p class="artifact-type">Automation sample</p>
            <h3 id="automation-title">Python UI test with pytest and Selenium</h3>
            <p>This example uses explicit waits, environment variables for credentials, and checks for the final URL and page heading.</p>
          </div>
          <div class="code-card">
            <div class="code-card-header"><span>test_sign_in.py</span><button id="copy-code" type="button">Copy</button></div>
            <pre><code>${escapeHtml(automationSnippet)}</code></pre>
          </div>
        </article>
      </div>
    </section>

    <section class="section-shell repositories-section" id="repositories" aria-labelledby="repositories-title">
      <div class="section-heading repository-heading reveal">
        <div>
          <p class="section-kicker">03 / Public work</p>
          <h2 id="repositories-title">Repositories</h2>
          <p>Public projects loaded from my GitHub profile.</p>
        </div>
        <label class="repo-search">
          <span class="sr-only">Filter repositories</span>
          <input id="repo-filter" type="search" placeholder="Filter projects..." autocomplete="off" />
        </label>
      </div>
      <div id="repo-status" class="repo-status" role="status">Loading repositories...</div>
      <div id="repo-grid" class="repo-grid" aria-live="polite"></div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div class="section-shell contact-inner reveal">
        <p class="section-kicker">04 / Contact</p>
        <h2 id="contact-title">Contact</h2>
        <p>${escapeHtml(portfolioConfig.contactMessage)}</p>
        <div class="contact-actions">
          <a class="button button-light" href="${escapeHtml(portfolioConfig.linkedInUrl)}" target="_blank" rel="noreferrer">Contact me on LinkedIn ${icon("link")}</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer section-shell">
    <p>Built with TypeScript and Vite. The automation example uses Python, pytest, and Selenium.</p>
    <a href="#top">Back to top ↑</a>
  </footer>
`;

const navToggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
const nav = document.querySelector<HTMLElement>("#site-nav");

navToggle?.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  nav?.classList.toggle("is-open", !isExpanded);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  });
});

const copyButton = document.querySelector<HTMLButtonElement>("#copy-code");
copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(automationSnippet);
    copyButton.textContent = "Copied";
    window.setTimeout(() => (copyButton.textContent = "Copy"), 1500);
  } catch {
    copyButton.textContent = "Select code";
  }
});

const repoGrid = document.querySelector<HTMLDivElement>("#repo-grid");
const repoStatus = document.querySelector<HTMLDivElement>("#repo-status");
const repoFilter = document.querySelector<HTMLInputElement>("#repo-filter");
let repositories: GitHubRepository[] = [];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(date));

const renderRepositories = (items: GitHubRepository[]) => {
  if (!repoGrid || !repoStatus) return;

  if (items.length === 0) {
    repoGrid.innerHTML = "";
    repoStatus.textContent = "No repositories match that filter.";
    repoStatus.hidden = false;
    return;
  }

  repoStatus.hidden = true;
  repoGrid.innerHTML = items
    .map(
      (repo) => `
        <article class="repo-card">
          <div class="repo-card-top">
            <div class="repo-icon">${icon("github")}</div>
            <div class="repo-links">
              ${repo.homepage ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(repo.name)} live demo">${icon("link")}</a>` : ""}
              <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(repo.name)} on GitHub">${icon("arrow")}</a>
            </div>
          </div>
          <h3><a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">${escapeHtml(repo.name)}</a></h3>
          <p>${escapeHtml(repo.description ?? "A public repository from my GitHub profile.")}</p>
          <div class="repo-topics">
            ${(repo.topics ?? []).slice(0, 3).map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}
          </div>
          <div class="repo-footer">
            <span>${repo.language ? `<i></i>${escapeHtml(repo.language)}` : "Repository"}</span>
            <span>${icon("star")} ${repo.stargazers_count}</span>
            <span>${icon("fork")} ${repo.forks_count}</span>
            <span>Updated ${formatDate(repo.pushed_at)}</span>
          </div>
        </article>`
    )
    .join("");
};

const showConfigurationPrompt = () => {
  if (!repoStatus || !repoGrid) return;
  repoStatus.hidden = true;
  repoGrid.innerHTML = `
    <article class="repo-config-card">
      <div class="repo-icon">${icon("github")}</div>
      <h3>Connect your GitHub repositories</h3>
      <p>Open <code>src/config.ts</code> and replace <code>YOUR_GITHUB_USERNAME</code> with your GitHub username. The cards will populate automatically.</p>
      <a class="button button-primary" href="https://github.com/" target="_blank" rel="noreferrer">Open GitHub ${icon("arrow")}</a>
    </article>`;
};

const loadRepositoryTopics = async (repo: GitHubRepository): Promise<string[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(portfolioConfig.githubUsername)}/${encodeURIComponent(repo.name)}/topics`,
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!response.ok) {
      return repo.topics ?? [];
    }

    const data = (await response.json()) as { names?: string[] };
    return data.names ?? [];
  } catch {
    return repo.topics ?? [];
  }
};

const enrichRepositoriesWithTopics = async (repos: GitHubRepository[]) =>
  Promise.all(
    repos.map(async (repo) => ({
      ...repo,
      topics: await loadRepositoryTopics(repo)
    }))
  );

const loadRepositories = async () => {
  if (isPlaceholderUsername) {
    showConfigurationPrompt();
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(portfolioConfig.githubUsername)}/repos?per_page=100&sort=pushed`,
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    const data = (await response.json()) as GitHubRepository[];
    const selected = data
      .filter((repo) => !repo.archived)
      .filter((repo) => portfolioConfig.showForkedRepositories || !repo.fork)
      .sort((a, b) => {
        const scoreDifference = b.stargazers_count - a.stargazers_count;
        return scoreDifference || new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
      })
      .slice(0, portfolioConfig.repositoryLimit);

    repositories = await enrichRepositoriesWithTopics(selected);

    renderRepositories(repositories);
  } catch (error) {
    if (!repoStatus) return;
    repoStatus.hidden = false;
    repoStatus.innerHTML = `Repositories could not be loaded right now. <a href="${githubProfileUrl}" target="_blank" rel="noreferrer">View them directly on GitHub</a>.`;
    console.error(error);
  }
};

repoFilter?.addEventListener("input", () => {
  const query = repoFilter.value.trim().toLowerCase();
  const filtered = repositories.filter((repo) =>
    [repo.name, repo.description ?? "", repo.language ?? "", ...(repo.topics ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );
  renderRepositories(filtered);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

void loadRepositories();

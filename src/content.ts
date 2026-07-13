export type TestStep = {
  step: string;
  action: string;
  expected: string;
};

export const testCase = {
  id: "TC-AUTH-001",
  title: "Sign in with valid credentials",
  feature: "Authentication",
  priority: "High",
  type: "Functional / Positive",
  preconditions: [
    "A verified user account exists.",
    "The user is signed out.",
    "The authentication service is available."
  ],
  data: {
    email: "qa.user@example.com",
    password: "Valid password stored securely"
  },
  steps: [
    {
      step: "1",
      action: "Open the sign-in page.",
      expected: "The sign-in form is visible and interactive."
    },
    {
      step: "2",
      action: "Enter a registered email address.",
      expected: "The email is accepted with no validation error."
    },
    {
      step: "3",
      action: "Enter the matching password.",
      expected: "The password is masked and accepted."
    },
    {
      step: "4",
      action: "Select Sign in.",
      expected: "The user is authenticated and redirected to the dashboard."
    },
    {
      step: "5",
      action: "Refresh the dashboard.",
      expected: "The authenticated session remains active."
    }
  ] satisfies TestStep[],
  notes:
    "Check the network response, session cookie settings, redirect target, loading state, and application logs for sensitive data."
};

export const testPlan = {
  title: "E-commerce checkout regression",
  version: "1.0",
  owner: "QA Engineering",
  objective:
    "Verify that customers can complete checkout across supported browsers, payment paths, and delivery options before release.",
  scope: {
    included: [
      "Cart totals, discounts, tax, and shipping calculations",
      "Guest and authenticated checkout",
      "Card payment success, decline, and retry flows",
      "Address validation and delivery method selection",
      "Order confirmation, email notification, and order history",
      "Critical accessibility and responsive layout checks"
    ],
    excluded: [
      "Payment provider infrastructure beyond contract validation",
      "Warehouse fulfilment after order creation",
      "Full performance and penetration testing"
    ]
  },
  strategy: [
    "Risk-based manual regression for critical customer journeys",
    "Automated UI smoke tests using Python, pytest, and Selenium",
    "API checks for pricing, inventory, payment, and order services",
    "Cross-browser coverage for Chrome, Firefox, and Edge",
    "Exploratory testing around promotions and failure recovery"
  ],
  entryCriteria: [
    "The release candidate is deployed to the test environment.",
    "Required services and test payment accounts are available.",
    "Blocking unit and integration test failures are resolved."
  ],
  exitCriteria: [
    "All critical path tests pass.",
    "No open blocker or critical defects remain.",
    "High severity risks are accepted by product and engineering.",
    "The automated test report and execution summary are attached to the release."
  ],
  risks: [
    "Third-party payment instability: use stubs for repeatable checks and retain a small live provider suite.",
    "Shared test data collisions: generate unique users and orders for each run.",
    "Environment drift: validate configuration and service versions before execution."
  ],
  deliverables: [
    "Execution report and defect summary",
    "Automated run artifacts, including logs, screenshots, and reports",
    "Release recommendation with remaining risks"
  ]
};

export const automationSnippet = `import os

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


@pytest.fixture
def driver():
    browser = webdriver.Chrome()
    browser.set_window_size(1440, 900)
    yield browser
    browser.quit()


def test_registered_user_can_sign_in(driver):
    base_url = os.getenv("BASE_URL")
    email = os.getenv("E2E_EMAIL")
    password = os.getenv("E2E_PASSWORD")

    if not all([base_url, email, password]):
        pytest.skip("Set BASE_URL, E2E_EMAIL, and E2E_PASSWORD to run this test.")

    wait = WebDriverWait(driver, 10)
    driver.get(base_url.rstrip("/") + "/login")

    wait.until(EC.visibility_of_element_located((By.ID, "email"))).send_keys(email)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    wait.until(EC.url_matches(r".*/dashboard/?$"))
    heading = wait.until(EC.visibility_of_element_located((By.TAG_NAME, "h1")))

    assert "Welcome" in heading.text`;

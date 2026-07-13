import os

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

    assert "Welcome" in heading.text

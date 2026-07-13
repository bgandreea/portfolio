# Test Case: Sign in with valid credentials

| Field | Value |
|---|---|
| ID | TC-AUTH-001 |
| Feature | Authentication |
| Priority | High |
| Type | Functional / Positive |

## Preconditions

- A verified user account exists.
- The user is signed out.
- The authentication service is available.

## Test data

- Email: `qa.user@example.com`
- Password: a valid password stored securely outside source control

## Steps

| # | Action | Expected result |
|---:|---|---|
| 1 | Open the sign-in page. | The sign-in form is visible and interactive. |
| 2 | Enter a registered email address. | The email is accepted with no validation error. |
| 3 | Enter the matching password. | The password is masked and accepted. |
| 4 | Select **Sign in**. | The user is authenticated and redirected to the dashboard. |
| 5 | Refresh the dashboard. | The authenticated session remains active. |

## Additional checks

Check the network response, session cookie settings, redirect target, loading state, and application logs for sensitive data.

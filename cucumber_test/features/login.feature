Feature: Login go the page

Scenario: First steps to login to the page
    When I go to the page
    Then verify the objects exist
    Then create a new user
    Then Verify User created
    Then Delete User
    When Verify User Deleted
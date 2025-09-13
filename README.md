# Salesforce API Testing with Cypress

This project demonstrates best practices for testing Salesforce APIs using Cypress with proper file organization and custom commands.

## Project Structure

```
cypress/
├── e2e/
│   └── salesforce/
│       └── transaction-management.cy.js    # Main test file
├── fixtures/
│   ├── example.json
│   └── transactionData.json               # Test data for transactions
└── support/
    ├── commands.js                        # Custom Cypress commands
    └── e2e.js                            # Support file imports
```

## Custom Commands

### `cy.authenticateWithSalesforce()`
- Handles OAuth2 client credentials authentication
- Uses `cy.session()` for efficient token caching
- Validates session before each test

### `cy.createSalesforceTransaction(transactionData)`
- Creates a new Transaction__c record in Salesforce
- Accepts transaction data object as parameter
- Returns response with created record ID

### `cy.getSalesforceTransaction(recordId)`
- Retrieves a Transaction__c record by ID
- Returns complete record data

## Test Data

Transaction data is stored in `cypress/fixtures/transactionData.json` for easy maintenance and reusability.

## Environment Variables

Configure your Salesforce credentials in `cypress.env.json`:

```json
{
  "salesforceClientSecret": "your_client_secret",
  "salesforceClientId": "your_client_id",
  "salesforceGrantType": "client_credentials",
  "salesforceUrl": "https://your-instance.salesforce.com/services/oauth2/token",
  "salesforceApiUrl": "https://your-instance.salesforce.com/services/data/v58.0"
}
```

## Running Tests

```bash
# Run all tests
npm test

# Open Cypress Test Runner
npm run cypress:open

# Run specific test file
npx cypress run --spec "cypress/e2e/salesforce/transaction-management.cy.js"
```

## Best Practices Implemented

1. **Separation of Concerns**: Authentication logic separated into custom commands
2. **Reusable Commands**: Common operations abstracted into reusable functions
3. **Test Data Management**: Externalized test data into fixtures
4. **Session Management**: Efficient authentication using `cy.session()`
5. **Proper File Organization**: Logical directory structure for scalability
6. **Documentation**: JSDoc comments for all custom commands
7. **Error Handling**: Proper assertions and error checking

## Test Coverage

- ✅ Salesforce authentication with session caching
- ✅ Transaction creation (POST)
- ✅ Transaction retrieval (GET by ID)
- ✅ Transaction querying (SOQL with filters)
- ✅ Data validation and integrity checks

// ***********************************************
// Salesforce API Custom Commands
// ***********************************************

/**
 * Authenticate with Salesforce and cache the session
 * This command handles OAuth2 client credentials flow
 */
Cypress.Commands.add('authenticateWithSalesforce', () => {
    cy.session('salesforce-auth', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('salesforceUrl')}`,
            body: {
                grant_type: `${Cypress.env('salesforceGrantType')}`,
                client_id: `${Cypress.env('salesforceClientId')}`,
                client_secret: `${Cypress.env('salesforceClientSecret')}`,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            const accessToken = response.body.access_token;
            // Store the token in Cypress.env for use in tests
            Cypress.env('accessToken', accessToken);
            // Return the token for session validation
            return accessToken;
        });
    }, {
        validate() {
            // Validate that the session is still valid
            cy.request({
                method: 'GET',
                url: `${Cypress.env('salesforceApiUrl')}/sobjects/`,
                headers: {
                    Authorization: `Bearer ${Cypress.env('accessToken')}`,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        }
    });
});

/**
 * Create a new Transaction__c record in Salesforce
 * @param {Object} transactionData - The transaction data to create
 * @returns {Cypress.Chainable} - Returns the response with created record ID
 */
Cypress.Commands.add('createSalesforceTransaction', (transactionData) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('salesforceApiUrl')}/sobjects/Transaction__c`,
        headers: {
            Authorization: `Bearer ${Cypress.env('accessToken')}`,
            'Content-Type': 'application/json',
        },
        body: transactionData
    });
});

/**
 * Get a Transaction__c record from Salesforce by ID
 * @param {string} recordId - The Salesforce record ID
 * @returns {Cypress.Chainable} - Returns the response with record data
 */
Cypress.Commands.add('getSalesforceTransaction', (recordId) => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('salesforceApiUrl')}/sobjects/Transaction__c/${recordId}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('accessToken')}`,
        },
    });
});

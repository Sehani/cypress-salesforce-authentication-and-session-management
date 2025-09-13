describe('Salesforce Transaction Management', () => {
    let transactionData;
    let createdTransactionId;

    before(() => {
        // Load test data from fixtures
        cy.fixture('transactionData').then((data) => {
            transactionData = data.transactionData;
        });
    });

    beforeEach(() => {
        // Authenticate with Salesforce using custom command
        cy.authenticateWithSalesforce();
    });

    it('Should authenticate with Salesforce successfully', () => {
        // Verify authentication token is available
        cy.wrap(Cypress.env('accessToken')).should('exist');
        cy.wrap(Cypress.env('accessToken')).should('be.a', 'string');
    });

    it('Should create a new transaction in Salesforce', () => {
        cy.createSalesforceTransaction(transactionData).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('success', true);
            
            // Store the created record ID for the next test
            createdTransactionId = response.body.id;
            Cypress.env('createdTransactionId', createdTransactionId);
        });
    });

    it('Should retrieve the created transaction from Salesforce', () => {
        // Use the transaction ID from the previous test
        const transactionId = Cypress.env('createdTransactionId');
        expect(transactionId).to.exist;

        cy.getSalesforceTransaction(transactionId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('Id', transactionId);
            expect(response.body).to.have.property('transaction_id__c', transactionData.transaction_id__c);
            expect(response.body).to.have.property('status__c', transactionData.status__c);
            expect(response.body).to.have.property('amount__c', transactionData.amount__c);
            expect(response.body).to.have.property('merchantId__c', transactionData.merchantId__c);
            expect(response.body).to.have.property('transactionType__c', transactionData.transactionType__c);
            expect(response.body).to.have.property('metaData__c', transactionData.metaData__c);
            expect(response.body).to.have.property('fee__c', transactionData.fee__c);
            expect(response.body).to.have.property('device_id__c', transactionData.device_id__c);
            expect(response.body).to.have.property('transaction_date_time__c', 2025);
        });
    });

});
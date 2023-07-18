export class Payment {

    constructor() {
        this.nameOnCard = '[data-qa="name-on-card"]';
        this.cardNumber = '[data-qa="card-number"]';
        this.cvc = '[data-qa="cvc"]';
        this.expiryMonth = '[data-qa="expiry-month"]';
        this.ExpiryYear = '[data-qa="expiry-year"]';
        this.payBtn = '[data-qa="pay-button"]';
    }

    enterNameOnCard(cardholder) {
        cy.get(this.nameOnCard)
            .clear()
            .type(cardholder)
    }
    enterCardNumber(cardnumber) {
        cy.get(this.cardNumber)
            .clear()
            .type(cardnumber)
    }
    enterCVC(cvc) {
        cy.get(this.cvc)
            .clear()
            .type(cvc)
    }
    enterExpiryMonth() {
        cy.get(this.expiryMonth)
            .clear()
            .type('02')
    }
    enterExpiryYear() {
        cy.get(this.ExpiryYear)
            .clear()
            .type('2024')
    }
    clickPayAndConfirm() {
        cy.get(this.payBtn)
            .should('contain', 'Pay and Confirm Order')
            .click()
    }
    verifyOrderPlacedSuccessfully() {
        cy.contains('Order Placed!')
        cy.url().should('contain', '/payment_done')
    }
    downloadAndVerifyInvoice(){
        cy.window().document().then(function (doc) {
            doc.addEventListener('click', () => {
              setTimeout(function () { doc.location.reload() }, 5000)
            })
            cy.get('.col-sm-9 > .btn-default').should('contain', 'Download Invoice').click()
            cy.verifyDownload('invoice.txt');
          })
    }
}
export class Checkout {

    constructor() {
        this.orderComments = '.form-control';
        this.placeorderBtn = ':nth-child(7) > .btn';
    }
    inputOrderComments(comments) {
        cy.get(this.orderComments)
            .clear()
            .type(comments)

    }

    clickPlaceOrderBtn() {
        cy.get(this.placeorderBtn)
            .should('contain', 'Place Order')
            .click()
    }

    clickPlaceOrderBtn() {
        cy.get(this.placeorderBtn)
            .should('contain', 'Place Order')
            .click()
    }
    verifyCheckoutScreen(){
        cy.url()
        .should('contain','/checkout')
    }
}
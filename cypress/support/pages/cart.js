export class Cart {

    constructor() {
        this.proceedToCheckoutSelector = '.col-sm-6 > .btn';
        this.cartQuantityDelete = '.cart_quantity_delete';
        this.MenTshirt = '#product-2 > .cart_description > h4 > a';
        this.MadameTopForWomen = '#product-7 > .cart_description > h4 > a';
        this.LaceTopForWomen = '#product-42 > .cart_description > h4 > a';
        this.GRAPHICDESIGNMENTSHIRTBLUE = '#product-43 > .cart_description > h4 > a';
    }

    verifyProductsInCart() {
        cy.get('.price')
            .should('contain', 'Price')
        cy.get('.quantity')
            .should('contain', 'Quantity')
        cy.get('.total')
            .should('contain', 'Total')
    }

    clickProceedToCheckout() {
        cy.get(this.proceedToCheckoutSelector)
            .should('contain', 'Proceed To Checkout')
            .click()
    }

    removeFromCart() {
        cy.get(this.cartQuantityDelete)
            .click()
    }

    verifyEmptyCart() {
        cy.get('b')
            .should('contain', 'Cart is empty!')
    }
    verifyMenTshirtInCart() {
        cy.get(this.MenTshirt)
            .should('contain', 'Men Tshirt')
    }
    verifyMadameTopForWomenInCart() {
        cy.get(this.MadameTopForWomen)
            .should('contain', 'Madame Top For Women')
    }
    verifyLaceTopForWomenInCart() {
        cy.get(this.LaceTopForWomen)
            .should('contain', 'Lace Top For Women')
    }
    verifyGRAPHICDESIGNMENTSHIRTBLUEinCart() {
        cy.get(this.GRAPHICDESIGNMENTSHIRTBLUE)
            .should('contain', 'GRAPHIC DESIGN MEN T SHIRT - BLUE')
    }

}
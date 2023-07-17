export class Cart {

    constructor() {
        this.proceedToCheckoutSelector = '.col-sm-6 > .btn';
        this.cartQuantityDelete = '.cart_quantity_delete';
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

    removeFromCart(){
        cy.get(this.cartQuantityDelete)
        .click()
    }

    verifyEmptyCart(){
        cy.get('b')
        .should('contain','Cart is empty!')
    }


}
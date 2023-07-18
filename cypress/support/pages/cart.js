export class Cart {

    constructor() {
        this.proceedToCheckoutSelector = '.col-sm-6 > .btn';
        this.cartQuantityDelete = '.cart_quantity_delete';
        this.MenTshirt = '#product-2 > .cart_description > h4 > a';
        this.MadameTopForWomen = '#product-7 > .cart_description > h4 > a';
        this.LaceTopForWomen = '#product-42 > .cart_description > h4 > a';
        this.GRAPHICDESIGNMENTSHIRTBLUE = '#product-43 > .cart_description > h4 > a';
        this.product1 = '#product-4';
        this.product2 = '#product-5';
        this.product3 = '#product-6';
        this.addressDetails = ':nth-child(2) > .heading';
        this.yourDeliveryAddress = '#address_delivery > .address_title > .page-subheading';
        this.firstAndLastName = '#address_delivery > .address_firstname';
        this.address_delivery1 = '#address_delivery > :nth-child(3)';
        this.address_delivery2 = '#address_delivery > :nth-child(4)';
        this.address_delivery3 = '#address_delivery > :nth-child(5)';
        this.address_city = '#address_delivery > .address_city';
        this.address_country = '#address_delivery > .address_country_name';
        this.address_phone = '#address_delivery > .address_phone';
        this.billing_address = '#address_invoice > .address_title > .page-subheading';
        this.address_invoice_name = '#address_invoice > .address_firstname';
        this.address_invoice1 = '#address_invoice > :nth-child(3)';
        this.address_invoice2 = '#address_invoice > :nth-child(4)';
        this.address_invoice3 = '#address_invoice > :nth-child(5)';
        this.address_invoice_city = '#address_invoice > .address_city';
        this.address_invoice_country = '#address_invoice > .address_country_name';
        this.address_invoice_phone = '#address_invoice > .address_phone';
        this.orderCommentsForm = '.form-control';
    }

    verifyCartUrl() {
        cy.url()
            .should('contain', '/view_cart')
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
    verifyProduct1InCart() {
        cy.get(this.product1)
            .should('be.visible')
    }
    verifyProduct2InCart() {
        cy.get(this.product2)
            .should('be.visible')
    }
    verifyProduct3InCart() {
        cy.get(this.product3)
            .should('be.visible')
    }
    verifyAddressDetails() {
        cy.get(this.addressDetails)
            .should('contain', 'Address Details')
    }
    verifyYourDeliveryAddress() {
        cy.get(this.yourDeliveryAddress)
            .should('contain', 'Your delivery address')
    }
    verifyFirstAndLastName(firstname, lastname) {
        cy.get(this.firstAndLastName)
            .should('contain', 'Mr.' + ' ' + firstname + ' ' + lastname)
    }
    verifyAddress_delivery1(company) {
        cy.get(this.address_delivery1)
            .should('contain', company)
    }
    verifyAddress_delivery2(streetaddress) {
        cy.get(this.address_delivery2).should('contain', streetaddress)
    }
    verifyAddress_delivery3(streetaddress) {
        cy.get(this.address_delivery3)
            .should('contain', streetaddress)
    }
    verifyAddress_city(state) {
        cy.get(this.address_city)
            .should('contain', state)
    }
    verifyAddress_country() {
        cy.get(this.address_country)
            .should('contain', 'United States')
    }
    verifyaddress_phone(phonenumber) {
        cy.get(this.address_phone)
            .should('contain', phonenumber)
    }
    verifyBilling_address() {
        cy.get(this.billing_address)
            .should('contain', 'Your billing address')
    }
    verifyAddress_invoice_name(firstname, lastname) {
        cy.get(this.address_invoice_name)
            .should('contain', 'Mr.' + ' ' + firstname + ' ' + lastname)
    }
    verifyAddress_invoice1(company) {
        cy.get(this.address_invoice1)
            .should('contain', company)
    }
    verifyaddress_invoice2(streetaddress) {
        cy.get(this.address_invoice2)
            .should('contain', streetaddress)
    }
    verifyaddress_invoice3(streetaddress) {
        cy.get(this.address_invoice3)
            .should('contain', streetaddress)
    }
    verifyAddress_invoice_city(state) {
        cy.get(this.address_invoice_city).should('contain', state)
    }
    verifyAddress_invoice_country() {
        cy.get(this.address_invoice_country)
            .should('contain', 'United States')
    }
    verifyAddress_invoice_phone(phonenumber) {
        cy.get(this.address_invoice_phone)
            .should('contain', phonenumber)
    }
    addOrderComments(comments){
        cy.get(this.orderCommentsForm)
            .clear()
            .type(comments)
    }

}

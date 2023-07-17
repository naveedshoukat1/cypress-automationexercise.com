export class Logout {

    constructor(){
        this.logoutBtnSelector = '.shop-menu > .nav > :nth-child(4) > a';
    }
    
    clickLogoutBtn(){
        cy.get(this.logoutBtnSelector)
        .should('contain', 'Logout')
        .click()
    }
    verifyLogout(){
        cy.url()
        .should('contain', '/login')
    }
}
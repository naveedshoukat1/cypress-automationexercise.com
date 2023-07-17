export class Login {

    constructor() {
        this.loginEmailSelector = '[data-qa="login-email"]';
        this.loginPassSelector = '[data-qa="login-password"]';
        this.loginBtnSelector = '[data-qa="login-button"]';
        this.verifyUsernameSelector = ':nth-child(10) > a';
        this.loginError = '.login-form > form > p';
        this.continueBtnSelector = '[data-qa="continue-button"]';
    }

      inputLoginEmail(loginMail){
        cy.get(this.loginEmailSelector)
        .should('be.visible')
        .should('be.enabled')
        .clear()
        .type(loginMail)
      }

      inputLoginPass(loginPass){
        cy.get(this.loginPassSelector)
        .should('be.visible')
        .should('be.enabled')
        .clear()
        .type(loginPass)
      }

      clickLoginBtn(){
        cy.get(this.loginBtnSelector)
        .should('be.visible')
        .should('be.enabled')
        .click()
      }

      verifyLogin(registeredUser){
        cy.get(this.verifyUsernameSelector)
        .should('contain', registeredUser)
      }

      loginPassError(){
        cy.get(this.loginError)
        .should('be.visible')
        .should('contain', 'Your email or password is incorrect!')
      }

      clickContinueAfterAccCreation(){
        cy.get(this.continueBtnSelector)
        .click()
      }
}
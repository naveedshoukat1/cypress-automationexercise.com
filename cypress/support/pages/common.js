export class Common {

    constructor() {
        this.contactUsTitle = 'div.contact-form > .title';
        this.susbscribeEmailSelector = '#susbscribe_email';
        this.subscribeSelector = '#subscribe';
        this.cartSelector = '.shop-menu > .nav > :nth-child(3) > a';
        this.continueBtn = '[data-qa="continue-button"]';
        this.deleteAccSelector = ':nth-child(5) > a';
    }

    clickSignupLoginBtn() {
        cy.contains(' Signup / Login')
            .click()
        cy.url()
            .should('contain', 'https://www.automationexercise.com/login')
    }

    openContactUsPage() {
        cy.contains('Contact us')
            .click()
    }

    verifyContactUsPage() {
        cy.url()
            .should('contain', 'contact_us')
        cy.get(this.contactUsTitle)
            .should('contain', 'Get In Touch')
    }

    openTestcasesPage() {
        cy.contains(' Test Cases')
            .click()
    }

    verifyTestcasesPage() {
        cy.url()
            .should('contain', 'test_cases')
        cy.get('h5')
            .should('contain', 'Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:')
    }

    goToSubscribeSection() {
        cy.scrollTo('bottom', { duration: 2000 })
    }

    typeEmailtoSubscribe(email) {
        cy.get(this.susbscribeEmailSelector)
            .clear()
            .type(email)
    }

    clickSubscribe() {
        cy.get(this.subscribeSelector)
            .click()
    }

    verifySubscriptionMessage() {
        cy.contains('You have been successfully subscribed!')
            .should('be.visible')
    }
    clickOnCart() {
        cy.get(this.cartSelector)
            .should('contain', ' Cart')
            .click()
    }
    clickDeleteAccount() {
        cy.get(this.deleteAccSelector)
            .should('contain', ' Delete Account')
            .click()
    }
    verifyAccountDeleted() {
        cy.url()
            .should('contain', '/delete_account')
        cy.get('b')
            .should('be.visible')
            .should('contain', 'Account Deleted!')
    }
    clickContinueBtnToGoToHome() {
        cy.get(this.continueBtn)
            .should('contain', 'Continue')
            .click()
        cy.url()
            .should('eq', 'https://www.automationexercise.com/')
    }

}
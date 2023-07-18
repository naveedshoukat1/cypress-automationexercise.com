export class Common {

    constructor() {
        this.contactUsTitle = 'div.contact-form > .title';
        this.susbscribeEmailSelector = '#susbscribe_email';
        this.subscribeSelector = '#subscribe';
        this.cartSelector = '.shop-menu > .nav > :nth-child(3) > a';
        this.continueBtn = '[data-qa="continue-button"]';
        this.deleteAccSelector = '.shop-menu > .nav > :nth-child(5) > a';
        this.recommendedProduct1 = '.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn';
        this.recommendedProduct2 = '.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn';
        this.recommendedProduct3 = '.active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn';
        this.scrollUpBtn = '#scrollUp';
        this.AutomationExerciseText = '.active > :nth-child(1) > h1';
        this.Full_FledgedText = '.active > :nth-child(1) > h2';
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
    scrollToRecommendedSection() {
        cy.scrollTo('0%', '90%', { duration: 2000 })
    }
    addToCartrecommendedProduct1() {
        cy.get(this.recommendedProduct1)
            .should('contain', 'Add to cart')
            .click()
    }
    addToCartrecommendedProduct2() {
        cy.get(this.recommendedProduct2)
            .should('contain', 'Add to cart')
            .click()
    }
    addToCartrecommendedProduct3() {
        cy.get(this.recommendedProduct3)
            .should('contain', 'Add to cart')
            .click()
    }
    scrollToBottom() {
        cy.scrollTo('bottom', { duration: 2000 })
    }
    verifySusbscribeEmailSelector() {
        cy.get(this.susbscribeEmailSelector)
            .should('be.visible')
    }
    clickScrollUpBtn() {
        cy.get(this.scrollUpBtn, { duration: 2000 })
            .should('be.visible')
            .click()
    }
    verifyAutomationExerciseText() {
        cy.get(this.AutomationExerciseText)
            .should('contain', 'AutomationExercise')
    }
    verifyFull_FledgedText() {
        cy.get(this.Full_FledgedText)
            .should('contain', 'Full-Fledged practice website for Automation Engineers')
    }
    scrollToTop(){
        cy.scrollTo('top', { duration: 2000 })
    }


}
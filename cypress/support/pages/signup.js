import { faker, fakerEN_US } from '@faker-js/faker';
export class Signup {
    
    constructor() {
        this.name = 'input[name="name"]';
        this.signupEmail = '[data-qa="signup-email"]';
        this.signupBtn = '[data-qa="signup-button"]';
        this.emailExistsErr = '.signup-form > form > p';
        this.genderMale = '#id_gender1';
        this.pwd = '[data-qa="password"]';
        this.days = '[data-qa="days"]';
        this.months = '[data-qa="months"';
        this.years = '[data-qa="years"]';
        this.newsletter = '#newsletter';
        this.option = '#optin';
        this.firstName = '[data-qa="first_name"]';
        this.lastname = '[data-qa="last_name"]';
        this.company = '[data-qa="company"]';
        this.address = '[data-qa="address"]';
        this.address2 = '[data-qa="address2"]';
        this.country = '[data-qa="country"]';
        this.state = '[data-qa="state"]';
        this.city = '[data-qa="city"]';
        this.zipcode = '[data-qa="zipcode"]';
        this.mobilenum = '[data-qa="mobile_number"]';
        this.createAccountBtn = '[data-qa="create-account"]';
    }

    inputFullName(fullname) {
        cy.get(this.name)
            .should('be.visible')
            .clear()
            .type(fullname)
    }
    
    inputSignupEmail(email) {
        cy.get(this.signupEmail)
            .should('be.visible')
            .clear()
            .type(email)
    }

    clickSignupBtn() {
        cy.get(this.signupBtn)
            .should('contain', 'Signup')
            .click()
    }

    verifyEmailExists() {
        cy.get(this.emailExistsErr).should('contain', 'Email Address already exist!')
    }

    selectGenderMale() {
        cy.get(this.genderMale)
            .should('be.visible')
            .should('not.be.checked')
            .check()
    }

    typePassword(password) {
        cy.get(this.pwd)
            .clear()
            .type(password)
    }

    selectDate() {
        cy.get(this.days)
            .should('contain', 'Day', 'have.value', 'Day')
            .select('1')
    }

    selectMonth() {
        cy.get(this.months)
            .should('contain', 'Month', 'have.value', 'Month')
            .select('February')
    }

    selectYear() {
        cy.get(this.years)
            .should('contain', 'Year', 'have.value', 'Year')
            .select('2000')
    }

    checkNewsletter() {
        cy.get(this.newsletter)
            .should('be.visible')
            .should('not.be.checked')
            .check()
    }

    checkOffers() {
        cy.get(this.option)
            .should('be.visible')
            .should('not.be.checked')
            .check()
    }

    inputFirstName(firstname) {
        cy.get(this.firstName)
            .should('be.visible')
            .clear()
            .type(firstname)
    }

    inputLastName(lastname) {
        cy.get(this.lastname)
            .should('be.visible')
            .clear()
            .type(lastname)
    }

    inputCompanyName(company) {
        cy.get(this.company)
            .should('be.visible')
            .clear()
            .type(company)
    }

    inputAddress(streetaddress) {
        cy.get(this.address)
            .should('be.visible')
            .clear()
            .type(streetaddress)
    }

    inputAddress2(streetaddress) {
        cy.get(this.address2)
            .should('be.visible')
            .clear()
            .type(streetaddress)
    }

    selectCountry() {
        cy.get(this.country)
            .should('contain', 'India', 'have.value', 'India')
            .select('United States')
    }

    inputState(state) {
        cy.get(this.state)
            .should('be.visible')
            .clear()
            .type(state)
    }

    inputCity(city) {
        cy.get(this.city)
            .should('be.visible')
            .clear()
            .type(city)
    }

    inputZipCode(zipcode) {
        cy.get(this.zipcode)
            .should('be.visible')
            .clear()
            .type(zipcode)
    }

    inputPhoneNumber(phonenumber) {
        cy.get(this.mobilenum)
            .should('be.visible')
            .clear()
            .type(phonenumber)
    }

    clickCreateAccBtn() {
        cy.get(this.createAccountBtn)
            .should('be.enabled')
            .click()
    }

    verifyAccCreation() {
        cy.url()
            .should('contain', 'https://www.automationexercise.com/account_created')
        cy.get('b')
            .should('be.visible')
            .should('contain', 'Account Created!')
    }

}
/// <reference types="cypress" />
import { faker, fakerEN_US } from '@faker-js/faker';

describe('initiates', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    cy.visit('https://www.automationexercise.com', { failOnStatusCode: false })
  })
  let firstname = faker.person.firstName('male')
  let Lastname = faker.person.lastName('male')
  let fullname = faker.person.fullName('male')
  let password = faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello ' })
  let email = faker.internet.exampleEmail({delay:50})
  let company = faker.company.buzzNoun()
  let streetaddress = faker.location.streetAddress(true)
  let state = fakerEN_US.location.state()
  let city = fakerEN_US.location.city()
  let zipcode = fakerEN_US.location.zipCode()
  let phonenumber = faker.phone.number('+92 ### ### ## ##')


  it('Test Case 1: Register User', () => {
    cy.contains(' Signup / Login').click()
    cy.url().should('contain', 'https://www.automationexercise.com/login')
    cy.get('input[name="name"]').should('be.visible').clear().type(fullname)
    cy.get('[data-qa="signup-email"]').should('be.visible').clear().type(email)
    cy.get('[data-qa="signup-button"]').should('contain','Signup').click()
    cy.url().should('contain', 'https://www.automationexercise.com/signup')
    cy.get('#id_gender1').should('be.visible').should('not.be.checked').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').should('contain', 'Day','have.value','Day').select('1')
    cy.get('[data-qa="months"]').should('contain', 'Month','have.value','Month').select('February')
    cy.get('[data-qa="years"]').should('contain', 'Year','have.value','Year').select('2000')
    cy.get('#newsletter').should('be.visible').should('not.be.checked').check()
    cy.get('#optin').should('be.visible').should('not.be.checked').check()
    cy.get('[data-qa="first_name"]').should('be.visible').clear().type(firstname)
    cy.get('[data-qa="last_name"]').should('be.visible').clear().type(Lastname)
    cy.get('[data-qa="company"]').should('be.visible').clear().type(company)
    cy.get('[data-qa="address"]').should('be.visible').clear().type(streetaddress)
    cy.get('[data-qa="address2"]').should('be.visible').clear().type(streetaddress)
    cy.get('[data-qa="country"]').should('contain', 'India','have.value','India').select('United States')
    cy.get('[data-qa="state"]').should('be.visible').clear().type(state)
    cy.get('[data-qa="city"]').should('be.visible').clear().type(city)
    cy.get('[data-qa="zipcode"]').should('be.visible').clear().type(zipcode)
    cy.get('[data-qa="mobile_number"]').should('be.visible').clear().type(phonenumber)
    cy.get('[data-qa="create-account"]').should('be.enabled').click()
    cy.url().should('contain', 'https://www.automationexercise.com/account_created')
    cy.get('b').should('be.visible').should('contain','Account Created!')
  })

  it('Test Case 2: Login User with correct email and password', () => {
    cy.contains(' Signup / Login').click()
    cy.url().should('contain', 'https://www.automationexercise.com/login')
    cy.get('[data-qa="login-email"]').should('be.visible').should('be.enabled').clear().type('naveed.shoukat@invozone.com')
    cy.get('[data-qa="login-password"]').should('be.visible').should('be.enabled').clear().type('12345678')
    cy.get('[data-qa="login-button"]').should('be.visible').should('be.enabled').click()
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.contains(' Signup / Login').click()
    cy.url().should('contain', 'https://www.automationexercise.com/login')
    cy.get('[data-qa="login-email"]').should('be.visible').should('be.enabled').clear().type(faker.internet.exampleEmail())
    cy.get('[data-qa="login-password"]').should('be.visible').should('be.enabled').clear().type(faker.internet.password())
    cy.get('[data-qa="login-button"]').should('be.visible').should('be.enabled').click()
    cy.get('.login-form > form > p').should('be.visible').should('contain', 'Your email or password is incorrect!')
  })

  it('Test Case 4: Logout User', () => {
    cy.visit('https://www.automationexercise.com', { failOnStatusCode: false })
    
  });

  it('Test Case 5: Register User with existing email', () => {
    cy.contains(' Signup / Login').click()
    cy.url().should('contain', 'https://www.automationexercise.com/login')
    cy.get('input[name="name"]').should('be.visible').clear().type(fullname)
    cy.get('[data-qa="signup-email"]').should('be.visible').clear().type('naveed.shoukat@invozone.com')
    cy.get('[data-qa="signup-button"]').should('contain','Signup').click()
    cy.get('.signup-form > form > p').should('be.visible').should('contain', 'Email Address already exist!')
  });

  it('Test Case 6: Contact Us Form', () => {
    cy.contains('Contact us').click()
    cy.url().should('contain', 'contact_us')
    cy.get('div.contact-form > .title').should('contain','Get In Touch')
  });

  it('Test Case 7: Verify Test Cases Page ', () => {
    cy.contains(' Test Cases').click()
    cy.url().should('contain', 'test_cases')
    cy.get('h5').should('contain','Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:')
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.left-sidebar > :nth-child(1)').should('contain','Category')
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').should('contain', 'View Product').click()
    cy.url().should('contain', '/product_details/1')
    cy.get('.product-information > h2').should('contain','Blue Top')
    cy.get('.product-information > :nth-child(3)').should('contain','Category: Women > Tops')
    cy.get(':nth-child(5) > span').should('contain','Rs. 500')
    cy.get('.product-information > :nth-child(6)').should('contain','Availability:').should('contain',' In Stock')
    cy.get('.product-information > :nth-child(7)').should('contain','Condition:')
    cy.get('.product-information > :nth-child(8)').should('contain','Brand:').should('contain',' Polo')
  });

  it.only('Test Case 9: Search Product', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.contains('All Products')
    cy.get('#search_product').clear().type('Men')
    cy.get('#submit_search').click()
    cy.url().should('contain', '/products?search=Men')
    cy.contains('Searched Products')

  });

}) 
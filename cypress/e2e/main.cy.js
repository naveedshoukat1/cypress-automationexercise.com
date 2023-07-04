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
  let cardholder = faker.finance.accountName()
  let cardnumber = faker.finance.creditCardNumber({ issuer: 'visa' })
  let cvc = faker.finance.creditCardCVV()
  // let expiryYear = faker.date.between().
  // let expiryMonth = faker.date.month({ context: true })



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

  it('Test Case 9: Search Product', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.contains('All Products')
    cy.get('#search_product').clear().type('Men')
    cy.get('#submit_search').click()
    cy.url().should('contain', '/products?search=Men')
    cy.contains('Searched Products')
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.scrollTo('bottom')
    cy.get('#susbscribe_email').clear().type(email)
    cy.get('#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  });

  it('Test Case 11: Verify Subscription in Cart page', () => {
    cy.get('.shop-menu > .nav > :nth-child(3) > a').should('contain',' Cart').click()
    cy.get('#susbscribe_email').clear().type(email)
    cy.get('#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  });

  it('Test Case 12: Add Products in Cart', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.left-sidebar > :nth-child(1)').should('contain','Category')
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > img').trigger('mouseover')
    cy.contains('Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > img').trigger('mouseover')
    cy.contains('Add to cart').click()
    cy.contains('View Cart').click()
    cy.get('.price').should('contain','Price')
    cy.get('.quantity').should('contain','Quantity')
    cy.get('.total').should('contain','Total')
  });

  it('Test Case 13: Verify Product quantity in Cart ', () => {
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
    cy.get('#quantity').clear().type('4')
    cy.get(':nth-child(5) > .btn').should('contain','Add to cart').click()
    cy.contains('View Cart').click()
    cy.get('.quantity').should('contain','Quantity')
    cy.get('.disabled').contains('4')
  });

  it.only('Test Case 14: Place Order: Register while Checkout', () => {
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
    cy.get('#quantity').clear().type('4')
    cy.get(':nth-child(5) > .btn').should('contain','Add to cart').click()
    cy.contains('View Cart').click()
    cy.get('.quantity').should('contain','Quantity')
    cy.get('.disabled').contains('4')
    cy.get('.col-sm-6 > .btn').should('contain' , 'Proceed To Checkout').click()
    cy.get('.modal-body > :nth-child(2) > a > u').should('contain','Register / Login').click()
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
    cy.get('[data-qa="continue-button"]').click()
    cy.get(':nth-child(10) > a').should('contain', fullname)
    cy.get('.shop-menu > .nav > :nth-child(3) > a').should('contain', 'Cart').click()
    cy.get('.col-sm-6 > .btn').should('contain', 'Proceed To Checkout').click()
    cy.get('.form-control').clear().type(faker.lorem.lines(5))
    cy.get(':nth-child(7) > .btn').should('contain', 'Place Order').click()
    cy.get('[data-qa="name-on-card"]').clear().type(cardholder)
    cy.get('[data-qa="card-number"]').clear().type(cardnumber)
    cy.get('[data-qa="cvc"]').clear().type(cvc)
    cy.get('[data-qa="expiry-month"]').clear().type('02')
    cy.get('[data-qa="expiry-year"]').clear().type('2024')
    cy.get('[data-qa="pay-button"]').should('contain', 'Pay and Confirm Order').click()
    cy.contains('Order Placed!')
  });

}) 
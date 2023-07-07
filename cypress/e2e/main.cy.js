/// <reference types="cypress" />
import { faker, fakerEN_US } from '@faker-js/faker';

describe('initiates', () => {

  beforeEach(() => {
    cy.viewport('macbook-16')
    cy.visit('https://www.automationexercise.com', { failOnStatusCode: false })
  })
  let firstname = faker.person.firstName('male')
  let lastname = faker.person.lastName('male')
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
    cy.get('[data-qa="last_name"]').should('be.visible').clear().type(lastname)
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
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
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
    cy.url().should('contain', '/product_details')
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

  it('Test Case 14: Place Order: Register while Checkout and Delete account', () => {
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
    cy.get('#id_gender1').should('not.be.checked').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').should('contain', 'Day','have.value','Day').select('1')
    cy.get('[data-qa="months"]').should('contain', 'Month','have.value','Month').select('February')
    cy.get('[data-qa="years"]').should('contain', 'Year','have.value','Year').select('2000')
    cy.get('#newsletter').should('be.visible').should('not.be.checked').check()
    cy.get('#optin').should('be.visible').should('not.be.checked').check()
    cy.get('[data-qa="first_name"]').should('be.visible').clear().type(firstname)
    cy.get('[data-qa="last_name"]').should('be.visible').clear().type(lastname)
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
    cy.get(':nth-child(5) > a').should('contain', ' Delete Account').click()
    cy.url().should('contain', '/delete_account')
    cy.get('b').should('be.visible').should('contain','Account Deleted!')
    cy.get('[data-qa="continue-button"]').should('contain','Continue').click()
    cy.url().should('eq','https://www.automationexercise.com/')
  });

  it('Test Case 15: Place Order: Register before Checkout and Delete account', () => {
    cy.contains(' Signup / Login').click()
    cy.url().should('contain', '/login')
    cy.get('input[name="name"]').should('be.visible').clear().type(fullname)
    cy.get('[data-qa="signup-email"]').should('be.visible').clear().type(email)
    cy.get('[data-qa="signup-button"]').should('contain','Signup').click()
    cy.url().should('contain', '/signup')
    cy.get('#id_gender1').should('not.be.checked').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').should('contain', 'Day','have.value','Day').select('1')
    cy.get('[data-qa="months"]').should('contain', 'Month','have.value','Month').select('February')
    cy.get('[data-qa="years"]').should('contain', 'Year','have.value','Year').select('2000')
    cy.get('#newsletter').should('be.visible').should('not.be.checked').check()
    cy.get('#optin').should('be.visible').should('not.be.checked').check()
    cy.get('[data-qa="first_name"]').should('be.visible').clear().type(firstname)
    cy.get('[data-qa="last_name"]').should('be.visible').clear().type(lastname)
    cy.get('[data-qa="company"]').should('be.visible').clear().type(company)
    cy.get('[data-qa="address"]').should('be.visible').clear().type(streetaddress)
    cy.get('[data-qa="address2"]').should('be.visible').clear().type(streetaddress)
    cy.get('[data-qa="country"]').should('contain', 'India','have.value','India').select('United States')
    cy.get('[data-qa="state"]').should('be.visible').clear().type(state)
    cy.get('[data-qa="city"]').should('be.visible').clear().type(city)
    cy.get('[data-qa="zipcode"]').should('be.visible').clear().type(zipcode)
    cy.get('[data-qa="mobile_number"]').should('be.visible').clear().type(phonenumber)
    cy.get('[data-qa="create-account"]').should('be.enabled').click()
    cy.url().should('contain', '/account_created')
    cy.get('b').should('be.visible').should('contain','Account Created!')
    cy.get('[data-qa="continue-button"]').click()
    cy.get(':nth-child(10) > a').should('contain', fullname)
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.left-sidebar > :nth-child(1)').should('contain','Category')
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > img').trigger('mouseover')
    cy.contains('Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > img').trigger('mouseover')
    cy.contains('Add to cart').click()
    cy.contains('View Cart').click()
    cy.url().should('contain','/view_cart')
    cy.get('.price').should('contain','Price')
    cy.get('.quantity').should('contain','Quantity')
    cy.get('.total').should('contain','Total')
    cy.get('.col-sm-6 > .btn').should('contain', 'Proceed To Checkout').click()
    cy.url().should('contain','/checkout')
    cy.get('.form-control').clear().type(faker.lorem.lines(5))
    cy.get(':nth-child(7) > .btn').should('contain', 'Place Order').click()
    cy.url().should('contain','/payment')
    cy.get('[data-qa="name-on-card"]').clear().type(cardholder)
    cy.get('[data-qa="card-number"]').clear().type(cardnumber)
    cy.get('[data-qa="cvc"]').clear().type(cvc)
    cy.get('[data-qa="expiry-month"]').clear().type('02')
    cy.get('[data-qa="expiry-year"]').clear().type('2024')
    cy.get('[data-qa="pay-button"]').should('contain', 'Pay and Confirm Order').click()
    cy.url().should('contain','/payment_done/')
    cy.contains('Order Placed!')
    cy.get(':nth-child(5) > a').should('contain', ' Delete Account').click()
    cy.url().should('contain', '/delete_account')
    cy.get('b').should('be.visible').should('contain','Account Deleted!')
    cy.get('[data-qa="continue-button"]').should('contain','Continue').click()
    cy.url().should('eq','https://www.automationexercise.com/')
  });

  it('Test Case 16: Place Order: Login before Checkout and Delete account', () => {
    cy.contains(' Signup / Login').click()
    cy.url().should('contain', 'https://www.automationexercise.com/login')
    cy.get('[data-qa="login-email"]').should('be.visible').should('be.enabled').clear().type('naveed.shoukat@invozone.com')
    cy.get('[data-qa="login-password"]').should('be.visible').should('be.enabled').clear().type('12345678')
    cy.get('[data-qa="login-button"]').should('be.visible').should('be.enabled').click()
    cy.get(':nth-child(10) > a').should('contain','Naveed Shoukat')
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.left-sidebar > :nth-child(1)').should('contain','Category')
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > img').trigger('mouseover')
    cy.contains('Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > img').trigger('mouseover')
    cy.contains('Add to cart').click()
    cy.contains('View Cart').click()
    cy.url().should('contain','/view_cart')
    cy.get('.price').should('contain','Price')
    cy.get('.quantity').should('contain','Quantity')
    cy.get('.total').should('contain','Total')
    cy.get('.col-sm-6 > .btn').should('contain', 'Proceed To Checkout').click()
    cy.url().should('contain','/checkout')
    cy.get('.form-control').clear().type(faker.lorem.lines(5))
    cy.get(':nth-child(7) > .btn').should('contain', 'Place Order').click()
    cy.url().should('contain','/payment')
    cy.get('[data-qa="name-on-card"]').clear().type(cardholder)
    cy.get('[data-qa="card-number"]').clear().type(cardnumber)
    cy.get('[data-qa="cvc"]').clear().type(cvc)
    cy.get('[data-qa="expiry-month"]').clear().type('02')
    cy.get('[data-qa="expiry-year"]').clear().type('2024')
    cy.get('[data-qa="pay-button"]').should('contain', 'Pay and Confirm Order').click()
    cy.url().should('contain','/payment_done/')
    cy.contains('Order Placed!')
    cy.get(':nth-child(5) > a').should('contain', ' Delete Account').click()
    cy.url().should('contain', '/delete_account')
    cy.get('b').should('be.visible').should('contain','Account Deleted!')
    cy.get('[data-qa="continue-button"]').should('contain','Continue').click()
    cy.url().should('eq','https://www.automationexercise.com/')
  });

  it('Test Case 17: Remove Products From Cart', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.left-sidebar > :nth-child(1)').should('contain','Category')
    cy.get(':nth-child(5) > .product-image-wrapper > .single-products > .productinfo > .btn').trigger('mouseover')
    cy.contains('Add to cart').click()
    cy.contains('View Cart').click()
    cy.get('.price').should('contain','Price')
    cy.get('.quantity').should('contain','Quantity')
    cy.get('.total').should('contain','Total')
    cy.get('.cart_quantity_delete').click()
    cy.get('b').should('contain','Cart is empty!')
  });

  it('Test Case 18: View Category Products', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.left-sidebar > :nth-child(1)').should('contain','Category')
    cy.get(':nth-child(1) > .panel-heading > .panel-title > a').should('contain','Women')
    cy.get(':nth-child(2) > .panel-heading > .panel-title > a').should('contain','Men')
    cy.get(':nth-child(3) > .panel-heading > .panel-title > a').should('contain','Kids')
    cy.get('.brands_products > h2').should('contain','Brands')
    cy.get(':nth-child(1) > .panel-heading > .panel-title > a').should('contain','Women').click()
    cy.get('#Women > .panel-body > ul > :nth-child(1) > a').should('contain','Dress').click()
    cy.url().should('contain','/category_products')
    cy.get('.title').should('contain','Women - Dress Products')
    cy.get(':nth-child(2) > .panel-heading > .panel-title > a').should('contain','Men').click()
    cy.get('#Men > .panel-body > ul > :nth-child(1) > a').should('contain','Tshirts ').click()
    cy.url().should('contain','/category_products/')
  });

  it('Test Case 19: View & Cart Brand Products', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.brands_products > h2').should('contain','Brands')
    cy.get('.brands-name > .nav > :nth-child(1) > a').should('contain','Polo')
    cy.get('.brands-name > .nav > :nth-child(2) > a').should('contain','H&M')
    cy.get('.brands-name > .nav > :nth-child(3) > a').should('contain','Madame')
    cy.get('.brands-name > .nav > :nth-child(4) > a').should('contain','Mast & Harbour')
    cy.get('.brands-name > .nav > :nth-child(5) > a').should('contain','Babyhug')
    cy.get('.brands-name > .nav > :nth-child(6) > a').should('contain','Allen Solly Junior')
    cy.get('.brands-name > .nav > :nth-child(7) > a').should('contain','Kookie Kids')
    cy.get('.brands-name > .nav > :nth-child(8) > a').should('contain','Biba')
    cy.get('.brands-name > .nav > :nth-child(1) > a').should('contain','Polo').click()
    cy.get('.title').should('contain','Brand - Polo Products')
    cy.get('.brands-name > .nav > :nth-child(8) > a').should('contain','Biba').click()
    cy.get('.title').should('contain','Brand - Biba Products')
  });

  it('Test Case 20: Search Products and Verify Cart After Login ', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.brands_products > h2').should('contain','Brands')
    cy.get('.brands-name > .nav > :nth-child(1) > a').should('contain','Polo')
    cy.get('.brands-name > .nav > :nth-child(2) > a').should('contain','H&M')
    cy.get('.brands-name > .nav > :nth-child(3) > a').should('contain','Madame')
    cy.get('.brands-name > .nav > :nth-child(4) > a').should('contain','Mast & Harbour')
    cy.get('.brands-name > .nav > :nth-child(5) > a').should('contain','Babyhug')
    cy.get('.brands-name > .nav > :nth-child(6) > a').should('contain','Allen Solly Junior')
    cy.get('.brands-name > .nav > :nth-child(7) > a').should('contain','Kookie Kids')
    cy.get('.brands-name > .nav > :nth-child(8) > a').should('contain','Biba')
    cy.get('#search_product').clear().type('Men')
    cy.get('#submit_search').click()
    cy.url().should('contain', '/products?search=Men')
    cy.contains('Searched Products')
    cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get(':nth-child(5) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get(':nth-child(6) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get('.shop-menu > .nav > :nth-child(3) > a').should('contain',' Cart').click()
    cy.get('#product-2 > .cart_description > h4 > a').should('contain','Men Tshirt')
    cy.get('#product-7 > .cart_description > h4 > a').should('contain','Madame Top For Women')
    cy.get('#product-42 > .cart_description > h4 > a').should('contain','Lace Top For Women')
    cy.get('#product-43 > .cart_description > h4 > a').should('contain','GRAPHIC DESIGN MEN T SHIRT - BLUE')
    cy.contains(' Signup / Login').click()
    cy.url().should('contain', 'https://www.automationexercise.com/login')
    cy.get('[data-qa="login-email"]').should('be.visible').should('be.enabled').clear().type('naveed.shoukat@invozone.com')
    cy.get('[data-qa="login-password"]').should('be.visible').should('be.enabled').clear().type('12345678')
    cy.get('[data-qa="login-button"]').should('be.visible').should('be.enabled').click()
    cy.get('.shop-menu > .nav > :nth-child(3) > a').should('contain',' Cart').click()
    cy.get('#product-2 > .cart_description > h4 > a').should('contain','Men Tshirt')
    cy.get('#product-7 > .cart_description > h4 > a').should('contain','Madame Top For Women')
    cy.get('#product-42 > .cart_description > h4 > a').should('contain','Lace Top For Women')
    cy.get('#product-43 > .cart_description > h4 > a').should('contain','GRAPHIC DESIGN MEN T SHIRT - BLUE')
  });
  it('Test Case 21: Add review on product ', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.left-sidebar > :nth-child(1)').should('contain','Category')
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').should('contain', 'View Product').click()
    cy.url().should('contain', '/product_details')
    cy.get('.product-information > h2').should('contain','Blue Top')
    cy.get('#name').clear().type(faker.person.fullName())
    cy.get('#email').clear().type(faker.internet.exampleEmail())
    cy.get('#review').clear().type(faker.lorem.paragraphs(5))
    cy.get('#button-review').click()
    cy.get('.alert-success > span').should('contain','Thank you for your review')
  });

  it('Test Case 22: Add to cart from Recommended items', () => {
    cy.scrollTo('0%', '90%')
    cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get('.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get('.active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.contains('View Cart').click()
    cy.url().should('contain','/view_cart')
    cy.get('#product-4').should('be.visible')
    cy.get('#product-5').should('be.visible')
    cy.get('#product-6').should('be.visible')
   });

   it('Test Case 23: Verify address details in checkout page', () => {
    cy.contains(' Signup / Login').click()
    cy.get('input[name="name"]').should('be.visible').clear().type(firstname + ' ' + lastname)
    cy.get('[data-qa="signup-email"]').should('be.visible').clear().type(email)
    cy.get('[data-qa="signup-button"]').should('contain','Signup').click()
    cy.url().should('contain', 'https://www.automationexercise.com/signup')
    cy.get('#id_gender1').should('not.be.checked').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').should('contain', 'Day','have.value','Day').select('1')
    cy.get('[data-qa="months"]').should('contain', 'Month','have.value','Month').select('February')
    cy.get('[data-qa="years"]').should('contain', 'Year','have.value','Year').select('2000')
    cy.get('#newsletter').should('be.visible').should('not.be.checked').check()
    cy.get('#optin').should('be.visible').should('not.be.checked').check()
    cy.get('[data-qa="first_name"]').should('be.visible').clear().type(firstname)
    cy.get('[data-qa="last_name"]').should('be.visible').clear().type(lastname)
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
    cy.get(':nth-child(10) > a').should('contain', firstname + ' ' + lastname)
    cy.scrollTo('0%', '90%')
    cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get('.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get('.active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.contains('View Cart').click()
    cy.url().should('contain','/view_cart')
    cy.get('#product-4').should('be.visible')
    cy.get('#product-5').should('be.visible')
    cy.get('#product-6').should('be.visible')
    cy.get('.col-sm-6 > .btn').should('contain' , 'Proceed To Checkout').click()
    cy.get(':nth-child(2) > .heading').should('contain' , 'Address Details')
    cy.get('#address_delivery > .address_title > .page-subheading').should('contain','Your delivery address')
    cy.get('#address_delivery > .address_firstname').should('contain', 'Mr.' + ' ' +  firstname + ' ' + lastname)
    cy.get('#address_delivery > :nth-child(3)').should('contain',company)
    cy.get('#address_delivery > :nth-child(4)').should('contain',streetaddress)
    cy.get('#address_delivery > :nth-child(5)').should('contain',streetaddress)
    cy.get('#address_delivery > .address_city').should('contain',state)
    cy.get('#address_delivery > .address_country_name').should('contain','United States')
    cy.get('#address_delivery > .address_phone').should('contain',phonenumber)
    cy.get('#address_invoice > .address_title > .page-subheading').should('contain','Your billing address')
    cy.get('#address_invoice > .address_firstname').should('contain', 'Mr.' + ' ' +  firstname + ' ' + lastname)
    cy.get('#address_invoice > :nth-child(3)').should('contain',company)
    cy.get('#address_invoice > :nth-child(4)').should('contain',streetaddress)
    cy.get('#address_invoice > :nth-child(5)').should('contain',streetaddress)
    cy.get('#address_invoice > .address_city').should('contain',state)
    cy.get('#address_invoice > .address_country_name').should('contain','United States')
    cy.get('#address_invoice > .address_phone').should('contain',phonenumber)
    cy.get(':nth-child(5) > a').should('contain', ' Delete Account').click()
    cy.url().should('contain', '/delete_account')
    cy.get('b').should('be.visible').should('contain','Account Deleted!')
    cy.get('[data-qa="continue-button"]').should('contain','Continue').click()
    cy.url().should('eq','https://www.automationexercise.com/')
   });

   it('Test Case 24: Download Invoice after purchase order ', () => {
    cy.scrollTo('0%', '90%')
    cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get('.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain','Continue Shopping').click()
    cy.get('.active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain','Add to cart').click()
    cy.contains('View Cart').click()
    cy.url().should('contain','/view_cart')
    cy.get('#product-4').should('be.visible')
    cy.get('#product-5').should('be.visible')
    cy.get('#product-6').should('be.visible')
    cy.get('.col-sm-6 > .btn').should('contain' , 'Proceed To Checkout').click()
    cy.get('.modal-body > :nth-child(2) > a > u').should('contain','Register / Login').click()
    cy.get('input[name="name"]').should('be.visible').clear().type(firstname + ' ' + lastname)
    cy.get('[data-qa="signup-email"]').should('be.visible').clear().type(email)
    cy.get('[data-qa="signup-button"]').should('contain','Signup').click()
    cy.url().should('contain', 'https://www.automationexercise.com/signup')
    cy.get('#id_gender1').should('not.be.checked').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').should('contain', 'Day','have.value','Day').select('1')
    cy.get('[data-qa="months"]').should('contain', 'Month','have.value','Month').select('February')
    cy.get('[data-qa="years"]').should('contain', 'Year','have.value','Year').select('2000')
    cy.get('#newsletter').should('be.visible').should('not.be.checked').check()
    cy.get('#optin').should('be.visible').should('not.be.checked').check()
    cy.get('[data-qa="first_name"]').should('be.visible').clear().type(firstname)
    cy.get('[data-qa="last_name"]').should('be.visible').clear().type(lastname)
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
    cy.get(':nth-child(10) > a').should('contain', firstname + ' ' + lastname)
    cy.get('.shop-menu > .nav > :nth-child(3) > a').should('contain', 'Cart').click()
    cy.get('.col-sm-6 > .btn').should('contain', 'Proceed To Checkout').click()
    cy.get(':nth-child(2) > .heading').should('contain' , 'Address Details')
    cy.get('#address_delivery > .address_title > .page-subheading').should('contain','Your delivery address')
    cy.get('#address_delivery > .address_firstname').should('contain', 'Mr.' + ' ' +  firstname + ' ' + lastname)
    cy.get('#address_delivery > :nth-child(3)').should('contain',company)
    cy.get('#address_delivery > :nth-child(4)').should('contain',streetaddress)
    cy.get('#address_delivery > :nth-child(5)').should('contain',streetaddress)
    cy.get('#address_delivery > .address_city').should('contain',state)
    cy.get('#address_delivery > .address_country_name').should('contain','United States')
    cy.get('#address_delivery > .address_phone').should('contain',phonenumber)
    cy.get('#address_invoice > .address_title > .page-subheading').should('contain','Your billing address')
    cy.get('#address_invoice > .address_firstname').should('contain', 'Mr.' + ' ' +  firstname + ' ' + lastname)
    cy.get('#address_invoice > :nth-child(3)').should('contain',company)
    cy.get('#address_invoice > :nth-child(4)').should('contain',streetaddress)
    cy.get('#address_invoice > :nth-child(5)').should('contain',streetaddress)
    cy.get('#address_invoice > .address_city').should('contain',state)
    cy.get('#address_invoice > .address_country_name').should('contain','United States')
    cy.get('#address_invoice > .address_phone').should('contain',phonenumber)
    cy.get('.form-control').clear().type(faker.lorem.paragraphs(5))
    cy.get(':nth-child(7) > .btn').should('contain', 'Place Order').click()
    cy.get('[data-qa="name-on-card"]').clear().type(cardholder)
    cy.get('[data-qa="card-number"]').clear().type(cardnumber)
    cy.get('[data-qa="cvc"]').clear().type(cvc)
    cy.get('[data-qa="expiry-month"]').clear().type('02')
    cy.get('[data-qa="expiry-year"]').clear().type('2024')
    cy.get('[data-qa="pay-button"]').should('contain', 'Pay and Confirm Order').click()
    cy.contains('Order Placed!')
    cy.window().document().then(function (doc) {
      doc.addEventListener('click', () => {
        setTimeout(function () { doc.location.reload() }, 5000)
      })
      
      cy.get('.col-sm-9 > .btn-default').should('contain', 'Download Invoice').click()
      cy.verifyDownload('invoice.txt');
    })
    cy.get('[data-qa="continue-button"]').should('contain','Continue').click()
    cy.url().should('eq','https://www.automationexercise.com/')
    cy.get('.shop-menu > .nav > :nth-child(5) > a').should('contain', ' Delete Account').click()
    cy.url().should('contain', '/delete_account')
    cy.get('b').should('be.visible').should('contain','Account Deleted!')
    cy.get('[data-qa="continue-button"]').should('contain','Continue').click()
    cy.url().should('eq','https://www.automationexercise.com/')
   });
}) 
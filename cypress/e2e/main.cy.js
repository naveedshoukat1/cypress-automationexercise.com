/// <reference types="cypress" />
import { faker, fakerEN_US } from '@faker-js/faker';
import { Cart } from '../support/pages/cart';
import { Payment } from '../support/pages/payment';
import { Login } from '../support/pages/login';
import { Checkout } from '../support/pages/checkout';
import { Signup } from '../support/pages/signup';
import { Common } from '../support/pages/common';
import { Logout } from '../support/pages/logout';
import { Products } from '../support/pages/products';

const signup = new Signup();
const login = new Login();
const common = new Common();
const logout = new Logout();
const products = new Products();
const cart = new Cart();
const checkout = new Checkout();
const payment = new Payment();

describe('automationexercise.com test scripts', () => {

  beforeEach(() => {
    cy.viewport('macbook-16')
    cy.visit('https://www.automationexercise.com', { failOnStatusCode: false })
  })
  let firstname = faker.person.firstName('male')
  let lastname = faker.person.lastName('male')
  let fullname = faker.person.fullName('male')
  let password = faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello ' })
  let email = faker.internet.exampleEmail({ delay: 30, allowSpecialCharacters: true, firstName: 'John' })
  let company = faker.company.buzzNoun()
  let streetaddress = faker.location.streetAddress(true)
  let state = fakerEN_US.location.state()
  let city = fakerEN_US.location.city()
  let zipcode = fakerEN_US.location.zipCode()
  let phonenumber = faker.phone.number('+92 ### ### ## ##')
  let cardholder = faker.finance.accountName()
  let cardnumber = faker.finance.creditCardNumber({ issuer: 'visa' })
  let cvc = faker.finance.creditCardCVV()
  let loginMail = 'naveed.shoukat@invozone.com';
  let loginPass = '12345678';
  let registeredUser = 'Naveed Shoukat';

  it('Test Case 1: Register User', () => {
    common.clickSignupLoginBtn();
    signup.inputFullName(fullname);
    signup.inputSignupEmail(email);
    signup.clickSignupBtn();
    signup.selectGenderMale();
    signup.typePassword(password);
    signup.selectDate();
    signup.selectMonth();
    signup.selectYear();
    signup.checkNewsletter();
    signup.checkOffers();
    signup.inputFirstName(firstname);
    signup.inputLastName(lastname);
    signup.inputCompanyName(company);
    signup.inputAddress(streetaddress);
    signup.inputAddress2(streetaddress);
    signup.selectCountry();
    signup.inputState(state);
    signup.inputCity(city);
    signup.inputZipCode(zipcode);
    signup.inputPhoneNumber(phonenumber);
    signup.clickCreateAccBtn();
    signup.verifyAccCreation();
  })

  it('Test Case 2: Login User with correct email and password', () => {
    common.clickSignupLoginBtn();
    login.inputLoginEmail(loginMail);
    login.inputLoginPass(loginPass);
    login.clickLoginBtn();
    login.verifyLogin(registeredUser);
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    common.clickSignupLoginBtn();
    login.inputLoginEmail(email);
    login.inputLoginPass(password);
    login.clickLoginBtn();
    login.loginPassError();
  })

  it('Test Case 4: Logout User', () => {
    common.clickSignupLoginBtn();
    login.inputLoginEmail(loginMail);
    login.inputLoginPass(loginPass);
    login.clickLoginBtn();
    login.verifyLogin(registeredUser);
    logout.clickLogoutBtn()
    logout.verifyLogout()
  });

  it('Test Case 5: Register User with existing email', () => {
    common.clickSignupLoginBtn();
    signup.inputFullName(fullname);
    signup.inputSignupEmail(loginMail);
    signup.clickSignupBtn();
    signup.verifyEmailExists();
  });

  it('Test Case 6: Contact Us Form', () => {
    common.openContactUsPage();
    common.verifyContactUsPage()
  });

  it('Test Case 7: Verify Test Cases Page ', () => {
    common.openTestcasesPage();
    common.verifyTestcasesPage();
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.openProductDetailPage();
    products.verifyProductDetailPage();
  });

  it('Test Case 9: Search Product', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.searchProduct();
    products.submitSearch();
    products.verifySearchedProduct();
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    common.goToSubscribeSection();
    common.typeEmailtoSubscribe(email);
    common.clickSubscribe();
    common.verifySubscriptionMessage();
  });

  it('Test Case 11: Verify Subscription in Cart page', () => {
    common.clickOnCart();
    common.typeEmailtoSubscribe(email);
    common.clickSubscribe();
    common.verifySubscriptionMessage();
  });

  it('Test Case 12: Add Products in Cart', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.scrollOverProduct1();
    products.addToCartpopup();
    products.continueShoppingPopup();
    products.scrollOverProduct2();
    products.addToCartpopup();
    products.viewCartpopup();
    cart.verifyProductsInCart();
  });

  it('Test Case 13: Verify Product quantity in Cart ', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.openProductDetailPage();
    products.verifyProductDetailPage();
    products.typeProductQuantity();
    products.addToCartProductDetail();
    products.viewCartProductDetail();
    products.verifyQuantity();
  });

  it('Test Case 14: Place Order: Register while Checkout and Delete account', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.openProductDetailPage();
    products.verifyProductDetailPage();
    products.typeProductQuantity();
    products.addToCartProductDetail();
    products.viewCartProductDetail();
    products.verifyQuantity();
    cart.clickProceedToCheckout();
    products.clickRegisterLoginOncheckoutPopup();
    signup.inputFullName(fullname);
    signup.inputSignupEmail(email);
    signup.clickSignupBtn();
    signup.selectGenderMale();
    signup.typePassword(password);
    signup.selectDate();
    signup.selectMonth();
    signup.selectYear();
    signup.checkNewsletter();
    signup.checkOffers();
    signup.inputFirstName(firstname);
    signup.inputLastName(lastname);
    signup.inputCompanyName(company);
    signup.inputAddress(streetaddress);
    signup.inputAddress2(streetaddress);
    signup.selectCountry();
    signup.inputState(state);
    signup.inputCity(city);
    signup.inputZipCode(zipcode);
    signup.inputPhoneNumber(phonenumber);
    signup.clickCreateAccBtn();
    signup.verifyAccCreation();
    login.clickContinueAfterAccCreation();
    login.verifyLogin(fullname);
    common.clickOnCart();
    cart.clickProceedToCheckout();
    checkout.inputOrderComments(faker.lorem.lines(5));
    checkout.clickPlaceOrderBtn();
    payment.enterNameOnCard(cardholder);
    payment.enterCardNumber(cardnumber);
    payment.enterCVC(cvc);
    payment.enterExpiryMonth();
    payment.enterExpiryYear();
    payment.clickPayAndConfirm();
    payment.verifyOrderPlacedSuccessfully();
    common.clickDeleteAccount()
    common.verifyAccountDeleted();
    common.clickContinueBtnToGoToHome();
  });

  it('Test Case 15: Place Order: Register before Checkout and Delete account', () => {
    common.clickSignupLoginBtn();
    signup.inputFullName(fullname);
    signup.inputSignupEmail(email);
    signup.clickSignupBtn();
    signup.selectGenderMale();
    signup.typePassword(password);
    signup.selectDate();
    signup.selectMonth();
    signup.selectYear();
    signup.checkNewsletter();
    signup.checkOffers();
    signup.inputFirstName(firstname);
    signup.inputLastName(lastname);
    signup.inputCompanyName(company);
    signup.inputAddress(streetaddress);
    signup.inputAddress2(streetaddress);
    signup.selectCountry();
    signup.inputState(state);
    signup.inputCity(city);
    signup.inputZipCode(zipcode);
    signup.inputPhoneNumber(phonenumber);
    signup.clickCreateAccBtn();
    signup.verifyAccCreation();
    login.clickContinueAfterAccCreation();
    login.verifyLogin(fullname);
    products.openProductsPage();
    products.verifyProductsPage();
    products.openProductDetailPage();
    products.verifyProductDetailPage();
    products.typeProductQuantity();
    products.addToCartProductDetail();
    products.viewCartProductDetail();
    products.verifyQuantity();
    cart.clickProceedToCheckout();
    checkout.verifyCheckoutScreen();
    checkout.inputOrderComments(faker.lorem.lines(5));
    checkout.clickPlaceOrderBtn();
    payment.enterNameOnCard(cardholder);
    payment.enterCardNumber(cardnumber);
    payment.enterCVC(cvc);
    payment.enterExpiryMonth();
    payment.enterExpiryYear();
    payment.clickPayAndConfirm();
    payment.verifyOrderPlacedSuccessfully();
    common.clickDeleteAccount()
    common.verifyAccountDeleted();
    common.clickContinueBtnToGoToHome();
  });

  it('Test Case 16: Place Order: Login before Checkout and Delete account', () => {
    common.clickSignupLoginBtn();
    login.inputLoginEmail(loginMail);
    login.inputLoginPass(loginPass);
    login.clickLoginBtn();
    login.verifyLogin(registeredUser);
    products.openProductsPage();
    products.verifyProductsPage();
    products.openProductDetailPage();
    products.verifyProductDetailPage();
    products.typeProductQuantity();
    products.addToCartProductDetail();
    products.viewCartProductDetail();
    products.verifyQuantity();
    cart.clickProceedToCheckout();
    checkout.verifyCheckoutScreen();
    checkout.inputOrderComments(faker.lorem.lines(5));
    checkout.clickPlaceOrderBtn();
    payment.enterNameOnCard(cardholder);
    payment.enterCardNumber(cardnumber);
    payment.enterCVC(cvc);
    payment.enterExpiryMonth();
    payment.enterExpiryYear();
    payment.clickPayAndConfirm();
    payment.verifyOrderPlacedSuccessfully();
    // common.clickDeleteAccount()
    // common.verifyAccountDeleted();
    // common.clickContinueBtnToGoToHome();
  });

  it('Test Case 17: Remove Products From Cart', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.openProductDetailPage();
    products.verifyProductDetailPage();
    products.typeProductQuantity();
    products.addToCartProductDetail();
    products.viewCartProductDetail();
    products.verifyQuantity();
    cart.removeFromCart();
    cart.verifyEmptyCart();
  });

  it('Test Case 18: View Category Products', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.verifyCategories();
    products.clickCategoryWomen();
    products.clickCategoryWomenDress();
    products.verifyCategoryWomenDress();
    products.clickCategoryMen();
    products.clickCategoryMenTshirts();
    products.verifyategoryMenTshirts();
  });

  it('Test Case 19: View & Cart Brand Products', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.verifyContainsBrands();
    products.verifyContainsBrandsPolo();
    products.verifyContainsBrandsHM();
    products.verifyContainsBrandsMadame();
    products.verifyContainsBrandsMastHarbour();
    products.verifyContainsBrandsBabyhug();
    products.verifyContainsBrandsAllenSollyJunior();
    products.verifyContainsBrandsKookieKids();
    products.verifyContainsBrandsBiba();
    products.clickBrandPolo();
    products.verifyBrandPoloDetailPage();
    products.clickBrandBiba();
    products.verifyBrandBibaDetailPage();
  });

  it.only('Test Case 20: Search Products and Verify Cart After Login ', () => {
    products.openProductsPage();
    products.verifyProductsPage();
    products.verifyContainsBrands();
    products.verifyContainsBrandsPolo();
    products.verifyContainsBrandsHM();
    products.verifyContainsBrandsMadame();
    products.verifyContainsBrandsMastHarbour();
    products.verifyContainsBrandsBabyhug();
    products.verifyContainsBrandsAllenSollyJunior();
    products.verifyContainsBrandsKookieKids();
    products.verifyContainsBrandsBiba();
    products.openProductsPage();
    products.verifyProductsPage();
    products.searchProduct();
    products.submitSearch();
    products.verifySearchedProduct();
    products.addToCartMenTshirt();
    products.continueShoppingPopup();
    products.addToCartMadameTopForWomen();
    products.continueShoppingPopup();
    products.addToCartLaceTopForWomen();
    products.continueShoppingPopup();
    products.addToCartGRAPHICDESIGNMENTSHIRTBLUE();
    products.continueShoppingPopup();
    products.clickNavbarCart();
    cart.verifyMenTshirtInCart();
    cart.verifyMadameTopForWomenInCart();
    cart.verifyLaceTopForWomenInCart();
    cart.verifyGRAPHICDESIGNMENTSHIRTBLUEinCart();
    common.clickSignupLoginBtn();
    login.inputLoginEmail(loginMail);
    login.inputLoginPass(loginPass);
    login.clickLoginBtn();
    products.clickNavbarCart();
    cart.verifyMenTshirtInCart();
    cart.verifyMadameTopForWomenInCart();
    cart.verifyLaceTopForWomenInCart();
    cart.verifyGRAPHICDESIGNMENTSHIRTBLUEinCart();
  });

  it('Test Case 21: Add review on product ', () => {
    cy.contains('Products').click()
    cy.url().should('contain', '/products')
    cy.get('.left-sidebar > :nth-child(1)').should('contain', 'Category')
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').should('contain', 'View Product').click()
    cy.url().should('contain', '/product_details')
    cy.get('.product-information > h2').should('contain', 'Blue Top')
    cy.get('#name').clear().type(faker.person.fullName())
    cy.get('#email').clear().type(faker.internet.exampleEmail())
    cy.get('#review').clear().type(faker.lorem.paragraphs(5))
    cy.get('#button-review').click()
    cy.get('.alert-success > span').should('contain', 'Thank you for your review')
  });

  it('Test Case 22: Add to cart from Recommended items', () => {
    cy.scrollTo('0%', '90%', { duration: 2000 })
    cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain', 'Continue Shopping').click()
    cy.get('.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain', 'Continue Shopping').click()
    cy.get('.active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.contains('View Cart').click()
    cy.url().should('contain', '/view_cart')
    cy.get('#product-4').should('be.visible')
    cy.get('#product-5').should('be.visible')
    cy.get('#product-6').should('be.visible')
  });

  it('Test Case 23: Verify address details in checkout page', () => {
    cy.contains(' Signup / Login').click()
    cy.get('input[name="name"]').should('be.visible').clear().type(firstname + ' ' + lastname)
    cy.get('[data-qa="signup-email"]').should('be.visible').clear().type(email)
    cy.get('[data-qa="signup-button"]').should('contain', 'Signup').click()
    cy.url().should('contain', 'https://www.automationexercise.com/signup')
    cy.get('#id_gender1').should('not.be.checked').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').should('contain', 'Day', 'have.value', 'Day').select('1')
    cy.get('[data-qa="months"]').should('contain', 'Month', 'have.value', 'Month').select('February')
    cy.get('[data-qa="years"]').should('contain', 'Year', 'have.value', 'Year').select('2000')
    cy.get('#newsletter').should('be.visible').should('not.be.checked').check()
    cy.get('#optin').should('be.visible').should('not.be.checked').check()
    cy.get('[data-qa="first_name"]').should('be.visible').clear().type(firstname)
    cy.get('[data-qa="last_name"]').should('be.visible').clear().type(lastname)
    cy.get('[data-qa="company"]').should('be.visible').clear().type(company)
    cy.get('[data-qa="address"]').should('be.visible').clear().type(streetaddress)
    cy.get('[data-qa="address2"]').should('be.visible').clear().type(streetaddress)
    cy.get('[data-qa="country"]').should('contain', 'India', 'have.value', 'India').select('United States')
    cy.get('[data-qa="state"]').should('be.visible').clear().type(state)
    cy.get('[data-qa="city"]').should('be.visible').clear().type(city)
    cy.get('[data-qa="zipcode"]').should('be.visible').clear().type(zipcode)
    cy.get('[data-qa="mobile_number"]').should('be.visible').clear().type(phonenumber)
    cy.get('[data-qa="create-account"]').should('be.enabled').click()
    cy.url().should('contain', 'https://www.automationexercise.com/account_created')
    cy.get('b').should('be.visible').should('contain', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()
    cy.get(':nth-child(10) > a').should('contain', firstname + ' ' + lastname)
    cy.scrollTo('0%', '90%', { duration: 2000 })
    cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain', 'Continue Shopping').click()
    cy.get('.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain', 'Continue Shopping').click()
    cy.get('.active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.contains('View Cart').click()
    cy.url().should('contain', '/view_cart')
    cy.get('#product-4').should('be.visible')
    cy.get('#product-5').should('be.visible')
    cy.get('#product-6').should('be.visible')
    cy.get('.col-sm-6 > .btn').should('contain', 'Proceed To Checkout').click()
    cy.get(':nth-child(2) > .heading').should('contain', 'Address Details')
    cy.get('#address_delivery > .address_title > .page-subheading').should('contain', 'Your delivery address')
    cy.get('#address_delivery > .address_firstname').should('contain', 'Mr.' + ' ' + firstname + ' ' + lastname)
    cy.get('#address_delivery > :nth-child(3)').should('contain', company)
    cy.get('#address_delivery > :nth-child(4)').should('contain', streetaddress)
    cy.get('#address_delivery > :nth-child(5)').should('contain', streetaddress)
    cy.get('#address_delivery > .address_city').should('contain', state)
    cy.get('#address_delivery > .address_country_name').should('contain', 'United States')
    cy.get('#address_delivery > .address_phone').should('contain', phonenumber)
    cy.get('#address_invoice > .address_title > .page-subheading').should('contain', 'Your billing address')
    cy.get('#address_invoice > .address_firstname').should('contain', 'Mr.' + ' ' + firstname + ' ' + lastname)
    cy.get('#address_invoice > :nth-child(3)').should('contain', company)
    cy.get('#address_invoice > :nth-child(4)').should('contain', streetaddress)
    cy.get('#address_invoice > :nth-child(5)').should('contain', streetaddress)
    cy.get('#address_invoice > .address_city').should('contain', state)
    cy.get('#address_invoice > .address_country_name').should('contain', 'United States')
    cy.get('#address_invoice > .address_phone').should('contain', phonenumber)
    cy.get(':nth-child(5) > a').should('contain', ' Delete Account').click()
    cy.url().should('contain', '/delete_account')
    cy.get('b').should('be.visible').should('contain', 'Account Deleted!')
    cy.get('[data-qa="continue-button"]').should('contain', 'Continue').click()
    cy.url().should('eq', 'https://www.automationexercise.com/')
  });

  it('Test Case 24: Download and verify the Invoice after purchase order ', () => {
    cy.scrollTo('0%', '90%', { duration: 2000 })
    cy.get('.active > :nth-child(1) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain', 'Continue Shopping').click()
    cy.get('.active > :nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.get('.modal-footer > .btn').should('contain', 'Continue Shopping').click()
    cy.get('.active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').should('contain', 'Add to cart').click()
    cy.contains('View Cart').click()
    cy.url().should('contain', '/view_cart')
    cy.get('#product-4').should('be.visible')
    cy.get('#product-5').should('be.visible')
    cy.get('#product-6').should('be.visible')
    cy.get('.col-sm-6 > .btn').should('contain', 'Proceed To Checkout').click()
    cy.get('.modal-body > :nth-child(2) > a > u').should('contain', 'Register / Login').click()
    cy.get('input[name="name"]').should('be.visible').clear().type(firstname + ' ' + lastname)
    cy.get('[data-qa="signup-email"]').should('be.visible').clear().type(email)
    cy.get('[data-qa="signup-button"]').should('contain', 'Signup').click()
    cy.url().should('contain', 'https://www.automationexercise.com/signup')
    cy.get('#id_gender1').should('not.be.checked').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').should('contain', 'Day', 'have.value', 'Day').select('1')
    cy.get('[data-qa="months"]').should('contain', 'Month', 'have.value', 'Month').select('February')
    cy.get('[data-qa="years"]').should('contain', 'Year', 'have.value', 'Year').select('2000')
    cy.get('#newsletter').should('be.visible').should('not.be.checked').check()
    cy.get('#optin').should('be.visible').should('not.be.checked').check()
    cy.get('[data-qa="first_name"]').should('be.visible').clear().type(firstname)
    cy.get('[data-qa="last_name"]').should('be.visible').clear().type(lastname)
    cy.get('[data-qa="company"]').should('be.visible').clear().type(company)
    cy.get('[data-qa="address"]').should('be.visible').clear().type(streetaddress)
    cy.get('[data-qa="address2"]').should('be.visible').clear().type(streetaddress)
    cy.get('[data-qa="country"]').should('contain', 'India', 'have.value', 'India').select('United States')
    cy.get('[data-qa="state"]').should('be.visible').clear().type(state)
    cy.get('[data-qa="city"]').should('be.visible').clear().type(city)
    cy.get('[data-qa="zipcode"]').should('be.visible').clear().type(zipcode)
    cy.get('[data-qa="mobile_number"]').should('be.visible').clear().type(phonenumber)
    cy.get('[data-qa="create-account"]').should('be.enabled').click()
    cy.url().should('contain', 'https://www.automationexercise.com/account_created')
    cy.get('b').should('be.visible').should('contain', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()
    cy.get(':nth-child(10) > a').should('contain', firstname + ' ' + lastname)
    cy.get('.shop-menu > .nav > :nth-child(3) > a').should('contain', 'Cart').click()
    cy.get('.col-sm-6 > .btn').should('contain', 'Proceed To Checkout').click()
    cy.get(':nth-child(2) > .heading').should('contain', 'Address Details')
    cy.get('#address_delivery > .address_title > .page-subheading').should('contain', 'Your delivery address')
    cy.get('#address_delivery > .address_firstname').should('contain', 'Mr.' + ' ' + firstname + ' ' + lastname)
    cy.get('#address_delivery > :nth-child(3)').should('contain', company)
    cy.get('#address_delivery > :nth-child(4)').should('contain', streetaddress)
    cy.get('#address_delivery > :nth-child(5)').should('contain', streetaddress)
    cy.get('#address_delivery > .address_city').should('contain', state)
    cy.get('#address_delivery > .address_country_name').should('contain', 'United States')
    cy.get('#address_delivery > .address_phone').should('contain', phonenumber)
    cy.get('#address_invoice > .address_title > .page-subheading').should('contain', 'Your billing address')
    cy.get('#address_invoice > .address_firstname').should('contain', 'Mr.' + ' ' + firstname + ' ' + lastname)
    cy.get('#address_invoice > :nth-child(3)').should('contain', company)
    cy.get('#address_invoice > :nth-child(4)').should('contain', streetaddress)
    cy.get('#address_invoice > :nth-child(5)').should('contain', streetaddress)
    cy.get('#address_invoice > .address_city').should('contain', state)
    cy.get('#address_invoice > .address_country_name').should('contain', 'United States')
    cy.get('#address_invoice > .address_phone').should('contain', phonenumber)
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
    cy.get('[data-qa="continue-button"]').should('contain', 'Continue').click()
    cy.url().should('eq', 'https://www.automationexercise.com/')
    cy.get('.shop-menu > .nav > :nth-child(5) > a').should('contain', ' Delete Account').click()
    cy.url().should('contain', '/delete_account')
    cy.get('b').should('be.visible').should('contain', 'Account Deleted!')
    cy.get('[data-qa="continue-button"]').should('contain', 'Continue').click()
    cy.url().should('eq', 'https://www.automationexercise.com/')
  });

  it('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality ', () => {
    cy.scrollTo('bottom', { duration: 2000 })
    cy.get('#susbscribe_email').should('be.visible')
    cy.get('#scrollUp', { duration: 2000 }).should('be.visible').click()
    cy.get('.active > :nth-child(1) > h1').should('contain', 'AutomationExercise')
    cy.get('.active > :nth-child(1) > h2').should('contain', 'Full-Fledged practice website for Automation Engineers')
  });

  it('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
    cy.scrollTo('bottom', { duration: 2000 })
    cy.get('#susbscribe_email').should('be.visible')
    cy.scrollTo('top', { duration: 2000 })
    cy.get('.active > :nth-child(1) > h1').should('contain', 'AutomationExercise')
    cy.get('.active > :nth-child(1) > h2').should('contain', 'Full-Fledged practice website for Automation Engineers')
  });
})

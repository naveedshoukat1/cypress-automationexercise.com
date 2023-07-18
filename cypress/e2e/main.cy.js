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
  let password = faker.internet.password({ length: 10, memorable: false, pattern: /[A-Z]/ })
  let email = faker.internet.exampleEmail({ delay: 10, allowSpecialCharacters: true })
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

  it('Test Case 20: Search Products and Verify Cart After Login ', () => {
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
    products.openProductsPage();
    products.verifyProductsPage();
    products.openProductDetailPage();    
    products.inputReviewerName(faker.person.fullName())
    products.inputReviewerEmail(faker.internet.exampleEmail());
    products.inputReview(faker.lorem.paragraphs(5));
    products.clickSubmitRevieBtn();
    products.verifySubmittedReview();
  });

  it('Test Case 22: Add to cart from Recommended items', () => {
    common.scrollToRecommendedSection()
    common.addToCartrecommendedProduct1();
    products.continueShoppingPopup();
    common.addToCartrecommendedProduct2();
    products.continueShoppingPopup();
    common.addToCartrecommendedProduct3();
    products.viewCartpopup();
    cart.verifyCartUrl();
    cart.verifyProduct1InCart();
    cart.verifyProduct2InCart();
    cart.verifyProduct3InCart();
  });

  it('Test Case 23: Verify address details in checkout page', () => {
    common.clickSignupLoginBtn();
    signup.inputFullName(firstname + ' ' + lastname)
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
    login.verifyLogin(firstname + ' ' + lastname);
    common.scrollToRecommendedSection()
    common.addToCartrecommendedProduct1();
    products.continueShoppingPopup();
    common.addToCartrecommendedProduct2();
    products.continueShoppingPopup();
    common.addToCartrecommendedProduct3();
    products.viewCartpopup();
    cart.verifyCartUrl();
    cart.verifyProduct1InCart();
    cart.verifyProduct2InCart();
    cart.verifyProduct3InCart();
    cart.clickProceedToCheckout();
    cart.verifyAddressDetails();
    cart.verifyYourDeliveryAddress(); 
    cart.verifyFirstAndLastName(firstname, lastname);
    cart.verifyAddress_delivery1(company);
    cart.verifyAddress_delivery2(streetaddress);
    cart.verifyAddress_delivery3(streetaddress);
    cart.verifyAddress_city(state);
    cart.verifyAddress_country();
    cart.verifyaddress_phone(phonenumber);
    cart.verifyBilling_address(); 
    cart.verifyAddress_invoice_name(firstname, lastname); 
    cart.verifyAddress_invoice1(company); 
    cart.verifyaddress_invoice2(streetaddress); 
    cart.verifyaddress_invoice3(streetaddress); 
    cart.verifyAddress_invoice_city(state); 
    cart.verifyAddress_invoice_country(); 
    cart.verifyAddress_invoice_phone(phonenumber);
    common.clickDeleteAccount();
    common.verifyAccountDeleted();
    common.clickContinueBtnToGoToHome();
  });

  it('Test Case 24: Download and verify the Invoice after purchase order ', () => {
    common.scrollToRecommendedSection()
    common.addToCartrecommendedProduct1();
    products.continueShoppingPopup();
    common.addToCartrecommendedProduct2();
    products.continueShoppingPopup();
    common.addToCartrecommendedProduct3();
    products.viewCartpopup();
    cart.verifyCartUrl();
    cart.verifyProduct1InCart();
    cart.verifyProduct2InCart();
    cart.verifyProduct3InCart();
    cart.clickProceedToCheckout();
    products.clickRegisterLoginOncheckoutPopup();
    signup.inputFullName(firstname + ' ' + lastname)
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
    login.verifyLogin(firstname + ' ' + lastname);
    common.clickOnCart();
    cart.verifyCartUrl();
    cart.verifyProduct1InCart();
    cart.verifyProduct2InCart();
    cart.verifyProduct3InCart();
    cart.clickProceedToCheckout();
    cart.verifyAddressDetails();
    cart.verifyYourDeliveryAddress(); 
    cart.verifyFirstAndLastName(firstname, lastname);
    cart.verifyAddress_delivery1(company);
    cart.verifyAddress_delivery2(streetaddress);
    cart.verifyAddress_delivery3(streetaddress);
    cart.verifyAddress_city(state);
    cart.verifyAddress_country();
    cart.verifyaddress_phone(phonenumber);
    cart.addOrderComments(faker.lorem.paragraphs(5))
    checkout.clickPlaceOrderBtn();
    payment.enterNameOnCard(cardholder);
    payment.enterCardNumber(cardnumber);
    payment.enterCVC(cvc);
    payment.enterExpiryMonth();
    payment.enterExpiryYear();
    payment.clickPayAndConfirm();
    payment.verifyOrderPlacedSuccessfully();
    payment.downloadAndVerifyInvoice();
    common.clickContinueBtnToGoToHome();
    common.clickDeleteAccount()
    common.verifyAccountDeleted();
    common.clickContinueBtnToGoToHome();
  });

  it('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality ', () => {
    common.scrollToBottom();
    common.verifySusbscribeEmailSelector();
    common.clickScrollUpBtn();
    common.verifyAutomationExerciseText();
    common.verifyFull_FledgedText();
  });

  it('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', () => {
    common.scrollToBottom();
    common.verifySusbscribeEmailSelector();
    common.scrollToTop();
    common.verifyAutomationExerciseText();
    common.verifyFull_FledgedText();
  });
})

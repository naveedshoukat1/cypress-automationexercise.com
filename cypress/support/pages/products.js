export class Products {
    constructor() {
        this.categorySelector = '.left-sidebar > :nth-child(1)';
        this.viewProductSelector = ':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a';
        this.blueTop = '.product-information > h2';
        this.categoryWomenTopsSelector = '.product-information > :nth-child(3)';
        this.price500 = ':nth-child(5) > span';
        this.availabilityInStock = '.product-information > :nth-child(6)';
        this.condition = '.product-information > :nth-child(7)';
        this.brandPolo = '.product-information > :nth-child(8)';
        this.searchProductSelector = '#search_product';
        this.submitSearchSelector = '#submit_search';
        this.productCardSelecetor1 = ':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > img';
        this.continueShoppingPopupSelector = '.modal-footer > .btn';
        this.productCardSelecetor2 = ':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > img';
        this.quantitySelector = '#quantity';
        this.productDetailAddToCartSelector = ':nth-child(5) > .btn';
        this.registerLoginOncheckoutPopupSelector = '.modal-body > :nth-child(2) > a > u';
        this.categoryWomen = ':nth-child(1) > .panel-heading > .panel-title > a';
        this.categoryMen = ':nth-child(2) > .panel-heading > .panel-title > a';
        this.categoryKids = ':nth-child(3) > .panel-heading > .panel-title > a';
        this.categoryBrands = '.brands_products > h2';
        this.categoryWomenDress = '#Women > .panel-body > ul > :nth-child(1) > a';
        this.categoryMenTshirts = '#Men > .panel-body > ul > :nth-child(1) > a';
        this.brands = '.brands_products > h2';
        this.brandPolo = '.brands-name > .nav > :nth-child(1) > a';
        this.brandHM = '.brands-name > .nav > :nth-child(2) > a';
        this.BrandMadame = '.brands-name > .nav > :nth-child(3) > a';
        this.BrandsMastHarbour = '.brands-name > .nav > :nth-child(4) > a'
        this.BrandBabyhug = '.brands-name > .nav > :nth-child(5) > a';
        this.BrandAllenSollyJunior = '.brands-name > .nav > :nth-child(6) > a';
        this.BrandsKookieKids = '.brands-name > .nav > :nth-child(7) > a';
        this.BrandsBiba = '.brands-name > .nav > :nth-child(8) > a';
        this.AddToCartMenTshirt = ':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn';
        this.AddToCartMadameTopForWomen = ':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn';
        this.AddToCartLaceTopForWomen = ':nth-child(5) > .product-image-wrapper > .single-products > .productinfo > .btn';
        this.AddToCartGRAPHICDESIGNMENTSHIRTBLUE = ':nth-child(6) > .product-image-wrapper > .single-products > .productinfo > .btn';
        this.navbarCart = '.shop-menu > .nav > :nth-child(3) > a';
    }

    openProductsPage() {
        cy.contains('Products')
            .click()
    }

    verifyProductsPage() {
        cy.url()
            .should('contain', '/products')
        cy.get(this.categorySelector)
            .should('contain', 'Category')
        cy.contains('All Products')
    }

    openProductDetailPage() {
        cy.get(this.viewProductSelector)
            .should('contain', 'View Product')
            .click()
    }

    verifyProductDetailPage() {
        cy.url()
            .should('contain', '/product_details')
        cy.get(this.blueTop)
            .should('contain', 'Blue Top')
        cy.get(this.categoryWomenTopsSelector)
            .should('contain', 'Category: Women > Tops')
        cy.get(this.price500)
            .should('contain', 'Rs. 500')
        cy.get(this.availabilityInStock)
            .should('contain', 'Availability:')
            .should('contain', ' In Stock')
        cy.get(this.condition)
            .should('contain', 'Condition:')
        cy.get(this.brandPolo)
            .should('contain', 'Brand:')
            .should('contain', ' Polo')
    }

    searchProduct() {
        cy.get(this.searchProductSelector)
            .clear()
            .type('Men')
    }

    submitSearch() {
        cy.get(this.submitSearchSelector)
            .click()
    }

    verifySearchedProduct() {
        cy.url()
            .should('contain', '/products?search=Men')
        cy.contains('Searched Products')
    }

    scrollOverProduct1() {
        cy.get(this.productCardSelecetor1).trigger('mouseover')
    }

    addToCartpopup() {
        cy.contains('Add to cart').click()
    }

    continueShoppingPopup() {
        cy.get(this.continueShoppingPopupSelector)
            .should('contain', 'Continue Shopping')
            .click()
    }
    scrollOverProduct2() {
        cy.get(this.productCardSelecetor2)
            .trigger('mouseover')
    }

    viewCartpopup() {
        cy.contains('View Cart')
            .click()
    }

    typeProductQuantity() {
        cy.get(this.quantitySelector)
            .clear()
            .type('4')
    }

    addToCartProductDetail() {
        cy.get(this.productDetailAddToCartSelector)
            .should('contain', 'Add to cart')
            .click()
    }

    viewCartProductDetail() {
        cy.contains('View Cart')
            .click()
    }

    verifyQuantity() {
        cy.get('.quantity').should('contain', 'Quantity')
        cy.get('.disabled')
            .contains('4')
    }

    clickRegisterLoginOncheckoutPopup() {
        cy.get(this.registerLoginOncheckoutPopupSelector)
            .should('contain', 'Register / Login')
            .click()
    }

    verifyCategories() {
        cy.get(this.categoryWomen)
            .should('contain', 'Women')
        cy.get(this.categoryMen)
            .should('contain', 'Men')
        cy.get(this.categoryKids)
            .should('contain', 'Kids')
        cy.get(this.categoryBrands)
            .should('contain', 'Brands')
    }
    clickCategoryWomen() {
        cy.get(this.categoryWomen)
            .should('contain', 'Women')
            .click()
    }
    clickCategoryWomenDress() {
        cy.get(this.categoryWomenDress)
            .should('contain', 'Dress')
            .click()
    }
    verifyCategoryWomenDress() {
        cy.url().should('contain', '/category_products')
        cy.get('.title')
            .should('contain', 'Women - Dress Products')
    }
    clickCategoryMen() {
        cy.get(this.categoryMen)
            .should('contain', 'Men')
            .click()
    }
    clickCategoryMenTshirts() {
        cy.get(this.categoryMenTshirts)
            .should('contain', 'Tshirts ')
            .click()
    }
    verifyategoryMenTshirts() {
        cy.url()
            .should('contain', '/category_products/')
    }

    verifyContainsBrands() {
        cy.get(this.brands)
            .should('contain', 'Brands')
    }
    verifyContainsBrandsPolo() {

        cy.get(this.brandPolo)
            .should('contain', 'Polo')
    }
    verifyContainsBrandsHM() {
        cy.get(this.brandHM)
            .should('contain', 'H&M')
    }
    verifyContainsBrandsMadame() {
        cy.get(this.BrandMadame)
            .should('contain', 'Madame')
    }
    verifyContainsBrandsMastHarbour() {
        cy.get(this.BrandsMastHarbour)
            .should('contain', 'Mast & Harbour')
    }
    verifyContainsBrandsBabyhug() {
        cy.get(this.BrandBabyhug)
            .should('contain', 'Babyhug')
    }
    verifyContainsBrandsAllenSollyJunior() {
        cy.get(this.BrandAllenSollyJunior)
            .should('contain', 'Allen Solly Junior')
    }
    verifyContainsBrandsKookieKids() {
        cy.get(this.BrandsKookieKids)
            .should('contain', 'Kookie Kids')
    }
    verifyContainsBrandsBiba() {
        cy.get(this.BrandsBiba)
            .should('contain', 'Biba')
    }
    clickBrandPolo() {
        cy.get(this.brandPolo)
            .should('contain', 'Polo')
            .click()
    }
    verifyBrandPoloDetailPage() {
        cy.get('.title')
            .should('contain', 'Brand - Polo Products')
    }
    clickBrandBiba() {
        cy.get(this.BrandsBiba)
            .should('contain', 'Biba')
            .click()
    }
    verifyBrandBibaDetailPage() {
        cy.get('.title')
            .should('contain', 'Brand - Biba Products')
    }
    addToCartMenTshirt() {
        cy.get(this.AddToCartMenTshirt)
            .should('contain', 'Add to cart')
            .click()

    }
    addToCartMadameTopForWomen() {
        cy.get(this.AddToCartMadameTopForWomen)
            .should('contain', 'Add to cart'
            ).click()
    }
    addToCartLaceTopForWomen() {
        cy.get(this.AddToCartLaceTopForWomen)
            .should('contain', 'Add to cart')
            .click()
    }
    addToCartGRAPHICDESIGNMENTSHIRTBLUE() {
        cy.get(this.AddToCartGRAPHICDESIGNMENTSHIRTBLUE)
            .should('contain', 'Add to cart')
            .click()
    }
    clickNavbarCart() {
        cy.get(this.navbarCart)
            .should('contain', ' Cart')
            .click()
    }

}
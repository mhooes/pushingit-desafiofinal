export class onlineShop {

constructor() {
    this.closeModal = '//footer//child::button[@id="closeModal"]';
    this.shoppingCart = '#goShoppingCart'
};

    addProductOne() {
        cy.fixture('products').then(productList => {
            cy.xpath(productList.ProductOne.addCart).click();
        });
    };

    addProductTwo() {
        cy.fixture('products').then(productList => {
            cy.xpath(productList.ProductTwo.addCart).click();
        });
    };

    clickCloseModal() {
        cy.xpath(this.closeModal).click();
    };

    goTocart() {
        cy.get(this.shoppingCart).click();
    }
}
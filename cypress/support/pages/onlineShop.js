export class onlineShop {

    constructor() {
        this.closeModal = '//footer//child::button[@id="closeModal"]';
        this.shoppingCart = '#goShoppingCart'
        this.addRedCap = '//button[@value="Red Cap"]';
        this.addBeigeShorts = '//button[@value="Beige Shorts"]'
    };

    addProductOne() {
        cy.xpath(this.addRedCap).click();

    };

    addProductTwo() {
        cy.xpath(this.addBeigeShorts).click();

    };

    clickCloseModal() {
        cy.xpath(this.closeModal).click();
    };

    goTocart() {
        cy.get(this.shoppingCart).click();
    }
}
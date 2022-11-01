export class home {
    constructor() {
        this.shopLink = "//a[@id='onlineshoplink']";
    };

    clickOnlineShop() {
        cy.xpath(this.shopLink).click()
    }
}
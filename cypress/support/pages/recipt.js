export class recipt {
  
    constructor() {
        this.name = '//div//p[@id="name"]'
        this.cardNumber = '//div//p[@id="creditCard"]'
        this.totalPrice = '//div//p[@id="totalPrice"]'
        this.buttonThankYou = ' //button[text()="Thank you"]'
    }

    progressBarDisappear() {
        return cy.get('[role="progressbar"]', {timeout:15000})
    }

    checkName() {
        return cy.xpath(this.name);
    };

    checkProduct(product) {
        return cy.xpath(`//div//p[text()="${product}"]`);
    };

    checkCardNumber() {
        return cy.xpath(this.cardNumber);
    };

    checkTotalPrice() {
        return cy.xpath(this.totalPrice);
    };

    clickThankYouButton() {
        cy.xpath(this.buttonThankYou).click()
    }
}
export class shoppingCart {
  constructor() {
    this.buttonCheckout = '//div//button[text()="Go to Checkout"]'
  }

    getNameProduct(productName) {
      return cy.xpath(`//*[@name="${productName}"]`);

    };

    getPriceProduct(productName) {
        return cy.contains(productName).siblings('#productPrice');
  
      };

    showTotalPrice() {
        cy.xpath('//button[text()="Show total price"]').click();
    }

    totalPrice() {
        return cy.get('#price > b:nth-child(1)');
    }

    clickButtonCheckout(){
      cy.xpath(this.buttonCheckout).click()

    }
}
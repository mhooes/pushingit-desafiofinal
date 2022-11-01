export class shoppingCart {

    getNameProductOne() {
        return cy.fixture('products').then(name => {
            cy.get(`[name="${name.ProductOne.product}"]`);
        });
    };

    getNameProductTwo() {
        return cy.fixture('products').then(name => {
            cy.get(`[name="${name.ProductTwo.product}"]`);
        });
    };

    showTotalPrice() {
        cy.xpath('//button[text()="Show total price"]').click();
    }

    totalPrice() {
        return cy.get('#price > b:nth-child(1)');
    }
}
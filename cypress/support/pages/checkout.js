export class checkout {
constructor() {
    this.firstName = '#FirstName';
    this.lastName = '#lastName';
    this.cardNumber = '#cardNumber';
    this.purchaseButton = ' //button[text()="Purchase"]';
}

typeFirsName(name){
    cy.get(this.firstName).type(name);
};

typeLastName(lastName){
    cy.get(this.lastName).type(lastName);
};

typecardNumber(card){
    cy.get(this.cardNumber).type(card);
};

clickButtonPurchase() {
    cy.xpath(this.purchaseButton).click();
};

};
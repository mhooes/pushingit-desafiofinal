export class login {
    constructor() {
         this.user = '#user';
         this.pass = '#pass';
         this.loginButton = '#submitForm'
    }

    typeUser() {
        return cy.get(this.user);
    };

    typePass() {
        return cy.get(this.pass);
    };

    loginClick() {
        cy.get(this.loginButton).click()
    }
}
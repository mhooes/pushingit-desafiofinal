export class register {

    constructor() {

        this.iniciaSesion = '#registertoggle';
    };

    dblclickIniciaSesion() {
        cy.get(this.iniciaSesion).dblclick()
    }
    
}
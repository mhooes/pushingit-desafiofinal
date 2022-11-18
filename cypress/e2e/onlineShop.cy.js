/// <reference types="cypress" />

//POM//
import { home } from '../support/pages/home'
import { onlineShop } from '../support/pages/onlineShop'
import { shoppingCart } from '../support/pages/shoppingCart'
import { checkout } from '../support/pages/checkout'
import { recipt } from '../support/pages/recipt'
const DATOS = require('../support/constants')

describe('Desafio Final', () => {

  //POM Const//
  const homePage = new home();
  const onlineShopPage = new onlineShop();
  const cartPage = new shoppingCart();
  const checkoutPage = new checkout();
  const reciptPage = new recipt();

  //Fixtures//
  let product, formCheckhout

  before('', () => {

    cy.fixture('products').then(products => {
      product = products;
    });

    cy.fixture('checkoutForm').then(checkoutForm => {
      formCheckhout = checkoutForm;
    });
   
    cy.request({
      method: 'POST',
      url: 'https://pushing-it-backend.herokuapp.com/api/register',
      body: {
        username: DATOS.register.username,
        password: DATOS.register.password,
        gender: DATOS.register.gender,
        day: DATOS.register.day,
        month: DATOS.register.month,
        year: DATOS.register.year
      }
    }).then(respuesta => {
      expect(respuesta.status).eq(200);
      window.localStorage.setItem('token', respuesta.body.token);
      window.localStorage.setItem('user', respuesta.body.newUser.username);
    })
    cy.visit('')

  });

  it('Exito al finalizar compra', () => {
    homePage.clickOnlineShop();
    onlineShopPage.addProduct(product.ProductOne.name)
    onlineShopPage.clickCloseModal();
    onlineShopPage.addProduct(product.ProductTwo.name)
    onlineShopPage.clickCloseModal();
    onlineShopPage.goTocart();
    cartPage.getNameProduct(product.ProductOne.name).should('exist')
    cartPage.getNameProduct(product.ProductTwo.name).should('exist')
    cartPage.getPriceProduct(product.ProductOne.name).should('have.text', `$${product.ProductOne.price}`);
    cartPage.getPriceProduct(product.ProductTwo.name).should('have.text', `$${product.ProductTwo.price}`);
    cartPage.showTotalPrice();
    cartPage.totalPrice().should('have.text', `${product.ProductOne.price + product.ProductTwo.price}`)
    cartPage.clickButtonCheckout();
    checkoutPage.typeFirsName(formCheckhout.firstName);
    checkoutPage.typeLastName(formCheckhout.lastName);
    checkoutPage.typecardNumber(formCheckhout.creditCard);
    checkoutPage.clickButtonPurchase();
    //checkName(), lleva como parametro el timeout dinamico en milisegundo. 15000 = 15 segundos
    reciptPage.checkName(15000).should('contain', `${formCheckhout.firstName} ${formCheckhout.lastName}`);
    reciptPage. checkProduct(product.ProductOne.name).should('exist');
    reciptPage. checkProduct(product.ProductTwo.name).should('exist');
    reciptPage.checkCardNumber().should('contain', formCheckhout.creditCard);
    reciptPage.checkTotalPrice().should('contain', `${product.ProductOne.price + product.ProductTwo.price}`);
    reciptPage.clickThankYouButton();
  });

  after('', () => {
    cy.request('DELETE', 'https://pushing-it-backend.herokuapp.com/api/deleteuser/' + DATOS.register.username).then(respuesta => {
      expect(respuesta.status).equal(200);
    });
  });

});

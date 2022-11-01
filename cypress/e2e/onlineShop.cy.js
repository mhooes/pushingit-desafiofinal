/// <reference types="cypress" />

//POM//
import { register } from '../support/pages/register'
import { login } from '../support/pages/login'
import { home } from '../support/pages/home'
import { onlineShop } from '../support/pages/onlineShop'
import { shoppingCart } from '../support/pages/shoppingCart'

describe('Pre Entrega', () => {

  //POM Const//
  const registerPage = new register();
  const loginPage = new login();
  const homePage = new home();
  const onlineShopPage = new onlineShop();
  const cartPage = new shoppingCart();

  //Fixtures//
  let loginCredentials
  let prices

  before('Fixtures', () => {
    cy.fixture('login').then(login => {
      loginCredentials = login;
    });

    cy.fixture('products').then(precios => {
          prices = precios;
      });

  });

  beforeEach(() => {
    cy.visit('');
    registerPage.dblclickIniciaSesion();
    loginPage.typeUser().type(loginCredentials.user);
    loginPage.typePass().type(loginCredentials.pass);
    loginPage.loginClick();
  });

  it('Exito al verificar calor acumulado', () => {

    homePage.clickOnlineShop();
    onlineShopPage.addProductOne();
    onlineShopPage.clickCloseModal();
    onlineShopPage.addProductTwo();
    onlineShopPage.clickCloseModal();
    onlineShopPage.goTocart();
    cartPage.getNameProductOne().should('exist').next().invoke('text').should('eq', `$${prices.ProductOne.price}`);
    cartPage.getNameProductTwo().should('exist').next().invoke('text').should('eq', `$${prices.ProductTwo.price}`);
    cartPage.showTotalPrice();
    cartPage.totalPrice().should('have.text', `${prices.ProductOne.price + prices.ProductTwo.price}`)






  })
})
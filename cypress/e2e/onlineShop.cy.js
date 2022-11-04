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
  let product

  before('Fixtures', () => {
    cy.fixture('login').then(login => {
      loginCredentials = login;
    });

    cy.fixture('products').then(products => {
      product = products;
    });

  });

  beforeEach(() => {
    cy.visit('');
    registerPage.dblclickIniciaSesion();
    loginPage.typeUser().type(loginCredentials.user);
    loginPage.typePass().type(loginCredentials.pass);
    loginPage.loginClick();
  });

  it('Exito al verificar valor acumulado', () => {

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
  })
})
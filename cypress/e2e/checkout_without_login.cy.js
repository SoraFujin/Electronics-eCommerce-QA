describe('Checkout Flow without Login', () => {
  it('should allow a guest user to add an item to the cart and attempt checkout', () => {
    cy.visit('http://localhost:3000/'); 

    // Select the first product and add it to the cart
    cy.get('[data-test="product-card"]').first().as('firstProduct');
    cy.get('@firstProduct').find('button[data-test="add-to-cart"]').click();

    // Check that cart count is updated
    cy.get('[data-test="cart-count"]').should('contain', '1');

    // Go to the cart page
    cy.get('[data-test="cart-link"]').click();

    // Ensure we are on the cart page
    cy.url().should('include', '/cart');

    // Ensure item is in the cart
    cy.get('[data-test="cart-item"]').should('exist');

    // Proceed to checkout
    cy.get('[data-test="checkout-button"]').click();

    // Ensure we are on the checkout page
    cy.url().should('include', '/checkout');

    // Verify guest checkout behavior
    cy.contains('Please log in or register to complete your purchase').should('be.visible');
  });
});
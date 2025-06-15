describe('Add to Cart Flow without login', () => {
  it('should let a guest user add and remove an item from the cart', () => {
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

    // Remove the item
    cy.get('[data-test="remove-from-cart"]').click();

    // Check that the cart is empty
    cy.get('[data-test="cart-item"]').should('not.exist');
    cy.contains('Your cart is empty').should('be.visible');
  });
});

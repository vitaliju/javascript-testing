const pageUrl = " http://127.0.0.1:8080/"

describe('Automated tests for local website works', () => {
  it('the page loads successfully', () => {
    cy.visit(pageUrl);
  })

  it('display Registration form on load', () => {
    cy.visit(pageUrl);
    cy.get("h2").should('have.text', 'Registration Form');
    cy.contains('Registration Form');
    cy.contains('h2', 'Registration Form');
  });

  it('Name, Gender, Email, Phone, Date of Birth  form fields are visible and empty', () => {
    cy.visit(pageUrl);
    cy.get('#name').should('be.visible').and('have.value', '');
    cy.get('#gender').should('be.visible').and('have.value', '');
    cy.get('#email').should('be.visible').and('have.value', '');
    cy.get('#phone').should('be.visible');
    cy.get('#dob').should('be.visible').and('have.value', '');
  })

  it('display Submit button on load', () => {
    cy.visit(pageUrl);
    cy.get("button").should('have.text', 'Submit');
  });

  it('display Submitted Information table on load', () => {
    cy.visit(pageUrl);
    cy.get("h3").should('have.text', 'Submitted Information');
  });

  it('Submitted Information table has Name, Gender, Email, Phone, Date of Birth, Age columns', () => {
    cy.visit(pageUrl);
    cy.contains('th', 'Name');
    cy.contains('th', 'Gender');
    cy.contains('th', 'Email');
    cy.contains('th', 'Phone');
    cy.contains('th', 'Date of Birth');
    cy.contains('th', 'Age');
  });

  it('Submitted Information table is empty', () => {
    cy.visit(pageUrl);
    cy.get("tbody").should('have.value', '');
  });

  it('Allows to fill the data', () => {
    cy.visit(pageUrl);
    cy.get("#name").type('Vitalijus');
    cy.get("#gender").select('Male');
    cy.get("#email").type('vitalijus.bielkinas@gmail.com');
    cy.get("#dob").type('1989-01-02');
    cy.get("button").click();
  });
});

/* Check that all elements load

  - Check that Registration title is displayed

  - Check that form is visible and empty

  - Check that the Submit button is visible.

  - The table is visible and empty.
*/

/* Happy path functionlity

  - I am able to fill data and submit it.

  - The table contains the data i have sent

  - After the sending the registration form gets emptied.
*/

// Edges cases

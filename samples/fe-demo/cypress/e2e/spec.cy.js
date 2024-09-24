const pageUrl = " http://127.0.0.1:8080/"

describe('Website loads elements correctly', () => {
  beforeEach(() => {
    cy.visit(pageUrl)
  });

  it('displays Registration form on load', () => {
    cy.get("h2").should('have.text', 'Registration Form');
    //cy.contains('Registration Form');
    //cy.contains('h2', 'Registration Form');
  });

  it('shows Name, Gender, Email, Phone, Date of Birth  labels are visible', () => {
    cy.get('label').should('be.visible').and('have.text', 'Name:Gender:Email:Phone Number:Date of Birth:');
  });

  it('shows Name, Gender, Email, Phone, Date of Birth  inputs  are visible and empty', () => {
    cy.get('#name').should('be.visible').and('have.value', '');
    cy.get('#gender').should('be.visible').and('have.value', '');
    cy.get('#email').should('be.visible').and('have.value', '');
    cy.get('#phone').should('be.visible');
    cy.get('#dob').should('be.visible').and('have.value', '');
  });

  it('displays Submit button on load', () => {
    cy.get("button").should('have.text', 'Submit').click();
  });

  it('display Submitted Information table on load', () => {
    cy.get("h3").should('have.text', 'Submitted Information');
  });

  it('shows Submitted Information table has Name, Gender, Email, Phone, Date of Birth, Age columns', () => {
    cy.contains('th', 'Name');
    cy.contains('th', 'Gender');
    cy.contains('th', 'Email');
    cy.contains('th', 'Phone');
    cy.contains('th', 'Date of Birth');
    cy.contains('th', 'Age');
  });

  it('shows Submitted Information table is empty', () => {
    cy.get("tbody").should('have.value', '');
  });

  it('should not allow form submission with empty fields', () => {
    cy.get('button').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Please fill out all fields.');
    });
  });

  it('Allows to fill the data', () => {
    cy.get("#name").type('Vitalijus');
    cy.get("#gender").select('Male');
    cy.get("#email").type('vitalijus.bielkinas@gmail.com');
    cy.get("#dob").type('1989-01-02');
    cy.get("button").click();
  });

  it('Should display the correct data in the table', () => {
    cy.get("#name").type('Vitalijus');
    cy.get("#gender").select('Male');
    cy.get("#email").type('vitalijus.bielkinas@gmail.com');
    cy.get("#dob").type('1989-01-02');
    cy.get("button").click();
    cy.get('td').should('contain', 'Vitalijus');
    cy.get('td').should('contain', 'Male');
    cy.get('td').should('contain', 'vitalijus.bielkinas@gmail.com');
    cy.get('td').should('contain', '1989-01-02');
    cy.get('td').should('contain', '35');
  });

  it('After the sending the registration form gets emptied.', () => {
    cy.get("#name").type('Vitalijus');
    cy.get("#gender").select('Male');
    cy.get("#email").type('vitalijus.bielkinas@gmail.com');
    cy.get("#dob").type('1989-01-02');
    cy.get("button").click();
    cy.get('#name').should('have.value', '');
    cy.get('#gender').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#phone').should('be.value', '');
    cy.get('#dob').should('have.value', '');
  });
});



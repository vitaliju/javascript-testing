const pageUrl = " http://127.0.0.1:8080/"

function successfullSubmit(name, gender, email, phone, dob) {
  cy.get("#name").type(name);
  cy.get("#gender").select(gender);
  cy.get("#email").type(email);
  cy.get("#phone").clear().type('12356489');
  cy.get("#dob").type('1989-01-02');

  cy.contains('button', 'Submit').click();
};

describe('Website loads elements correctly', () => {
  beforeEach(() => {
    cy.visit(pageUrl)
  });

  describe('Form loading', () => {
    it('displays Registration form on load', () => {
      cy.get("h2").should('have.text', 'Registration Form');
      //cy.contains('Registration Form');
      //cy.contains('h2', 'Registration Form');
    });

    it('shows Name, Gender, Email, Phone, Date of Birth  labels are visible', () => {
      cy.get('label').should('be.visible').and('have.text', 'Name:Gender:Email:Phone Number:Date of Birth:');
    });

    it('shows Name, Gender, Email, Phone, Date of Birth  inputs  are visible and empty', () => {
      cy.get('#name').should('be.visible').and('have.text', '');
      cy.get('#gender').should('be.visible').and('have.value', '');
      cy.get('#email').should('be.visible').and('have.text', '');
      cy.get('#phone').should('be.visible');
      cy.get('#dob').should('be.visible').and('have.text', '');
    });

    it('displays Submit button on load', () => {
      cy.get("button").should('have.text', 'Submit');
      cy.contains('button', 'Submit').click();
    });

    it('displays Submitted Information table on load', () => {
      cy.get("h3").should('have.text', 'Submitted Information');
    });
  });

  describe('Table loading', () => {
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
  });
});

describe('Submit functionality', () => {
  const name = 'Vitalijus';
  const gender = 'Male';
  const email = 'vitalijus.bielkinas@gmail.com';
  const phone = '12356489';
  const dob = '1989-01-02';
  const expectedAge = '35'

  beforeEach(() => {
    cy.visit(pageUrl)
  })

  it('should not allow form submission with empty fields', () => {
    cy.get('button').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Please fill out all fields.');
    });
  });

  it('Allows to fill data, submit and shows up in the table', () => {
    successfullSubmit(name, gender, email, phone, dob);

    cy.get('#infoTable tbody tr').should('have.length', 1)
    cy.get('#infoTable tbody tr')
      .first()  // Select the first row
      .find('td')  // Find all <td> elements in the first row
      .then(($tds) => {
        // Access individual cells
        const nameValue = $tds.eq(0).text(); // Get text from the first column
        const genderValue = $tds.eq(1).text(); // Get text from the first column
        const emailValue = $tds.eq(2).text(); // Get text from the second column
        const phoneValue = $tds.eq(3).text(); // Get text from the second column
        const dobValue = $tds.eq(4).text(); // Get text from the third column
        const ageValue = $tds.eq(5).text(); // Get text from the third column

        expect(nameValue).to.equal(name);
        expect(genderValue).to.equal(gender);
        expect(emailValue).to.equal(email);
        expect(phoneValue).to.equal(phone);
        expect(dobValue).to.equal(dob);
        expect(ageValue).to.equal(expectedAge);
      });
  });

  it('submits clear data', () => {
    successfullSubmit(name, gender, email, phone, dob);

    cy.get('#name').should('have.text', '');
    cy.get('#gender').should('have.value', '');
    cy.get('#email').should('have.text', '');
    cy.get('#phone').should('have.text', '');
    cy.get('#dob').should('have.text', '');
  });
});






describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Uusi henkilo',
      username: 'uhenk',
      password: 'salis'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('uhenk')
      cy.get('#password').type('salis')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('Logg out').click()
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('jki')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong credentials')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('uhenk')
        cy.get('#password').type('salis')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        cy.contains('new Blog').click()
        cy.get('#title').type('TestiTitle')
        cy.get('#author').type('TestiAuthor')
        cy.get('#url').type('TestiUrl')
        cy.contains('save').click()
        cy.contains('TestiTitle')
      })
      it('A blog can be liked', function() {
        cy.contains('new Blog').click()
        cy.get('#title').type('TestiTitle')
        cy.get('#author').type('TestiAuthor')
        cy.get('#url').type('TestiUrl')
        cy.contains('save').click()
        cy.contains('TestiTitle')
          .get('#info')
          .click()
        cy.contains('LIKEME!').click()
        cy.get('#testilike').should('contain', 1)
      })
      it('A blog can be deleted', function() {
        cy.contains('new Blog').click()
        cy.get('#title').type('TestiTitle')
        cy.get('#author').type('TestiAuthor')
        cy.get('#url').type('TestiUrl')
        cy.contains('save').click()
        cy.contains('TestiTitle')
          .get('#info')
          .click()
        cy.contains('Delete').click()
        cy.get('#testilike').should('not.contain', 'TestiTitle')
      })
      it('listed by likes, first biggest like', function() {
        cy.contains('new Blog').click().get('#title').type('TestiTitle')
          .get('#author').type('TestiAuthor')
          .get('#url').type('TestiUrl')
        cy.contains('save').click()
        cy.wait(4000)
        cy.contains('new Blog').click()
          .get('#title').type('TestiTitle2')
          .get('#author').type('TestiAuthor2')
          .get('#url').type('TestiUrl2')
        +
        cy.contains('save').click()
        cy.wait(4000)
        cy.contains('new Blog').click()
          .get('#title').type('TestiTitle3')
          .get('#author').type('TestiAuthor3')
          .get('#url').type('TestiUrl3')
        cy.contains('save').click()

        cy.wait(4000)

        cy.get('.Allblogs').eq(0).contains('TestiTitle')
        cy.get('.Allblogs').eq(1).contains('TestiTitle2')
        cy.get('.Allblogs').eq(2).contains('TestiTitle3')

        cy.get('.Allblogs').eq(2).contains('info').click()
        cy.get('.Allblogs').eq(2).contains('LIKEME!').click()
        cy.wait(4000)
        cy.get('.Allblogs').eq(0).contains('LIKEME!').click()
        cy.wait(4000)
        cy.get('.Allblogs').eq(1).contains('info').click()
        cy.get('.Allblogs').eq(1).contains('LIKEME!').click()

        cy.visit('http://localhost:3000')

        cy.get('.Allblogs').eq(0).contains('TestiTitle3')
        cy.get('.Allblogs').eq(1).contains('TestiTitle')
        cy.get('.Allblogs').eq(2).contains('TestiTitle2')
      })
    })
  })
})

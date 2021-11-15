var URL = 'http://localhost:8888'

describe('the first page you see, without an account', () => {
    it('should show some text about making an account', () => {
        cy.visit(URL)
        cy.get('#content')
            .contains('hello')
            .should('be.visible')
    })
})

/// <reference = cypress>

describe('Testes de criação, registro e login', () => {
    it('Teste de criação de usuário com sucesso', () => {
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type('Luquinhas')
        cy.get('#Text1').type('Luquinhas')
        cy.get('#username').type('Luquinhas')
        cy.get('#password').type('Luquinhas')
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should('contain', 'Registration successful')
    })

    it('Teste de criação de usuário com falha', () => {
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type('Luquinhas')
        cy.get('#Text1').type('Luquinhas')
        cy.get('#username').type('Luquinhas')
        cy.get('.btn-primary').should('be.disabled')
    })

    it('Teste de login com sucesso', () => {
        let infos = criarUser()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('h1.ng-binding').should('contain.text', infos[0])
    })

    it('Teste de login com falha', () => {
        let infos = criarUser()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[0])
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should('contain.text', 'Username or password is incorrect')
    })

    it('Teste de deletar login com sucesso', () => {
        let infos = criarUser()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()

        cy.get('.ng-binding > a').click()
        cy.get('ul.ng-scope').should('contain.text', '')

    })

    it('Teste acessando login deletado',()=>{
        let infos = criarUser()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()

        cy.get('.ng-binding > a').click()
        cy.get('ul.ng-scope').should('contain.text', '')
        cy.get('.btn').click()

        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()

        cy.get('.ng-binding').should('contain.text', 'Username or password is incorrect')
    })
})


function criarUser(){
    let hora = new Date().getHours().toString()
    let minuto = new Date().getMinutes().toString()
    let segundo = new Date().getSeconds().toString()
    let id = hora + minuto + segundo+ 'ID'
    let senha = hora + minuto + segundo + 'SENHA'
    let infos = [id,senha]

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type(id)
    cy.get('#Text1').type(id)
    cy.get('#username').type(id)
    cy.get('#password').type(senha)
    cy.get('.btn-primary').click()
    return infos
}
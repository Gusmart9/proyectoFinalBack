import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing E-commerce de Backend', () => {
    const fakerEmail = faker.internet.email()

    describe('Test de Sessions', () => {
        it('Debe registrar un usuario', async function () {
            this.timeout(5000)
            const user = {
                first_name: 'testing',
                last_name: 'testing',
                email: fakerEmail,
                age: 40,
                password: 'testing',
                cart: null,
                role: 'user'    
            }
            try {
                const response = await requester.post('/api/sessions/register').send(user)
                expect(response.status).to.equal(200)
            } catch (error){
                throw error
            }
        })

    })
})
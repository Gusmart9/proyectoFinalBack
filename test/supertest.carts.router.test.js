import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing de E-commerce de Backend', () => {
    it('Debe leer los productos del carrito y devolver status 200', async () => {
        const result = await requester.get('/api/carts/652695ec83b22b6b60dfe73c')
        expect(result.status).to.equal(200)
    })
})
import mongoose from 'mongoose';
import Product from '../src/dao/product.mongo.dao.js';
import Assert from 'assert';
import config from '../src/config/config.js'
import { faker } from '@faker-js/faker'


const mongoURLTest = config.mongoURLTest

mongoose.connect(mongoURLTest)

const assert = Assert.strict


describe('Testing Product DAO', () => {
    before(async function () {
        this.productDao = new Product()
    })
    beforeEach(async function () {
        try {
            await mongoose.connection.collections.products.drop()
        } catch (err) {}
    })

    it('El get debe devolver los productos en un arreglo', async function () {
        const result = await this.productDao.getAll()

        assert.strictEqual(Array.isArray(result), true)
       
    })
    it('El DAO debe poder crear productos', async function () {
        const result = await this.productDao.create({
            title: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            code: faker.string.nanoid(10),
            status: true,
            price: parseFloat(faker.commerce.price()),
            stock: parseInt(faker.number.int({ min: 20, max: 100 })),
            category: faker.commerce.department(),
            thumbnail: [faker.image.url()],
        })
        assert.ok(result._id)
    })
})
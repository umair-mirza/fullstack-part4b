const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('there are two blogs', async (done) => {
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(2)
    done()
})


afterAll(() => {
    mongoose.connection.close()
})
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const supertest_1 = __importDefault(require("supertest"));
describe('First test', () => {
    it('GET /users --> array users', () => {
        return (0, supertest_1.default)(index_1.default)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    userId: expect.any(Number),
                    name: expect.any(String),
                })
            ]));
        });
    });
    it('POST /users --> created user', () => {
        return (0, supertest_1.default)(index_1.default)
            .post('/users')
            .send({
            name: 'Juanita'
        })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    name: 'Juanita',
                })
            ]));
        });
    });
    it('GET /users/userId --> specific user by ID', () => {
        return (0, supertest_1.default)(index_1.default)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    userId: expect.any(Number),
                    name: expect.any(String),
                })
            ]));
        });
    });
    it('GET /users/userId --> 404 if not found', () => {
        return (0, supertest_1.default)(index_1.default)
            .get('/users/55588888')
            .expect(404);
    });
    it('POST /users --> validates request body', () => {
        return (0, supertest_1.default)(index_1.default).post('/users').send({ name: 123 }).expect(422);
    });
    it('DELETE /users/userId --> deleted user by ID', () => {
    });
    it('DELETE /users/userId --> 404 if not found', () => {
    });
});

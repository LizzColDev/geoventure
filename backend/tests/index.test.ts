import app from '../src/index';
import request from 'supertest';


describe ('First test', ()=>{

  it('GET /users --> array users', async () =>{
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        userId: expect.any(Number),
        name: expect.any(String),
      })
    ]));
    return;
  })
  
  it('GET /users/userId --> specific user by ID', async () =>{
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: expect.any(Number),
          name: expect.any(String),
        })
      ]));
      return;
  })

  it('GET /users/userId --> 404 if not found', () =>{
    return request(app)
      .get('/users/55588888')
      .expect(404);
  })

  it('POST /users --> validates request body', () =>{
    return request(app).post('/users').send({name: 123}).expect(422);
  })

  it('DELETE /users/userId --> deleted user by ID', () =>{

  })

  it('DELETE /users/userId --> 404 if not found', () =>{

  })
})

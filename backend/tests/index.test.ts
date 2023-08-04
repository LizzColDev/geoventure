import app from '../src/index';
import request from 'supertest';


describe ('First test', ()=>{

  it('should return 200 OK for the index route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return "Express + TypeScript Server"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Express + TypeScript Server');
  });

  it('should return 200 OK for the /users route', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });

  it('should create a new user with status 201', async () => {
    const newUser = {
      name: 'Samantha',
    };
    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
})
})
const request = require('supertest');

// Базовий URL API
const API_BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = '6507e7ab2c8a5215f32bc8551cb63b130ef0c4a21db87e58a0da63999c1e4a3b';

describe('API Testing with SuperTest', () => {
  
  // Тест GET-запиту
  it('GET /users - повертає масив користувачів', async () => {
    const response = await request(API_BASE_URL).get('/users');
    
    expect(response.status).toBe(200); 
    expect(response.headers['content-type']).toMatch(/json/); 
    expect(Array.isArray(response.body)).toBe(true); 
  });

 // Тест POST-запиту
it('POST /users - створює нового користувача', async () => {
    const newUser = {
      name: 'John Doe',
      email: `john${Date.now()}@example.com`, 
      gender: 'male',
      status: 'active'      
    };

    const response = await request(API_BASE_URL)
      .post('/users')
      .send(newUser)
      .set('Authorization', `Bearer ${TOKEN}`) 
      .set('Accept', 'application/json');

    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty('id'); 
    expect(response.body.name).toBe(newUser.name);
  });

  // Тест PUT-запиту
  it('PUT /users/:id - оновлює дані користувача', async () => {
    const userId = 7667106; 
    const updatedUser = { name: 'Updated Name' };

    const response = await request(API_BASE_URL)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`) 
        .set('Accept', 'application/json') 
        .send(updatedUser); 

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);

  })


  // Тест DELETE-запиту
it('DELETE /users/:id - видалення користувача', async () => {
  const userId = 7667106; 

  const response = await request(API_BASE_URL)
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`); 

  expect(response.status).toBe(204); 
});

  
});

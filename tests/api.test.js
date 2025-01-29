const request = require('supertest');

// Укажи базовый URL API
const API_BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = '6507e7ab2c8a5215f32bc8551cb63b130ef0c4a21db87e58a0da63999c1e4a3b';

describe('API Testing with SuperTest', () => {
  
  // Тест GET-запроса (получение списка пользователей)
  it('GET /users - должен возвращать массив пользователей', async () => {
    const response = await request(API_BASE_URL).get('/users');
    
    expect(response.status).toBe(200); // Проверяем статус ответа
    expect(response.headers['content-type']).toMatch(/json/); // Проверяем формат JSON
    expect(Array.isArray(response.body)).toBe(true); // Должен быть массив объектов
  });

 // Тест POST-запроса (создание пользователя)
it('POST /users - должен создать нового пользователя', async () => {
    const newUser = {
      name: 'John Doe',
      email: `john${Date.now()}@example.com`, // Уникальный email
      gender: 'male',
      status: 'active'
    };

    const response = await request(API_BASE_URL)
      .post('/users')
      .send(newUser)
      .set('Authorization', `Bearer ${TOKEN}`) // Передача токена
      .set('Accept', 'application/json');

    expect(response.status).toBe(201); // Код 201 - Created
    expect(response.body).toHaveProperty('id'); // Проверяем, что пришёл id
    expect(response.body.name).toBe(newUser.name);
  });

  // Тест PUT-запроса (обновление пользователя)
  it('PUT /users/:id - должен обновить данные пользователя', async () => {
    const userId = 7667106; // Укажи реальный ID
    const updatedUser = { name: 'Updated Name' };

    const response = await request(API_BASE_URL)
        .put(`/users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`) // Сначала добавляем токен
        .set('Accept', 'application/json') // Затем указываем, что принимаем JSON
        .send(updatedUser); // Отправляем данные

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);

  })


  // Тест DELETE-запроса (удаление пользователя)
it('DELETE /users/:id - должен удалить пользователя', async () => {
    const userId = 7665361; // Укажи реальный ID
  
    const response = await request(API_BASE_URL)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`); // Передача токена
  
    expect(response.status).toBe(204); // Код 204 - No Content
  });
  
});

import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';

describe('Login system', () => {
  it('Authorization failed when token is invalid', async () => {
    await request(app).post('/admin/firm').expect(401);
  });

  it('Gets array of forms when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user }, 'privateKey');

    await request(app)
      .post('/admin/firm')
      .set('Content-Type', 'application/json')
      .send({
        token
      })
      .expect(200);
  });
});

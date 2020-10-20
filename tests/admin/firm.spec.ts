import jwt from 'jsonwebtoken';
import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import FirmForm from '../../src/model/firmForm';

describe('Login system', () => {
  it('Authorization failed when token is invalid', async () => {
    await request(app).post('/admin/firm').expect(401);
  });

  it('Gets array of forms when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user }, 'privateKey');

    mockingoose(FirmForm).toReturn({});

    await request(app)
      .post('/admin/firm')
      .set('Content-Type', 'application/json')
      .send({
        token
      })
      .expect(200);
  });
});

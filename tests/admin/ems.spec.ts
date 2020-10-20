import jwt from 'jsonwebtoken';
import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import EmsForm from '../../src/model/emsForm';

describe('Login system', () => {
  it('Authorization failed when token is invalid', async () => {
    await request(app).post('/admin/ems').expect(401);
  });

  it('Gets array of forms when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user }, 'privateKey');

    mockingoose(EmsForm).toReturn({});

    await request(app)
      .post('/admin/ems')
      .set('Content-Type', 'application/json')
      .send({
        token
      })
      .expect(200);
  });
});

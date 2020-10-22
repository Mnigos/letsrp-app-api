import jwt from 'jsonwebtoken';
import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import SupForm from '../../src/model/supForm';

describe('Login system', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('Authorization failed when token is invalid', async () => {
    await request(app).post('/admin/sup').expect(401);
  });

  it('Gets array of forms when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user }, 'privateKey');

    mockingoose(SupForm).toReturn({});

    await request(app)
      .post('/admin/sup')
      .set('Content-Type', 'application/json')
      .send({
        token
      })
      .expect(200);
  });
});

describe('Checking forms system', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('Authorization failed when token is invalid', async () => {
    await request(app).post('/admin/sup/check').expect(401);
  });

  it('Changing status of form when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user }, 'privateKey');

    mockingoose(SupForm).toReturn({
      id: '382179398127398',
      status: 'waiting'
    });

    await request(app)
      .post('/admin/sup')
      .set('Content-Type', 'application/json')
      .send({
        token,
        id: '382179398127398',
        status: 'accepted'
      })
      .expect(200);
  });
});

import mockingoose from 'mockingoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../src/app';
import User from '../../src/model/user';

describe('Management user system', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('Authorization failed when token is invalid', async () => {
    await request(app).post('/admin/management').expect(401);
  });

  it('Creating user without name when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user, perms: 'admin' }, 'privateKey');

    mockingoose(User).toReturn({});

    await request(app)
      .post('/admin/management')
      .set('Content-Type', 'application/json')
      .send({
        token,
        pass: 'zaq1@WSX',
        perms: 'admin'
      })
      .expect(400);
  });

  it('Creating user when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user, perms: 'admin' }, 'privateKey');

    mockingoose(User).toReturn({});

    await request(app)
      .post('/admin/management')
      .set('Content-Type', 'application/json')
      .send({
        token,
        name: 'John',
        pass: 'zaq1@WSX',
        perms: 'admin'
      })
      .expect(201);
  });
});

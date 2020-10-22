import mockingoose from 'mockingoose';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app';
import User from '../src/model/user';

describe('Login system', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("Login fails when user data isn't provided or incomplete", async () => {
    await request(app).post('/auth/admin').expect(400);
    await request(app)
      .post('/auth/admin')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John'
      })
      .expect(400);
  });

  it('login fails when user password is incorrect', async () => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('zaq1@WSX', salt);

    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: hash,
        perms: 'admin'
      },
      'findOne'
    );

    await request(app)
      .post('/auth/admin')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
        pass: 'zaq1@WSX',
        perms: 'admin'
      })
      .expect(401);
  });

  it('login is succesfull when correct data is provided', async () => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('fly', salt);

    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: hash,
        perms: 'admin'
      },
      'findOne'
    );

    const res = await request(app)
      .post('/auth/admin')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
        pass: 'zaq1@WSX'
      })
      .expect(200);

    expect(res.body?.token).toMatch(/^([a-zA-Z0-9-_.]+\.){2}[a-zA-Z0-9-_.]+$/i);
  });
});

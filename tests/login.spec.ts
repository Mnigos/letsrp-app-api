import mockingoose from 'mockingoose';
import request from 'supertest';
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
        user: {
          name: 'John'
        }
      })
      .expect(400);
  });

  it('login fails when user password is incorrect', () => {
    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: 'fly',
        perms: 'admin'
      },
      'findOne'
    );

    request(app)
      .post('/auth/admin')
      .set('Content-Type', 'application/json')
      .send({
        user: {
          name: 'John',
          pass: 'zaq1@WSX',
          perms: 'admin'
        }
      })
      .expect(401);
  });

  it('login is succesfull when correct data is provided', () => {
    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: 'zaq1@WSX'
      },
      'findOne'
    );

    request(app)
      .post('/auth/admin')
      .set('Content-Type', 'application/json')
      .send({
        user: {
          name: 'John',
          pass: 'zaq1@WSX'
        }
      })
      .expect(200);
});

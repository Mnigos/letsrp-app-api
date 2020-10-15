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

  it('login fails when user password is incorrect', async () => {
    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: 'fly',
        perms: 'admin'
      },
      'findOne'
    );

    await request(app)
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

  it('login is succesfull when correct data is provided', async () => {
    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: 'zaq1@WSX'
      },
      'findOne'
    );

    const response = await request(app)
      .post('/admin')
      .set('Content-Type', 'application/json')
      .send({
        user: {
          name: 'John',
          pass: 'zaq1@WSX'
        }
      })
      .expect(200);

    expect(response.body?.token).toMatch(
      /^([a-zA-Z0-9-_.]+\.){2}[a-zA-Z0-9-_.]+$/i
    );
  });
});

import jwt from 'jsonwebtoken';
import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import OrgForm from '../../src/model/orgForm';

describe('Login system', () => {
  it('Authorization failed when token is invalid', async () => {
    await request(app).post('/admin/org').expect(401);
  });

  it('Gets array of forms when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user }, 'privateKey');

    mockingoose(OrgForm).toReturn({});

    await request(app)
      .post('/admin/org')
      .set('Content-Type', 'application/json')
      .send({
        token
      })
      .expect(200);
  });
});

describe('Checking forms system', () => {
  it('Authorization failed when token is invalid', async () => {
    await request(app).post('/admin/org/check').expect(401);
  });

  it('Changing status of form when token is valid', async () => {
    const user = 'John';
    const token = jwt.sign({ user }, 'privateKey');

    mockingoose(OrgForm).toReturn({
      id: '382179398127398',
      status: 'waiting'
    });

    await request(app)
      .post('/admin/org')
      .set('Content-Type', 'application/json')
      .send({
        token,
        id: '382179398127398',
        status: 'accepted'
      })
      .expect(200);
  });
});

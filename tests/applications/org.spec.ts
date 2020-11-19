import request from 'supertest';
import Chance from 'chance';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import OrgForm from '../../src/model/orgForm';

const chance = Chance();

describe('Org form endpoint', () => {
  it('Uploading form fails when something is not correct', async () => {
    await request(app).post('/applications/org').expect(406);
    await request(app)
      .post('/applications/org')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.age(),
        idea: chance.word({ length: 50 }),
        owner: chance.name(),
        story: chance.word({ length: 200 }),
        expects: chance.word({ length: 30 }),
        old: chance.age(),
        type: chance.word({ length: 20 }),
        headquarters: chance.word({ length: 20 }),
        members: chance.natural({ min: 0, max: 100 }),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 15 })
      })
      .expect(406);
  });

  it('Uploading form accept when everything is correct', async () => {
    mockingoose(OrgForm).toReturn({});

    await request(app)
      .post('/applications/org')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.name(),
        idea: chance.word({ length: 50 }),
        owner: chance.name(),
        story: chance.word({ length: 200 }),
        expects: chance.word({ length: 30 }),
        old: chance.age(),
        type: chance.word({ length: 20 }),
        headquarters: chance.word({ length: 20 }),
        members: chance.natural({ min: 0, max: 100 }),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 15 }),
        submissionDate: 'Thu Nov 19 2019 13:16:42'
      })
      .expect(201);
  });
});

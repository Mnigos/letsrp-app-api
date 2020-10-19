import request from 'supertest';
import Chance from 'chance';
import app from '../../src/app';

const chance = Chance();

describe('Firm form endpoint', () => {
  it('Uploading form fails when something is not correct', async () => {
    await request(app).post('/applications/firm').expect(406);
    await request(app)
      .post('/applications/firm')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.age(),
        idea: chance.word({ length: 50 }),
        owner: chance.name(),
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
    await request(app)
      .post('/applications/firm')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.name(),
        idea: chance.word({ length: 50 }),
        owner: chance.name(),
        expects: chance.word({ length: 30 }),
        old: chance.age(),
        type: chance.word({ length: 20 }),
        headquarters: chance.word({ length: 20 }),
        members: chance.natural({ min: 0, max: 100 }),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 15 })
      })
      .expect(202);
  });
});

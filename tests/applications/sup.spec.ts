import request from 'supertest';
import Chance from 'chance';
import app from '../../src/app';

const chance = Chance();

describe('Support form endpoint', () => {
  it('Uploading form fails when something is not correct', async () => {
    await request(app).post('/applications/sup').expect(406);
    await request(app)
      .post('/applications/sup')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.age(),
        about: chance.word({ length: 50 }),
        whyU: chance.word({ length: 30 }),
        experienceSup: chance.word({ length: 50 }),
        hoursPerDay: chance.natural({ min: 0, max: 24 }),
        old: chance.age(),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 15 })
      })
      .expect(406);
  });

  it('Uploading form accept when everything is correct', async () => {
    await request(app)
      .post('/applications/sup')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.name(),
        about: chance.word({ length: 50 }),
        whyU: chance.word({ length: 30 }),
        experienceSup: chance.word({ length: 50 }),
        hoursPerDay: chance.natural({ min: 0, max: 24 }),
        old: chance.age(),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 15 })
      })
      .expect(202);
  });
});

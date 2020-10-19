import request from 'supertest';
import Chance from 'chance';
import app from '../../src/app';

const chance = Chance();

describe('LSPD form endpoint', () => {
  it('Uploading form fails when something is not correct', async () => {
    await request(app).post('/applications/lspd').expect(406);
    await request(app)
      .post('/applications/lspd')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.age(),
        date: '01-01-2020',
        act: chance.word({ length: 20 }),
        bring: chance.word({ length: 20 }),
        action: chance.word({ length: 30 }),
        whyU: chance.word({ length: 30 }),
        hoursPerDay: chance.natural({ min: 0, max: 24 }),
        experience: chance.word({ length: 20 }),
        old: chance.age(),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 15 })
      })
      .expect(406);
  });

  it('Uploading form accept when everything is correct', async () => {
    await request(app)
      .post('/applications/lspd')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.name(),
        date: '01-01-2020',
        act: chance.word({ length: 20 }),
        bring: chance.word({ length: 20 }),
        action: chance.word({ length: 30 }),
        whyU: chance.word({ length: 30 }),
        hoursPerDay: chance.natural({ min: 0, max: 24 }),
        experience: chance.word({ length: 20 }),
        old: chance.age(),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 15 })
      })
      .expect(202);
  });
});

import request from 'supertest';
import Chance from 'chance';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import EmsForm from '../../src/model/emsForm';

const chance = Chance();

describe('EMS form endpoint', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('Uploading form fails when something is not correct', async () => {
    await request(app).post('/applications/ems').expect(406);
    await request(app)
      .post('/applications/ems')
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
    mockingoose(EmsForm).toReturn({});

    await request(app)
      .post('/applications/ems')
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
        hex: chance.string({ length: 15 }),
        submissionDate: 'Thu Nov 19 2019 13:16:42'
      })
      .expect(201);
  });
});

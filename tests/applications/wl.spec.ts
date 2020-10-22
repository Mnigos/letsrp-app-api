import request from 'supertest';
import Chance from 'chance';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import WlForm from '../../src/model/wlForm';

const chance = Chance();

describe('Whitelist form endpoint', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('Uploading form fails when something is not correct', async () => {
    await request(app).post('/applications/wl').expect(406);
    await request(app)
      .post('/applications/wl')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.age(),
        date: '01-01-2020',
        idea: chance.word({ length: 10 }),
        story: chance.word({ length: 200 }),
        action: chance.word({ length: 50 }),
        old: chance.age(),
        know: chance.word({ length: 10 }),
        experience: chance.word({ length: 10 }),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 11 })
      })
      .expect(406);
  });

  it('Uploading form accept when everything is correct', async () => {
    mockingoose(WlForm).toReturn({});

    await request(app)
      .post('/applications/wl')
      .set('Content-Type', 'application/json')
      .send({
        name: chance.name(),
        date: '01-01-2020',
        idea: chance.word({ length: 20 }),
        story: chance.word({ length: 200 }),
        action: chance.word({ length: 50 }),
        old: chance.age(),
        know: chance.word({ length: 10 }),
        experience: chance.word({ length: 10 }),
        dc: 'MoneyIgos#2000',
        hex: chance.string({ length: 15 })
      })
      .expect(201);
  });
});

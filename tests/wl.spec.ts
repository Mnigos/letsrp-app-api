import request from 'supertest';
import Chance from 'chance';
import app from '../src/app';

const chance = Chance();

describe('Whitelist form endpoint', () => {
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

  it('Uploading form fails when something is correct', async () => {
    await request(app)
      .post('/applications/wl')
      .set('Content-Type', 'application/json')
      .send({
        name: 'eee',
        date: '01-01-2020',
        idea:
          'viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut',
        story:
          'viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum utviverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut',
        action:
          'viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum utviverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut',
        old: 1,
        know:
          'viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut',
        experience:
          'viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum ut',
        dc: 'MoneyIgos#2000',
        hex: '110000100000638'
      })
      .expect(202);
  });
});

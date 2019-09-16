/* eslint-disable @typescript-eslint/camelcase */
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import dayjs from 'dayjs';

const mock = new MockAdapter(axios, { delayResponse: 500 });

// APIのモック化
mock.onGet('/samples').reply(200, {
  samples: [
    {
      id: '1',
      name: 'Alice',
      email: 'sample.1@example.com',
      birth_date: dayjs('2000-01-01').toJSON(),
      sort_order: 10,
    },
    {
      id: '2',
      name: 'Bob',
      email: 'sample.2@example.com',
      birth_date: dayjs('2000-01-01').toJSON(),
      sort_order: 30,
    },
    {
      id: '3',
      name: 'Carol',
      email: 'sample.3@example.com',
      birth_date: dayjs('2000-01-01').toJSON(),
      sort_order: 20,
    },
  ],
});

mock.onPost('/sample').reply(200, {
  id: '4',
  name: 'Dave',
  email: 'sample.4@example.com',
  birth_date: dayjs('1999-10-10').toJSON(),
  sort_order: 25,
});

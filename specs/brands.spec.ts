import * as supertest from 'supertest';

const baseURL = 'https://practice-react.sdetunicorns.com/api/test';

describe('Brands', () => {
  it('GET /brands', async () => {
    const res = await supertest(baseURL).get('/brands');
    expect(res.statusCode).toBe(200);
  });
});

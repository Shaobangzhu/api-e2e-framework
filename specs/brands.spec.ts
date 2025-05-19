import * as supertest from "supertest";

const baseURL = "https://practice-react.sdetunicorns.com/api/test";

describe.skip("Brands", () => {
  describe("Fetch brands", () => {
    it("GET /brands", async () => {
      const res = await supertest(baseURL).get("/brands");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(1);
      expect(Object.keys(res.body[0])).toEqual(["_id", "name"]);
    });

    it("GET /brands/:id", async () => {
      const res = await supertest(baseURL).get(
        "/brands/64b881f049e85607248e2ae1"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toEqual("A Plus 4544");
    });
  });

  describe('Create a brand', () => {
    it('POST /brands', async () => {
        const data = {
            'name': 'clu',
            'description': 'clu phone one'
        }
        const res = await supertest(baseURL)
            .post('/brands')
            .send(data)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(data.name)
    })
  });

  describe('Update a brand', () => {
    it('PATCH /brands', async () => {
        const data = {
            'name': 'clu',
        }
        const res = await supertest(baseURL)
            .patch('/brands/64b881f049e85607248e2ae1')
            .send(data)
        
        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual(data.name)
    })
  });

  describe('Remove a brand', () => {
    it('DELETE /brands', async () => {
        const res = await supertest(baseURL).delete('/brands/64b881f049e85607248e2ae1')
        expect(res.statusCode).toEqual(200)
    })
  });
});

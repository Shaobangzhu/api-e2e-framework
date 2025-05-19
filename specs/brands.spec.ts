import * as supertest from "supertest";

const baseURL = "https://practice-react.sdetunicorns.com/api/test";

describe("Brands", () => {

  it("GET /brands", async () => {
    const res = await supertest(baseURL).get("/brands");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(Object.keys(res.body[0])).toEqual(["_id", "name"]);
  });

  it.only('Schema Verification - Name is a mandatory field', async () => {
    const wrongFormattedData = {
        'name': '',
        'description': 'Test Brand Description'
    }
    const res = await supertest(baseURL)
        .post('/brands')
        .send(wrongFormattedData)
    
    expect(res.statusCode).toEqual(422)
    expect(res.body.error).toEqual('Name is required')
  });

  describe("Create, Get, Update, and Delete a brand", () => {
    let newBrand: any;

    const data = {
      name: "Clu Test Brand " + Math.floor(Math.random() * 100000),
      description: "Clu Test Brand Description",
    };

    it("POST /brands", async () => {
      const res = await supertest(baseURL).post("/brands").send(data);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(data.name);
      newBrand = res.body;
    });

    it("GET /brands/:id", async () => {
      expect(newBrand).toBeDefined(); // Extra safety
      const res = await supertest(baseURL).get(`/brands/${newBrand._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(data.name);
    });

    it("PUT /brands/:id", async () => {
      const updateData = { name: "I Updated the Name" };
      const res = await supertest(baseURL)
        .put(`/brands/${newBrand._id}`)
        .send(updateData);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(updateData.name);
    });

    it("DELETE /brands/:id", async () => {
      const res = await supertest(baseURL).delete(`/brands/${newBrand._id}`);
      expect(res.statusCode).toBe(200);
    });
  });
});

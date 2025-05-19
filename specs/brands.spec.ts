import * as supertest from "supertest";

interface Brand {
  _id: string;
  name: string;
  description: string;
}

const baseURL = "https://practice-react.sdetunicorns.com/api/test";

describe("Brands", () => {

  describe("Create, Get, Update, and Delete a brand", () => {

    const data = {
      name: "Clu Test Brand " + Math.floor(Math.random() * 100000),
      description: "Clu Test Brand Description",
    };

    let newBrand: Brand;

    // Also test POST
    beforeAll(async () => {
      const res = await supertest(baseURL).post("/brands").send(data);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(data.name);
      newBrand = res.body;
    });

    it("GET /brands", async () => {
      const res = await supertest(baseURL).get("/brands");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(1);
      expect(Object.keys(res.body[0])).toEqual(["_id", "name"]);
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

    // Also test DELETE
    afterAll(async () => {
      const res = await supertest(baseURL).delete(`/brands/${newBrand._id}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Schema Verification", () => {
    it("Schema Verification - Name is a mandatory field", async () => {
      const emptyNameFieldData = {
        name: "",
        description: "Test Brand Description",
      };
      const res = await supertest(baseURL)
        .post("/brands")
        .send(emptyNameFieldData);

      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Name is required");
    });

    it("Schema Verifiaction - Max char length for name = 30", async () => {
      const data = {
        name: "012345678901234567890123456789x",
      };

      const res = await supertest(baseURL).post("/brands").send(data);

      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Brand name is too long");
    });

    it("Schema Verification - Description must be a string", async () => {
      const data = {
        name: "Sample Brand",
        description: 123,
      };

      const res = await supertest(baseURL).post("/brands").send(data);

      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Brand description must be a string");
    });
  });

  describe("Business Logic", () => {
    it("Business Logic - Duplicate brand entries not allowed", async () => {
      const name = "Test Brand " + Math.floor(Math.random() * 100000);
      const data = {
        name: name,
      };
      // first request
      await supertest(baseURL).post("/brands").send(data);

      // second request
      const res2 = await supertest(baseURL).post("/brands").send(data);

      expect(res2.statusCode).toEqual(422);
      expect(res2.body.error).toContain("already exists");
    });

    it("Business Logic - GET /brand/invalid_id should throw 404", async () => {
      const res = await supertest(baseURL).get(
        "/brands/" + "682a82fd986188d4dce5cde1"
      );

      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toContain("Brand not found.");
    });

    it("Business Logic - PUT /brands/invalid_id", async () => {
      const data = {
        name: "updated",
      };
      const res = await supertest(baseURL)
        .put("/brands/" + 123)
        .send(data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toContain("Unable to update brands");
    });

    it("Business Logic - DELETE /brands/invalid_id", async () => {
      const res = await supertest(baseURL).delete("/brands/" + 123);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toContain("Unable to delete brand");
    });
  });
});

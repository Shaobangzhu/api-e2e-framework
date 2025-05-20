import brandController from "../controller/brand.controller";
import { BrandType } from "../interfaces/BrandType";

describe.skip("Brands", () => {

  describe("Create, Get, Update, and Delete a brand", () => {

    const data = {
      name: "Clu Test Brand " + Math.floor(Math.random() * 100000),
      description: "Clu Test Brand Description",
    };

    let newBrand: BrandType;

    // Also test POST
    beforeAll(async () => {
      const res = await brandController.postABrand(data);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(data.name);
      newBrand = res.body;
    });

    it("GET /brands", async () => {
      const res = await brandController.getBrands();
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(1);
      expect(Object.keys(res.body[0])).toEqual(["_id", "name"]);
    });

    it("GET /brands/:id", async () => {
      expect(newBrand).toBeDefined(); // Extra safety
      const res = await brandController.getABrandById(newBrand._id);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(data.name);
    });

    it("PUT /brands/:id", async () => {
      const updateData = { name: "I Updated the Name" };
      const res = await brandController.putABrand(newBrand._id, updateData);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(updateData.name);
    });

    // Also test DELETE
    afterAll(async () => {
      const res = await brandController.deleteABrand(newBrand._id);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("Schema Verification", () => {
    it("Schema Verification - Name is a mandatory field", async () => {
      const emptyNameFieldData = {
        name: "",
        description: "Test Brand Description",
      };
      const res = await brandController.postABrand(emptyNameFieldData);

      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Name is required");
    });

    it("Schema Verifiaction - Max char length for name = 30", async () => {
      const extraLongData = {
        name: "012345678901234567890123456789x",
      };

      const res = await brandController.postABrand(extraLongData)

      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual("Brand name is too long");
    });
  });

  describe("Business Logic", () => {
    it("Business Logic - Duplicate brand entries not allowed", async () => {
      const name = "Test Brand " + Math.floor(Math.random() * 100000);
      const data = {
        name: name,
      };
      // first request
      await brandController.postABrand(data);

      // second request
      const res2 = await brandController.postABrand(data);

      expect(res2.statusCode).toEqual(422);
      expect(res2.body.error).toContain("already exists");
    });

    it("Business Logic - GET /brand/invalid_id should throw 404", async () => {
      const res = await brandController.getABrandById("682a82fd986188d4dce5cde1");
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toContain("Brand not found.");
    });

    it("Business Logic - PUT /brands/invalid_id", async () => {
      const data = {
        name: "updated",
      };
      const res = await brandController.putABrand("123", data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toContain("Unable to update brands");
    });

    it("Business Logic - DELETE /brands/invalid_id", async () => {
      const res = await brandController.deleteABrand("123");
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toContain("Unable to delete brand");
    });
  });
});

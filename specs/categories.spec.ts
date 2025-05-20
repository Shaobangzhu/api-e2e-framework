import CategoriesController from "../controller/categories.controller";
import baseConfig from "../config/base.config";
import { login, getCategoryId } from "../utils/helper";

describe("Categories", () => {
  it("GET All/categories", async () => {
    const res = await CategoriesController.getCategories();
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(Object.keys(res.body[0])).toEqual(["_id", "name"]);
  });

  describe("Create, Get, Update and Delete A Category", () => {
    let token: string, categoryId: string;

    beforeAll(async () => {
      token = await login(baseConfig.email, baseConfig.password);

      categoryId = await getCategoryId(token);
    });

    it("GET /categories/id", async () => {
        const res = await CategoriesController.getACategoryById(categoryId);
        expect(res.statusCode).toEqual(200);
    })

    it("PUT /categories/id", async () => {
      const body = {
        name: "Test Category Updated " + Math.floor(Math.random() * 10000),
      };
      const res = await CategoriesController.putACategoryById(
        categoryId,
        body
      ).set("Authorization", "Bearer " + token);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(body.name);
    });

    it("DELETE /categories", async () => {
        const res = await CategoriesController.deleteACategoryById(categoryId).set("Authorization", "Bearer " + token);
        expect(res.statusCode).toEqual(200);
    });
  });
});
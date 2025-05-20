import CategoriesController from "../controller/categories.controller";
import AdminController from "../controller/admin.controller";
import baseConfig from "../config/base.config";

describe("Categories", () => {
  it("GET All/categories", async () => {
    const res = await CategoriesController.getCategories();
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(Object.keys(res.body[0])).toEqual(["_id", "name"]);
  });

  describe("Create, Get, Update and Delete A Category", () => {
    let token: string, postRes: any;

    beforeAll(async () => {
      const data = { email: baseConfig.email, password: baseConfig.password };
      const res = await AdminController.postAdminLogin(data);
      token = res.body.token;

      const body = {
        name: "Test Category " + Math.floor(Math.random() * 10000),
      };
      postRes = await CategoriesController.postACategory(body).set(
        "Authorization",
        "Bearer " + token
      );
    });

    it("GET /categories/id", async () => {
        const res = await CategoriesController.getACategoryById(postRes.body._id);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(postRes.body.name);
    })

    it("PUT /categories/id", async () => {
      const body = {
        name: "Test Category Updated " + Math.floor(Math.random() * 10000),
      };
      const res = await CategoriesController.putACategoryById(
        postRes.body._id,
        body
      ).set("Authorization", "Bearer " + token);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(body.name);
    });

    it("DELETE /categories", async () => {
        const res = await CategoriesController.deleteACategoryById(postRes.body._id).set("Authorization", "Bearer " + token);
        expect(res.statusCode).toEqual(200);
    });
  });
});
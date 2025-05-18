import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com/");

describe("POC Tests", () => {

  describe("GET Requests", () => {
    it("GET /posts", async () => {
      const res = await request.get("/posts");
      expect(res.statusCode).toBe(200);
    });

    it("GET /comments with query params", async () => {
      const res = await request
        .get("/comments")
        .query({ postId: 1, limit: 10 });
      expect(res.body[0].postId).toBe(1);
    });
  });

  describe("POST Requests", () => {
    it('POST /posts', async () => {
        const data = {
            title: "My favorite animes",
            body: "Naruto, One Piece, Death Note, Hunter X Hunter",
            userId: 1
        }

        const res = await request
            .post('/posts')
            .send(data)
        
        expect(res.body.title).toBe(data.title);
    })
  });

  describe("PUT Requests", () => {
    it('PUT /posts/{id}', async () => {
      const data = {
        title: 'Updated title',
        body: 'Updated body...',
        userId: 5
      }

      const getRes = await request.get('/posts/1');
      const beforeTitle = getRes.body.title;

      const res = await request
        .put('/posts/1')
        .send(data);
      
      expect(res.body.title).not.toBe(beforeTitle);
      expect(res.body.title).toBe(data.title);
    });
  });

  describe("PATCH Requests", () => {
    it('PATCH /posts/{id}', async () => {
      const data = {
        title: 'Updated title only',
      }

      const getRes = await request.get('/posts/1');
      const beforeTitle = getRes.body.title;

      const res = await request
        .patch('/posts/1')
        .send(data);
      
      expect(res.body.title).not.toBe(beforeTitle);
      expect(res.body.title).toBe(data.title);
    });
  });

  describe("DELETE Requests", () => {
    it('DELETE /posts/{id}', async () => {
      const res = await request.delete('/posts/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({});
    });
  });
});
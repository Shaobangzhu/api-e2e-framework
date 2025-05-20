import * as supertest from 'supertest';
import config from '../config/base.config';
import { DataType } from '../interfaces/DataType';

const request = supertest(config.baseUrl);

class CategoriesController {
  getCategories() {
    return request.get('/categories');
  }

  getACategoryById(id: string) {
    return request.get('/categories/' + id)
  }

  postACategory(data: DataType) {
    return request
      .post('/categories')
      .send(data)
  }

  putACategoryById(id: string, data: DataType) {
    return request
      .put('/categories/' + id)
      .send(data)
  }

  deleteACategoryById(id: string) {
    return request
      .delete('/categories/' + id)
  }
}

export default new CategoriesController();
import * as supertest from 'supertest';
import config from '../config/base.config';
import { DataType } from '../interfaces/DataType';

const request = supertest(config.baseUrl);

class AdminController {
    postAdminLogin(data: DataType) {
        return request.post('/admin/login').send(data);
    }
}

export default new AdminController();
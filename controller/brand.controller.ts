import * as supertest from 'supertest';
import config from '../config/base.config';

const request = supertest(config.baseUrl);

class BrandController {
    getBrands() {
        return request.get('/brands');
    }

    getABrandById(id: string) {
        return request.get('/brands/' + id);
    }

    postABrand(data: DataType) {
        return request.post('/brands').send(data);
    }

    putABrand(id: string, data: DataType) {
        return request.put('/brands/' + id).send(data);
    }

    deleteABrand(id: string) {
        return request.delete('/brands/' + id);
    }
}

export default new BrandController();
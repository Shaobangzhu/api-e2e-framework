# API End-to-End Framework

A lightweight end-to-end (E2E) testing framework for RESTful APIs using **Supertest**, **Jest**, and **TypeScript**.

## ✨ Features

- 🚀 Easy-to-write, maintainable test cases with TypeScript
- ✅ Supertest for fluent HTTP assertions
- 🧪 Jest for powerful test orchestration and snapshotting
- 📁 Organized folder structure for scalability
- 📦 Built-in support for environment variables and config separation

## 📦 Project Structure
# API End-to-End Framework

A lightweight end-to-end (E2E) testing framework for RESTful APIs using **Supertest**, **Jest**, and **TypeScript**.

## ✨ Features

- 🚀 Easy-to-write, maintainable test cases with TypeScript
- ✅ Supertest for fluent HTTP assertions
- 🧪 Jest for powerful test orchestration and snapshotting
- 📁 Organized folder structure for scalability
- 📦 Built-in support for environment variables and config separation

## 📦 Project Structure

api-e2e-framework/
├── config/
├── controller/
├── data/
├── interfaces/
├── reports/
├── specs/
├── utils/
├── jest.config.ts
├── tsconfig.json
└── package.json


## 🛠️ Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/Shaobangzhu/api-e2e-framework.git
cd api-e2e-framework
npm install
```

## 🚦 Running Tests

You can run all tests using:

```bash
npm test
```

To run specific tests:

```bash
npx jest src/tests/your_test.test.ts
```

## 🧪 Writing a Test

```bash
import request from 'supertest';
import app from '../index'; // your Express app

describe('Health check endpoint', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
```

## ⚙️ Configuration
Update API base URL or other test settings in src/config/testConfig.ts:
```bash
export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
```

## 📄 License

---

If you want, I can update this to match your exact folder structure or point to specific endpoints/tests in your project. Just let me know!
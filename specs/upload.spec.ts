import uploadController from "../controller/upload.controller";

describe('Upload File', () => {
  let uploadedFilename: string;

  it('POST /upload/single', async () => {
    const res = await uploadController.postUploadSingle('C:/Projects/api-e2e-framework/data/skipper.jpg');
    uploadedFilename = res.body.filename;
    expect(uploadedFilename).toEqual('skipper.jpg');
  });

  it('POST /upload/multiple', async () => {
    const files = [
        'C:/Projects/api-e2e-framework/data/skipper.jpg',
        'C:/Projects/api-e2e-framework/data/judy.jpg'
    ]
    const res = await uploadController.postUploadMultiple(files);
    expect(res.body.length).toBe(2);
    expect(res.body[0].filename).toEqual('skipper.jpg');
    expect(res.body[1].filename).toEqual('judy.jpg');
  })
});

// following https://codewithhugo.com/express-request-response-mocking/

const errorHandler = require('./errorHandler');
const api404Error = require('../error/api404Error');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (sessionData) => {
  return {
    session: { data: sessionData }
  };
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('error handler for string errors', () => {
  test('catch custom string error', () => {
    const next = jest.fn();
    const req = mockRequest();
    const res = mockResponse();
    const mockErr = 'string err';
    errorHandler(mockErr, req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: mockErr });
  });
});

describe('error handler for "not found" string errors', () => {
  test('catch custom string error', () => {
    const next = jest.fn();
    const req = mockRequest();
    const res = mockResponse();
    const mockErr = 'something not found';
    errorHandler(mockErr, req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: mockErr });
  });
});

describe('error handler for js native errors', () => {
  test('catch custom string error', () => {
    const next = jest.fn();
    const req = {};
    const res = mockResponse();
    const mockErr = new Error('string err');
    errorHandler(mockErr, req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: mockErr.message });
  });
});

describe('error handler for defined errors', () => {
  test('catch custom string error', () => {
    const next = jest.fn();
    const req = mockRequest();
    const res = mockResponse();
    const mockErr = new api404Error('');
    errorHandler(mockErr, req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(mockErr);
  });
});

const { validateRequest, validateResponse } = require('./validate');

const schemaValidationSuccess = {
  validate: () => ({ value: 'success' })
};

const err = new Error('validation error:');

const schemaValidationFailure = {
  validate: () => ({ error: { details: [err] } })
};

describe('validateRequest', () => {
  test('success', () => {
    const next = jest.fn();
    const req = {};
    const validationSpy = jest.spyOn(schemaValidationSuccess, 'validate');

    validateRequest(req, next, schemaValidationSuccess);

    expect(validationSpy).toHaveBeenCalled();
    expect(validationSpy.mock.calls[0][1]).toEqual({
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    });

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0].length).toBe(0);
    expect(req.body).toBe('success');
  });

  test('failure', () => {
    const next = jest.fn();

    validateRequest({}, next, schemaValidationFailure);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0].length).toBe(1);
    expect(next.mock.calls[0][0]).toContain(err.message);
  });
});

describe('validate Request', () => {
  test('success', () => {
    const next = jest.fn();
    const req = {};
    validateResponse(req, next, schemaValidationSuccess);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0].length).toBe(0);
    expect(req.body).toBe('success');
  });

  test('failure', () => {
    const next = jest.fn();
    const req = {};
    validateResponse(req, next, schemaValidationFailure);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0].length).toBe(1);
    expect(next.mock.calls[0][0]).toContain(err.message);
  });
});

const { validateIdToken } = require('./auth');
const unauthorizedError = require('../error/unauthorizedError');

jest.mock('firebase-admin', () => {
  const getMock = jest.fn().mockResolvedValue({
    docs: [],
    exists: true,
    data: () => ({ active: 'mockArnId' })
  });
  const setMock = jest.fn().mockResolvedValue({
    data: () => ({ active: 'arn:/mockArnId' })
  });
  const updateMock = jest.fn().mockResolvedValue({});
  const docMock = jest.fn().mockImplementation(() => ({
    get: getMock,
    set: setMock,
    update: updateMock
  }));
  const collectionMock = jest.fn().mockImplementation((collectionId) => ({
    get: getMock,
    doc: docMock
  }));
  const arrayUnionMock = jest.fn().mockImplementation(() => 'mockArnId');
  const firestoreMock = jest.fn().mockImplementation(() => ({
    collection: collectionMock
  }));
  firestoreMock.FieldValue = { arrayUnion: arrayUnionMock };
  const authMock = jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue({ uid: 'uid' })
  });
  return {
    initializeApp: jest.fn().mockImplementation(() => true),
    firestore: firestoreMock,
    auth: authMock
  };
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (sessionData) => {
  return {
    userId: 'firestore_mock_user_id',
    session: { data: sessionData },
    body: {},
    query: {}
  };
};

describe('auth', () => {
  test('failure', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();
    const mockError = new unauthorizedError();
    req.body.idtoken = null;
    await validateIdToken(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
  });

  test('success', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();
    req.body.idtoken = 'idtoken';
    await validateIdToken(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

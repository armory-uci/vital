/* eslint-disable @typescript-eslint/naming-convention */

// following https://medium.com/@windix/mock-aws-javascript-library-in-jest-8aad872c1468 and https://dev.to/elthrasher/mocking-aws-with-jest-and-typescript-199i

const {
  listSandboxes,
  cleanupTask,
  createTask,
  redirectToTask
} = require('./sandbox');

const tasksListMockSuccessRes = { taskArns: ['mockListArnId'] };
const stopTaskSuccessRes = { tasks: { taskArn: 'arn:/mockStoppedArnId' } };
const startTaskSuccessRes = { tasks: [{ taskArn: 'arn:/mockStartedArnId' }] };

jest.mock('aws-sdk', () => {
  const listTasksPromiseResponse = jest
    .fn()
    .mockResolvedValue(tasksListMockSuccessRes);

  const listTasksFn = jest
    .fn()
    .mockImplementation(() => ({ promise: listTasksPromiseResponse }));

  const stopTaskPromiseResponse = jest
    .fn()
    .mockResolvedValue(stopTaskSuccessRes);

  const stopTaskFn = jest
    .fn()
    .mockImplementation(() => ({ promise: stopTaskPromiseResponse }));

  const startTaskPromiseResponse = jest
    .fn()
    .mockResolvedValue(startTaskSuccessRes);

  const runTaskFn = jest
    .fn()
    .mockImplementation(() => ({ promise: startTaskPromiseResponse }));

  const waitForFnPromiseResponse = jest.fn().mockResolvedValue({
    tasks: [
      {
        attachments: [
          {
            details: [
              { name: 'networkInterfaceId', value: 'mockNetworkInterfaceId' }
            ]
          }
        ]
      }
    ]
  });

  const waitForFn = jest
    .fn()
    .mockImplementation(() => ({ promise: waitForFnPromiseResponse }));

  class ECS {
    listTasks = listTasksFn;
    stopTask = stopTaskFn;
    runTask = runTaskFn;
    waitFor = waitForFn;
  }

  const describeNetworkInterfacesPromiseResponse = jest.fn().mockResolvedValue({
    NetworkInterfaces: [{ Association: { PublicIp: 'localhost' } }]
  });

  const describeNetworkInterfacesFn = jest.fn().mockImplementation(() => ({
    promise: describeNetworkInterfacesPromiseResponse
  }));

  class EC2 {
    describeNetworkInterfaces = describeNetworkInterfacesFn;
  }

  return {
    ...jest.requireActual('aws-sdk'),
    ECS,
    EC2
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
    session: { data: sessionData }
  };
};

describe('sandboxes', () => {
  test('list sandboxes success', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    await listSandboxes(req, res, next);
    expect(next).not.toHaveBeenCalledWith();
    expect(res.json).toHaveBeenCalledWith(tasksListMockSuccessRes);
  });

  test('stop sandbox success', async () => {
    const req = mockRequest();
    req.params = { userId: 'mockUserId' };
    const res = mockResponse();
    const next = jest.fn();
    await cleanupTask(req, res, next);
    expect(next).not.toHaveBeenCalledWith();
    expect(res.json).toHaveBeenCalledWith(stopTaskSuccessRes);
  });

  test('POST spawn sandbox success', async () => {
    const req = mockRequest();
    req.method = 'POST';
    req.params = { vulnerability: 'sqlInjection' };
    const res = mockResponse();
    const next = jest.fn();

    await createTask(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith('mockStartedArnId');
  });

  test('GET spawn sandbox success', async () => {
    const req = mockRequest();
    req.method = 'GET';
    req.params = { vulnerability: 'sqlInjection' };
    const res = mockResponse();
    const next = jest.fn();

    await createTask(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('http://localhost:3001');
  });

  test('spawn sandbox fail', async () => {
    const req = mockRequest();
    req.method = 'POST';
    req.params = { vulnerability: 'nonExistant' };
    const res = mockResponse();
    const next = jest.fn();

    await createTask(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('sandbox redirection success', async () => {
    const req = mockRequest();
    req.params = { userId: 'mockUserId' };
    const res = mockResponse();
    const next = jest.fn();

    await redirectToTask(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('http://localhost:3001');
  });
});

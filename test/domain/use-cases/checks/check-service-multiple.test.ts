import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple';

const mockFsRepository = { savedLog: jest.fn(), getLogs: jest.fn() };
const mockMongoDbRepository = { savedLog: jest.fn(), getLogs: jest.fn() };
const mockPostgresRepository = { savedLog: jest.fn(), getLogs: jest.fn() };

const mockSuccessCallBack = jest.fn();
const mockErrorCallBack = jest.fn();
describe('Test check-service-multiple.ts CheckServiceMultiple', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const checkServiceMultiple = new CheckServiceMultiple(
    [mockFsRepository, mockMongoDbRepository, mockPostgresRepository],
    mockSuccessCallBack,
    mockErrorCallBack
  );

  test('Should call successCallBack when fetch is ok returns true', async () => {
    const wasOk = await checkServiceMultiple.execute('http://google.com');

    expect(wasOk).toBe(true);
    expect(mockSuccessCallBack).toHaveBeenCalled();
    expect(mockErrorCallBack).not.toHaveBeenCalled();

    expect(mockFsRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockMongoDbRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockPostgresRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test('Should call errorCallback when fetch is not ok returns false', async () => {
    const wasOk = await checkServiceMultiple.execute('http://localhost:3000');

    expect(wasOk).toBe(false);
    expect(mockSuccessCallBack).not.toHaveBeenCalled();
    expect(mockErrorCallBack).toHaveBeenCalled();

    expect(mockFsRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockMongoDbRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockPostgresRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test('Should not call any callbacks when array of repositories is empty and fetch is ok', async () => {
    const checkServiceMultiple = new CheckServiceMultiple(
      [],
      undefined,
      undefined
    );

    const wasOk = await checkServiceMultiple.execute('http://google.com');

    expect(wasOk).toBe(true);
    expect(mockSuccessCallBack).not.toHaveBeenCalled();
    expect(mockErrorCallBack).not.toHaveBeenCalled();

    expect(mockFsRepository.savedLog).not.toHaveBeenCalled();
  });
});

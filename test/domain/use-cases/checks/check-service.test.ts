import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service';
const mockLogRepository = {
  savedLog: jest.fn(),
  getLogs: jest.fn(),
};

const mockSuccessCallBack = jest.fn();
const mockErrorCallback = jest.fn();

describe('Test check-service.ts CheckService use case', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const checkServie = new CheckService(
    mockLogRepository,
    mockSuccessCallBack,
    mockErrorCallback
  );

  test('Should call successCallBack when fetch is ok returns true', async () => {
    const wasOk = await checkServie.execute('http://google.com');

    expect(wasOk).toBe(true);
    expect(mockSuccessCallBack).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockLogRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  test('Should call errorCallback when fetch is not ok returns false', async () => {
    const wasOk = await checkServie.execute('http://localhost:3000');

    expect(wasOk).toBe(false);
    expect(mockSuccessCallBack).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockLogRepository.savedLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});

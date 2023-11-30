import {
  LogEntity,
  LogSeveretyLevel,
} from '../../../src/domain/entities/log.entity';

describe('Test log.entity.ts LogEntity', () => {
  const dataObj = {
    level: LogSeveretyLevel.low,
    message: 'test message from log.entity.ts',
    origin: 'log.entity.ts',
  };

  test('Should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(dataObj.level);
    expect(log.message).toBe(dataObj.message);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toEqual(expect.any(Date));
  });

  test('Should create a LogEntity instance from json', () => {
    const dataJson = `{"level":"high","message":"http://localhost:3000 in not working. TypeError: fetch failed","createdAt":"2023-11-30T02:48:00.007Z","origin":"check-service-multiple.ts"}`;

    const log = LogEntity.fromJson(dataJson);
    console.log(log);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(LogSeveretyLevel.high);
    expect(log.message).toBe(
      'http://localhost:3000 in not working. TypeError: fetch failed'
    );
    expect(log.origin).toBe('check-service-multiple.ts');
    expect(log.createdAt).toEqual(expect.any(Date));
  });

  test('Shold create a LogEntity instance from object', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(dataObj.level);
    expect(log.message).toBe(dataObj.message);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toEqual(expect.any(Date));
  });
});

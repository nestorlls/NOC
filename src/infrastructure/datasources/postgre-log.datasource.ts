import { PrismaClient, SeveretuLevel } from '@prisma/client';
import { LogDataSource, LogEntity, LogSeveretyLevel } from '../../domain';

const severetyEnum = {
  low: SeveretuLevel.LOW,
  medium: SeveretuLevel.MEDIUM,
  high: SeveretuLevel.HIGH,
};

const prismaClient = new PrismaClient();
export class PostgresDataSource implements LogDataSource {
  async savedLog(log: LogEntity): Promise<void> {
    const level = severetyEnum[log.level];

    await prismaClient.logModel.create({
      data: {
        ...log,
        level,
      },
    });
  }
  async getLogs(severetyLever: LogSeveretyLevel): Promise<LogEntity[]> {
    const level = severetyEnum[severetyLever];

    const logs = await prismaClient.logModel.findMany({ where: { level } });
    return logs.map(LogEntity.fromObject);
  }
}

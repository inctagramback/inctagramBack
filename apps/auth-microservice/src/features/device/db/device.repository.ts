import { Injectable } from '@nestjs/common'
import { BaseRepository } from 'apps/auth-microservice/src/modules-core/core/db/base.repository'
import { PrismaService } from 'libs/service/prisma.Service'
import { Device } from '../domain/entity/device.entity'

@Injectable()
export class DeviceRepository extends BaseRepository<Device> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.device)
  }

  async deleteAllDevicesByUserId(userId: string): Promise<void> {
    await this.prisma.device.deleteMany({ where: { id: userId } })
  }
}

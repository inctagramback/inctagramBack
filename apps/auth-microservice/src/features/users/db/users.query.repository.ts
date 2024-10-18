import { Injectable } from '@nestjs/common'
import { PrismaService } from 'libs/service/prisma.Service'
import { SystemData } from '../domain/entity/systemData'
import { User } from '../domain/entity/user.entity'

@Injectable()
export class UsersQueryRepository {
  constructor(private prisma: PrismaService) {}

  async findUserSystemDataById(
    userId: string
  ): Promise<Omit<User, 'providers' | 'SystemData'> & { systemData: SystemData }> {
    const resolve = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        systemData: true, // подгружаем связанные данные из таблицы SystemData
      },
    })
    return resolve
  }

  /*   async getAll(): Promise<ClientViewModel[]> {
    const clients = await this.ormRepo.find({})
    return clients.map(ClientsQueryRepository.mapClientEntityToClientViewModel)
  }

  async getById(id: string): Promise<ClientViewModel | null> {
    const entity = await this.ormRepo.findOneBy({
      id: id,
    })
    return !!entity ? ClientsQueryRepository.mapClientEntityToClientViewModel(entity) : null
  }

  static mapClientEntityToClientViewModel(client: Client): ClientViewModel {
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      address: client.address,
    }
  }
}

export class ClientViewModel {
  @ApiProperty()
  id: string
  @ApiProperty()
  firstName: string
  @ApiProperty()
  lastName: string
  @ApiProperty()
  address: string | null */
}

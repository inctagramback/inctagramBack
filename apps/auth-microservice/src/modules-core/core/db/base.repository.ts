export class BaseRepository<T> {
  constructor(
    protected prismaClient: any // Здесь передается Prisma клиент с конкретной моделью
  ) {}

  async getById(id: string): Promise<T | null> {
    return await this.prismaClient.findUnique({ where: { id: id } }) // Используем переданный клиент
  }

  async getMany(filter: Partial<T>): Promise<T[]> {
    return await this.prismaClient.findMany({ where: filter })
  }

  async save(data: T): Promise<void> {
    await this.prismaClient.create({ data })
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.delete({ where: { id: id } })
  }
}

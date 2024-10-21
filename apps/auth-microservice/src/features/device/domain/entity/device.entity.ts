export class Device {
  id: string
  userId: string
  deviceJwtKey: string
  createdAt: Date
  constructor() {
    this.createdAt = new Date()
  }
}

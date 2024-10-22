export class Device {
  id: string
  userId: string
  active: string
  createdAt: Date
  constructor() {
    this.createdAt = new Date()
  }
}

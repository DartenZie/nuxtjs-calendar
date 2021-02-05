export class Time {
  constructor(time) {
    this.hours = parseInt(time.split(':')[0])
    this.minutes = parseInt(time.split(':')[1])
    this.seconds = parseInt(time.split(':')[2])
  }
}

import Nightmare from 'nightmare'
import os from 'os'
import path from 'path'

export class BaseScraper {
  constructor(nightmareOptions) {
    this.nightmareOptions = nightmareOptions
  }

  nightmare() {
    return new Nightmare(this.nightmareOptions)
  }
}

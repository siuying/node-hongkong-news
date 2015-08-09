import Nightmare from 'nightmare'
import os from 'os'
import path from 'path'

export class BaseScraper {
  nightmare() {
    return new Nightmare()
  }
}

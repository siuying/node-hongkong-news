import Nightmare from 'nightmare'
import os from 'os'
import path from 'path'

export class BaseScraper {
  nightmare() {
    // for linux, use the bundled binary
    if (os.platform() == 'linux') {
      return new Nightmare({
        phantomPath: path.join(__dirname, '../bin') + '/'
      })
    }

    // otherwise use installed binary
    return new Nightmare()
  }
}

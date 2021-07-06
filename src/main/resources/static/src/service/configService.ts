interface Config {
  baseUrl: string
}

class ConfigService {
  private config: Config | null

  constructor() {
    this.config = null
  }

  async init() {
    const res = await fetch('/config/config.json')
    const config = await res.json()

    this.config = config
  }

  getConfig() {
    return this.config
  }
}

export default new ConfigService()

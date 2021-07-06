import configService from 'src/service/configService'

const DEV_BASE_URL = configService.getConfig()?.baseUrl

const API_URL_VERSION = '/v1'

export const API_BASE_URL = `${DEV_BASE_URL}/api${API_URL_VERSION}`

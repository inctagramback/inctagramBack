import {
  setCookieParser,
  setCors,
  setDependencyInjection,
  setGlobalFilters,
  setGlobalPrefix,
  setSwagger,
  setValidationPipe,
} from './app-settings'

export function applyAppSettings(app) {
  setGlobalPrefix(app)
  setCookieParser(app)
  setCors(app)
  setValidationPipe(app)
  setGlobalFilters(app)
  setDependencyInjection(app)
  setSwagger(app)
}

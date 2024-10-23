import {
  setCookieParser,
  setCors,
  setDependencyInjection,
  setGlobalFilters,
  setGlobalPrefix,
  setSwagger,
} from './app-settings'
import { pipesSetup } from './pipesSetup'

export function applyAppSettings(app) {
  setGlobalPrefix(app)
  setCookieParser(app)
  setCors(app)
  pipesSetup(app)
  setGlobalFilters(app)
  setDependencyInjection(app)
  setSwagger(app)
}

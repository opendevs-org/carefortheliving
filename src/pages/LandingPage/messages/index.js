import parseLanguages, { formatMessage } from 'rmw-shell/lib/utils/locale'
import messages_en from './en.json'

const messageSources = {
  en: messages_en,
}

const match = parseLanguages(
  ['en'],
  'en'
)

const messages = messageSources[match]

const format = (uid) => {
  return formatMessage(messages, uid)
}

export default format

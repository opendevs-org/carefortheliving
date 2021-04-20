import React from 'react'
import MarkdownPage from 'rmw-shell/lib/containers/MarkdownPage'
import { useIntl } from 'react-intl'

const Page = () => {
  const intl = useIntl()
  return (
    <MarkdownPage
      pageProps={{
        pageTitle: intl.formatMessage({ id: 'about', defaultMessage: 'About' }),
      }}
      path={
        'https://raw.githubusercontent.com/open-devs/opendevs-webpage/master/README.md'
      }
    />
  )
}

export default Page

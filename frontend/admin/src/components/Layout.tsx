import React from 'react'
import { Layout, LayoutProps } from 'react-admin'

import Menu from './Menu'

const _Layout: (props: LayoutProps) => JSX.Element = (props) => (
  <Layout {...props} menu={Menu} />
)

export default _Layout

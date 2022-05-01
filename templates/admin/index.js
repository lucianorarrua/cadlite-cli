import React from 'react'
import { Route } from 'react-router-dom'
import List from './list'

export default () => {
  return (
    <Route
      key='<%= adminNameKebabCase %>'
      exact
      path='/cadlite/admin/<%= adminNameKebabCase %>'
      render={() => <List />}
    />
  )
}

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import withScripts, { googleAnalytics } from 'react-with-scripts';
import { errorBoundary } from 'react-common-kit';
import withRouter from 'redux-cube-with-router';
import { createApp } from 'redux-cube';

import { isDynamicUrl } from './common/utils';
import { App as TodoApp } from './main';
import Endnote from './common/components/Endnote';

@errorBoundary()
@withScripts(
  googleAnalytics({
    googleAnalyticsTrackingId: 'UA-404086-14',
  }),
)
@createApp(
  withRouter({
    supportHtml5History: isDynamicUrl(),
    devToolsOptions: { name: 'EntryApp' },
  }),
)
class EntryApp extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Todo App - Webcube's TodoMVC Example"
          meta={[{ name: 'description', content: '' }]}
        />
        <TodoApp title="Todo App" />
        <Endnote />
      </div>
    );
  }
}

export const App = EntryApp;

import '@fontsource-variable/space-grotesk'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import './index.css'

import { render } from 'solid-js/web'
import { Route, Router } from '@solidjs/router'
import { MetaProvider } from '@solidjs/meta'
import App from './app'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Git from './pages/Git'
import Contact from './pages/Contact'
import Security from './pages/Security'
import Branding from './pages/Branding'
import NotFound from './pages/NotFound'

render(
  () => (
    <MetaProvider>
      <Router>
        <Route component={App}>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/git" component={Git} />
          <Route path="/security" component={Security} />
          <Route path="/contact" component={Contact} />
          <Route path="/branding" component={Branding} />
          <Route path="*404" component={NotFound} />
        </Route>
      </Router>
    </MetaProvider>
  ),
  document.getElementById('root')!,
)

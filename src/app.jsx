import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';
class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/product' component={Home} />
                    <Route exact path='/product-category' component={Home} />
                    <Route exact path='/order' component={Home} />
                    <Route exact path='/user' component={Home} />
                </Switch>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
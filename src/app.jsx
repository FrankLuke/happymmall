import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Link, Switch } from 'react-router-dom';

import Login from 'page/login/index.jsx';
import Layout from 'component/layout/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import Home from 'page/home/index.jsx';
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' render={props=>(
                        <Layout>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/product' component={Home} />
                                <Route exact path='/product-manage' component={Home} />
                                <Route exact path='/product-category' component={Home} />
                                <Route exact path='/order' component={Home} />
                                <Route exact path='/user' component={Home} />
                                <Route component={ErrorPage} />
                            </Switch>
                        </Layout>
                    )} />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
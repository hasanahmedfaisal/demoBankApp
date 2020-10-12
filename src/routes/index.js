import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react'
import config from './config';
import { withRouter } from 'react-router-dom'
import '../components/app/App.css'

class RouteConfig extends Component {

    render() {
        return (
            <div>
                <div className="name">
                    Keepsafe Bank
                </div>
                <Switch>
                    {
                        config.map((item) => {
                            return <Route key={item.component}
                                path={item.path}
                                component={item.component} />
                        })
                    }
                </Switch>
            </div>
        );
    }
}

export default withRouter(RouteConfig);
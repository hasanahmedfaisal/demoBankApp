import React, { Component } from 'react';

import RouteConfig from '../routes';
import { BrowserRouter } from 'react-router-dom';

/* eslint-disable */
export default class BankApp extends Component {
    render() {
        return (
            <BrowserRouter>
                <RouteConfig />
            </BrowserRouter>
        );
    }
}


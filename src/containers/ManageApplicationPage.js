import React, { Component } from 'react';
import { connect } from 'react-redux';

import ManageApplication from '../components/manageApplication';

import AccountActions from '../actions/AccountActions';

import Constants from '../config/Constants'

class ManageApplicationPage extends Component {
    render() {
        return (
            <ManageApplication {...this.props}/>
        )   
    }
}

export function mapStateToProps(state) {
    return {
        userName: state.Employee.userName,
        token: state.Employee.token,
        accounts: state.Account.accounts,
        ...state
    }
}

export function mapDispatchToProps(dispatch, ownProps) {
    return {
        createAccount: function(request, successCallBack, errorCallBack){
            dispatch(AccountActions.createAccount(request)).then((action) => {
                if(action.type === Constants.ACTIONS.CREATE_ACCOUNT_ERROR )
                    errorCallBack()
                else
                    successCallBack()
            })
    },
    fetchAccounts: function(successCallBack,errorCallBack){
        dispatch(AccountActions.fetchAccounts()).then((action) => {
            if(action.type === Constants.ACTIONS.FETCH_ACCOUNT_SUCCESS )
                successCallBack()
            else
                errorCallBack()
        })
    },
    updateAccountDetails: function(request,successCallBack, errorCallBack){
        dispatch(AccountActions.updateAccount(request)).then((action) => {
            if(action.type === Constants.ACTIONS.UPDATE_ACCOUNT_SUCCESS )
                successCallBack()
            else
                errorCallBack()
        })
    },
    debitAmount: function(request,successCallBack, errorCallBack){
        dispatch(AccountActions.debitAmount(request)).then((action) => {
            if(action.type === Constants.ACTIONS.UPDATE_ACCOUNT_SUCCESS )
                successCallBack()
            else
                errorCallBack()
        })
    },
    creditAmount: function(request,successCallBack, errorCallBack){
        dispatch(AccountActions.creditAmount(request)).then((action) => {
            if(action.type === Constants.ACTIONS.UPDATE_ACCOUNT_SUCCESS )
                successCallBack()
            else
                errorCallBack()
        })
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageApplicationPage);

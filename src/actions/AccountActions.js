import RestClient from '../utils/restClient'
import Constants from '../config/Constants'

const getUrl = (url) => {
    return `/account${url}`;
}

export default {
    createAccount: (req) => async dispatch => {
        try {
            await RestClient.post(getUrl(''), req)
            return dispatch({
                type: Constants.ACTIONS.CREATE_ACCOUNT_SUCCESS
            })
        }
        catch (error) {
            return dispatch({
                type: Constants.ACTIONS.CREATE_ACCOUNT_ERROR
            })        
        }
    },
    fetchAccounts: () => async dispatch => {
        try {
            const response = await RestClient.get(getUrl(''))
            return dispatch({
                type: Constants.ACTIONS.FETCH_ACCOUNT_SUCCESS,
                accounts: response.data
            })
        }
        catch (error) {
            return dispatch({
                type: Constants.ACTIONS.FETCH_ACCOUNT_ERROR
            })        
        }
    },
    updateAccount: (req) => async dispatch => {
        try {
            const updateAccountRequest = {
                acno: req.acno,
                name: req.name,
                deposit: req.deposit
            }
            await RestClient.patch(getUrl(`/${req._id}`), updateAccountRequest)
            return dispatch({
                type: Constants.ACTIONS.UPDATE_ACCOUNT_SUCCESS
            })
        }
        catch (error) {
            return dispatch({
                type: Constants.ACTIONS.UPDATE_ACCOUNT_ERROR
            })        
        }
    },
    creditAmount: (req) => async dispatch => {
        try {
            const creditAccountRequest = {
                amount: req.deposit
            }
            await RestClient.patch(getUrl(`/credit/${req._id}`), creditAccountRequest)
            return dispatch({
                type: Constants.ACTIONS.UPDATE_ACCOUNT_SUCCESS
            })
        }
        catch (error) {
            return dispatch({
                type: Constants.ACTIONS.UPDATE_ACCOUNT_ERROR
            })        
        }
    },
    debitAmount: (req) => async dispatch => {
        try {
            const debitAmountRequest = {
                amount: req.deposit
            }
            await RestClient.patch(getUrl(`/debit/${req._id}`), debitAmountRequest)
            return dispatch({
                type: Constants.ACTIONS.UPDATE_ACCOUNT_SUCCESS
            })
        }
        catch (error) {
            return dispatch({
                type: Constants.ACTIONS.UPDATE_ACCOUNT_ERROR
            })        
        }
    }
}
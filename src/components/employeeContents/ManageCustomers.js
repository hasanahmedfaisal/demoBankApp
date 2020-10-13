import React, { PureComponent } from 'react';
import { Result, Spin, Button, Empty, Card } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import AccountForm from './AccountForm'

class ManageCustomers extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      showLoader: false,
      showErrorMessage: false,
      showAccountDetails: false,
      fetchAccounts:false,
      accountDetails: {}
    }
  }

  componentDidMount(){
    this.fetchAccounts()
  }

  componentDidUpdate(prevProps, prevState){
    if((this.state.showAccountDetails !== prevState.showAccountDetails) || this.state.fetchAccounts)
      this.fetchAccounts()
  }

  successCallBack = () => {
    this.setState({
        showLoader: false,
        fetchAccounts: false
    })
  }

  updateSuccessCallBack = () => {
    this.setState({
        showLoader: false,
        fetchAccounts: true
    })
  }

  errorCallBack = () => {
    this.setState({
        showLoader: false,
        showErrorMessage: true
    })
  }

  fetchAccounts = () => {
    this.setState({
      showLoader: true,
      showErrorMessage: false
    })
    this.props.fetchAccounts(this.successCallBack, this.errorCallBack)
  }

  handleEditAccount = (key) => {
    this.setState({
      showAccountDetails: true,
      accountDetails: key
    })
  }

  renderCard = (key,index) => {
    return(
        <Card
          style={index=== 0 ? {} : { marginTop: 16 }}
          type="inner"
          title={key.name}
          extra={<button className="editButton" onClick={() => this.handleEditAccount(key)}>Edit</button>}
        >
          Balance Amount is ₹{key.deposit}
    </Card>
    )
  }

  renderAccounts = () => {
    return (
        <Card title="Accounts">
          {this.props.accounts.map((key, index) => this.renderCard(key, index))}
        </Card>
    )
  }

  updateAccountDetails = (values) => {
    this.setState({
      showLoader: true,
      showErrorMessage: false,
      showAccountDetails: false
    })
    const request = {
      _id: this.state.accountDetails._id,
      ...values
    }
    if(values.typeOfDeposit === 'credit')
      this.props.creditAmount(request, this.updateSuccessCallBack, this.errorCallBack)
    else
      this.props.debitAmount(request, this.updateSuccessCallBack, this.errorCallBack)
  }
  
  render() {
    const updateAccountFormProps = {
      onFinish: this.updateAccountDetails,
      ...this.state.accountDetails,
      buttonTitle: 'Update Account Details',
      isDepositRequired: false,
      isNameRequired: false,
      isAccountNumberRequired: false,
      isUpdate: true
    }
    const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
    return (
      <div className='slideContentAccount'>
        {!this.state.showAccountDetails &&
        <React.Fragment>
        {this.state.showErrorMessage &&
                    <Result
                    status="500"
                    subTitle="Sorry, something went wrong."
                    extra={<Button type="primary" onClick={this.fetchAccounts}>Try again</Button>}
                  />
                }
                {this.state.showLoader &&
                    <div className='loaderAddCustomer'>
                        <Spin indicator={antIcon} />
                    </div>
                }
          {!this.state.showLoader && this.props.accounts.length === 0 && <Empty />}
          {!this.state.showLoader && this.renderAccounts()}
          </React.Fragment>}
          {this.state.showAccountDetails && 
            <AccountForm {...updateAccountFormProps}/>
          }
      </div>
    );
  }
}

export default ManageCustomers;


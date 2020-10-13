import React, { PureComponent } from 'react'
import { Form, Input, InputNumber, Button, Select } from 'antd';
const { Option } = Select


const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: '${label} is required!'
  };

  const defaultProps = {
      name: '',
      acno: '',
      deposit: '',
      buttonTitle: 'Create Account',
      isDepositRequired: true,
      isNameRequired: true,
      isAccountNumberRequired: true,
      isUpdate: false
  }

export default class AccountForm extends PureComponent {
  updateComp = () => (
    <React.Fragment>
      <Form.Item label="Credit/Debit">
        <Input.Group compact>
          <Form.Item
            name={['typeOfDeposit']}
            noStyle
            rules={[{ required: true, message: 'Debit or Credit is required' }]}
          >
            <Select placeholder="Select debit/credit">
              <Option value="debit">Debit</Option>
              <Option value="credit">Credit</Option>
            </Select>
          </Form.Item>
          <Form.Item
    name={['deposit']}
    label=""
    required={this.props.isDepositRequired}
    rules={[
      {
        validator: (_, value) => {
          if (value == null && this.props.isDepositRequired)
            return Promise.reject('Amount is required!')
          else if (typeof value !== 'number' && value !== null)
            return Promise.reject('Amount is not a valid number!')
          else if (value <= 0)
            return Promise.reject('Amount must be greater than zero!')
          else
            return Promise.resolve()
        }
      },
    ]}
  >
    <InputNumber defaultValue={this.props.deposit}/>
  </Form.Item>
        </Input.Group>
      </Form.Item>
  </React.Fragment>
  )
    
   addAccountComp = () => (<Form.Item
    name={['deposit']}
    label="Deposit Amount"
    required={this.props.isDepositRequired}
    rules={[
      {
        validator: (_, value) => {
          if (value == null && this.props.isDepositRequired)
            return Promise.reject('Deposit Amount is required!')
          else if (typeof value !== 'number' && value !== null)
            return Promise.reject('Deposit Amount is not a valid number!')
          else if (value <= 0)
            return Promise.reject('Deposit Amount must be greater than zero!')
          else
            return Promise.resolve()
        }
      },
    ]}
  >
    <InputNumber defaultValue={this.props.deposit}/>
  </Form.Item>)
    
    render(){
    return (
      <Form {...layout} name="nest-messages" onFinish={(values) => this.props.onFinish(values)} validateMessages={validateMessages}>
        <Form.Item
          name={['name']}
          label="Name"
          rules={[
            {
              required: this.props.isNameRequired,
            },
          ]}
        >
          <Input defaultValue={this.props.name}/>
        </Form.Item>
        <Form.Item
          name={['acno']}
          label="Account Number"
          rules={[
            {
              required: this.props.isAccountNumberRequired,
            },
          ]}
        >
          <Input defaultValue={this.props.acno}/>
        </Form.Item>
        {!this.props.isUpdate ? this.addAccountComp(): this.updateComp()}
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {this.props.buttonTitle}
        </Button>
        </Form.Item>
      </Form>
    )
  }
}

AccountForm.defaultProps = defaultProps
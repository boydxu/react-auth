import React, { Component } from 'react';
import './App.css';
import { Input, Button, Select, Form, Switch } from 'antd';
import { Link } from 'react-router'
import { AuthComponent as Auth  } from './utils/auth'
const FormItem = Form.Item
class App extends Component {
  render() {
    return (
      <div className='app'>
        <Link to='/example1'>example1</Link>
        <Link to='/example2'>example2</Link>
        <Link to='/example3'>example3</Link>
        {
          this.props.children
        }
        <Form className='form'>
          <FormItem label='authCode:Input'>
            <Auth authCode='Input'>
              <Input />
            </Auth>
          </FormItem>
          <FormItem label='authCode:Select'>
            <Auth authCode='Select'>
              <Select>
                <Select.Option key='1'>
                  A
                </Select.Option>
                <Select.Option key='2'>
                  B
                </Select.Option>
              </Select>
            </Auth>
          </FormItem>
          <FormItem label='authCode:Switch'>
            <Auth authCode='Switch'>
              <Switch />
            </Auth>
          </FormItem>
          <FormItem label='authCode:Button'>
            <Auth authCode='Button'>
              <Button type='primary' onClick={() => { console.log('点击了button') }}>确定</Button>
            </Auth>
          </FormItem>
          <FormItem label='authCode:a'>
            <Auth authCode='a'>
              <a target='_blank' href='\\ant.design/index-cn'>antd</a>
            </Auth>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default App;

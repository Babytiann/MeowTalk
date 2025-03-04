import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import axios from "axios";

export default function (){
    const onFinish =async (value: any) => {
        console.log("The values received: ", value)
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:5927/login",
                data: {
                    ...value,
                }
            })
            console.log("Logining success: ", response.data)
        }catch(err){
            console.log("用户登录失败，错误返回为: ", err)
        }
    }

    return(
        <div className="relative w-[100vw] h-[100vh]">
            <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 500 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="https://localhost:5173/reset">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or <a href="https://localhost:5173/register">Register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
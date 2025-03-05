import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { NavLink, useNavigate } from "react-router"
import {useState} from "react";
import axios from "axios";

export default function (){
    const [loginSuccess, setLoginSuccess] = useState<boolean>(true)
    let navigate = useNavigate();

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
            if (response.status === 200) {
                setLoginSuccess(true);
                navigate("/home")
            }
            console.log("Logining success: ", response.data)
        }catch(err){
            setLoginSuccess(false);
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
                    {
                        !loginSuccess && <div className="absolute -translate-y-3/4">账号或密码错误！</div>
                    }
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
                        or <NavLink to="https://localhost:5173/register">Register now!</NavLink>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
import {Button, Form, Input,} from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register = () => {
    const [form] = Form.useForm();
    let navigate = useNavigate();

    const onFinish =async (values: any) => {
        console.log('Received values of form: ', values);
        try {
            const response = await axios({
                method: 'post',
                url: "http://localhost:5927/register",
                data: {
                    ...values,
                },
                withCredentials: true,
            })
            if (response.status === 200) {
                console.log("Register success");
                navigate("/login")
            }
        }catch (error) {
            console.error("Register error info: ", error);
        }
    };

    return (
        <div className="relative w-[100vw] h-[100vh]">
            <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name="userName"
                label="userName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username',
                    }
                ]}
                hasFeedback
            >
                <Input placeholder="userName"></Input>
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
            </div>
        </div>
    );
};

export default Register;
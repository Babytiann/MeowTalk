import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, NavLink } from "react-router";
import { useState } from 'react';

const Register = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values: { userName: string; password: string; confirm: string }) => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'post',
                url: "http://localhost:5927/register",
                data: {
                    userName: values.userName,
                    password: values.password,
                },
                withCredentials: true,
            });
            
            if (response.status === 200) {
                messageApi.success('注册成功！正在跳转到登录页面...');
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error: unknown) {
            const errorMessage = error && typeof error === 'object' && 'response' in error 
                ? (error as any).response?.data?.message 
                : '注册失败，请稍后重试';
            messageApi.error(errorMessage);
            console.error("Register error info: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                {/* 背景装饰 */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>

                {/* 注册卡片 */}
                <div className="relative w-full max-w-sm">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
                        {/* Logo区域 */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center mb-4">
                                <img 
                                    src="../../assets/img/克鲁鲁.jpg"
                                    alt="克鲁鲁的头像" 
                                    className="w-16 h-16 rounded-full object-cover shadow-md"
                                />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                MeowTalk
                            </h1>
                            <p className="text-gray-600 mt-1 text-sm">创建您的账户</p>
                        </div>

                        {/* 注册表单 */}
                        <Form
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            layout="vertical"
                            size="large"
                        >
                            <Form.Item
                                name="userName"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名！',
                                    },
                                    {
                                        min: 3,
                                        message: '用户名至少3个字符！',
                                    }
                                ]}
                            >
                                <Input 
                                    prefix={<UserOutlined className="text-gray-400" />} 
                                    placeholder="用户名"
                                    className="h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                    {
                                        min: 6,
                                        message: '密码至少6个字符！',
                                    }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-400" />} 
                                    placeholder="密码"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    className="h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: '请确认密码！',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('两次输入的密码不一致！'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-400" />} 
                                    placeholder="确认密码"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    className="h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={loading}
                                    className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {loading ? '注册中...' : '注册'}
                                </Button>
                            </Form.Item>

                            <div className="text-center mt-6">
                                <span className="text-gray-600">已有账户？</span>
                                <NavLink 
                                    to="/login" 
                                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                    立即登录
                                </NavLink>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
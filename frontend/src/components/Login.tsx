import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import { NavLink, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import axios from "axios";
import { saveAuthInfo, getAuthInfo, clearAuthInfo } from '../service/auth';

function Login() {
    const [loginSuccess, setLoginSuccess] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    // 检查是否有保存的登录信息
    useEffect(() => {
        const savedAuth = getAuthInfo();
        if (savedAuth) {
            // 如果有保存的登录信息，自动填充用户名
            form.setFieldsValue({
                userName: savedAuth.userName,
                remember: true
            });
        }
    }, []);

    const [form] = Form.useForm();

    const onFinish = async (values: { userName: string; password: string; remember: boolean }) => {
        setLoading(true);
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:5927/login",
                data: values,
                withCredentials: true,
            });
            
            if (response.status === 200) {
                setLoginSuccess(true);
                
                // 处理记住登录功能
                if (values.remember) {
                    saveAuthInfo({
                        userName: values.userName,
                        remember: true,
                        token: response.data.token // 如果后端返回token
                    });
                } else {
                    // 如果不记住登录，清除之前保存的信息
                    clearAuthInfo();
                }
                
                messageApi.success('登录成功！');
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            }
        } catch (err: unknown) {
            setLoginSuccess(false);
            const errorMessage = err && typeof err === 'object' && 'response' in err 
                ? (err as any).response?.data?.message 
                : '登录失败，请检查用户名和密码';
            messageApi.error(errorMessage);
            console.log("用户登录失败，错误返回为: ", err);
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

                {/* 登录卡片 */}
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
                            <p className="text-gray-600 mt-1 text-sm">欢迎回来，请登录您的账户</p>
                        </div>

                        {/* 登录表单 */}
                        <Form
                            form={form}
                            name="login"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            layout="vertical"
                            size="large"
                        >
                            <Form.Item
                                name="userName"
                                rules={[{ required: true, message: '请输入用户名！' }]}
                            >
                                <Input 
                                    prefix={<UserOutlined className="text-gray-400" />} 
                                    placeholder="用户名"
                                    className="h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </Form.Item>
                            
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码！' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-400" />} 
                                    placeholder="密码"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    className="h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </Form.Item>

                            {/* 错误提示 */}
                            {!loginSuccess && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">账号或密码错误！</p>
                                </div>
                            )}

                            <Form.Item>
                                <Flex justify="space-between" align="center" className="mb-6">
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox className="text-gray-700 hover:text-blue-600">
                                            记住我
                                        </Checkbox>
                                    </Form.Item>
                                    <NavLink 
                                        to="/reset" 
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                    >
                                        忘记密码？
                                    </NavLink>
                                </Flex>
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={loading}
                                    className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {loading ? '登录中...' : '登录'}
                                </Button>
                            </Form.Item>

                            <div className="text-center mt-6">
                                <span className="text-gray-600">还没有账户？</span>
                                <NavLink 
                                    to="/register" 
                                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                    立即注册
                                </NavLink>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
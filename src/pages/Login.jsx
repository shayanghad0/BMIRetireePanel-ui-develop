import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import BMILogo from '../assets/logo.jpg'
import {
    FiUser,
    FiLock,
    FiEye,
    FiEyeOff,
    FiLogIn,
    FiFileText,
    FiClipboard,
    FiDollarSign,
    FiMessageCircle,
    FiHelpCircle
} from 'react-icons/fi';

const showLoginError = (errText) => {
    Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: errText,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};
const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate inputs
        if (!username || !password) {
            setError('لطفاً نام کاربری و رمز عبور را وارد کنید');
            return;
        }

        setIsLoading(true);

        try {
            // API call exactly like the working version
            const res = await axios.post("http://192.168.5.96:8080/api/users/login", {
                Username: username,
                Password: password
            });

            const result = res.data;

            // Check if response contains token (format: something|token)
            if (String(result).includes("|")) {
                // Extract and store token
                const token = String(result).split("|")[1];
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify({ username }));

                setIsLoggedIn(true);

                navigate('/panel', { replace: true });
            } else {
                // Show error from API
                showLoginError(result);
            }
        } catch (error) {
            console.error("Login error:", error);
            showLoginError('خطا در برقراری ارتباط با سرور. لطفاً دوباره تلاش کنید.');
        } finally {
            setIsLoading(false);
        }
    };

    const features = [
        { icon: FiFileText, title: 'فیش حقوقی', desc: 'مشاهده و دانلود فیش حقوقی' },
        { icon: FiClipboard, title: 'احکام', desc: 'دریافت احکام اداری' },
        { icon: FiDollarSign, title: 'مستمری', desc: 'مدیریت پرداختی‌ها' },
        { icon: FiMessageCircle, title: 'ربات بله', desc: 'مدیریت ربات بله' }
    ];

    return (
        <div className="h-screen flex flex-col lg:flex-row overflow-auto" style={{fontFamily:"Vazir"}} dir="rtl">

            {/* Left Side - Branding (Desktop) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 to-orange-700 p-6 xl:p-8 items-center relative">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}></div>
                </div>

                <div className="relative z-10 w-full max-w-lg mx-auto">

                    {/* Logo */}
                    <div className='flex justify-center' >
                        <div className="bg-white rounded-2xl px-6 py-2 flex justify-center shadow-lg mb-6 w-fit ">
                            <div className="grid grid-cols-1 w-fit">
                                <div className=" flex items-center justify-center ">
                                    <img
                                        src={BMILogo}
                                        alt="Bank Melli Iran"
                                        className="w-26 h-32 "
                                    />
                                </div>
                                <div className='text-center' >
                                    <h2 className="text-lg font-bold text-gray-800 leading-tight">بانک ملی ایران</h2>
                                    <p className="text-xs text-gray-500">Bank Melli Iran</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mb-5 text-center " >
                        <h1 className="text-3xl xl:text-3xl font-black text-white leading-tight">
                            پنل خدمات بازنشستگان
                        </h1>
                        <p className="text-lg text-orange-100 mt-1">
                            بانک ملی ایران
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-5" dir='rtl'>
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 bg-orange-500 bg-opacity-30 rounded-xl px-2.5 py-4 border border-orange-400 border-opacity-20">
                                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center  justify-center flex-shrink-0">
                                    <feature.icon className="w-5 h-5     text-white" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-white font-medium text-regular leading-tight">{feature.title}</h3>
                                    <p className="text-orange-100 text-sm font-extralight truncate">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-gray-50">
                <div className="w-full max-w-sm">

                    {/* Mobile Layout - Connected Design */}
                    <div className="lg:hidden ">
                        {/* Logo with spacing */}
                        <div className='flex justify-center' >
                            <div className="bg-white rounded-2xl p-3 shadow-md mb-6 mx-auto inline-block  w-full max-w-[200px]">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                                        <img
                                            src={BMILogo}
                                            alt="Bank Melli Iran"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-gray-800 leading-tight">بانک ملی ایران</h2>
                                        <p className="text-xs text-gray-500">Bank Melli Iran</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Connected Panel - Title + Login Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Title Header - Connected to login card */}
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
                                <h1 className="text-lg font-black text-white text-center">پنل بازنشستگان</h1>
                            </div>

                            {/* Login Form */}
                            <div className="p-4">
                                <div className="text-center mb-4" style={{fontFamily:"Rubik"}} >
                                    <h2 className="text-lg font-bold text-gray-800" style={{fontFamily:"Vazir"}}>ورود به حساب کاربری</h2>
                                    <p className="text-gray-500 text-xs mt-1" style={{fontFamily:"Rubik"}} >اطلاعات کاربری خود را وارد کنید</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    {/* Username */}
                                    <div>
                                        <label className="block text-gray-700 text-xs font-medium mb-1.5 text-right">نام کاربری</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                                                <FiUser className="h-4 w-4 text-orange-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-2.5 pr-8 pl-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-right text-sm"
                                                placeholder="نام کاربری"
                                                dir="rtl"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-gray-700 text-xs font-medium mb-1.5 text-right">رمز عبور</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                                                <FiLock className="h-4 w-4 text-orange-400" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-2.5 pr-8 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-right text-sm"
                                                placeholder="رمز عبور"
                                                dir="rtl"
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 left-0 pl-2.5 flex items-center"
                                            >
                                                {showPassword ? (
                                                    <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-orange-500" />
                                                ) : (
                                                    <FiEye className="h-4 w-4 text-gray-400 hover:text-orange-500" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="flex items-center justify-between text-xs">
                                        <a href="#" className="text-orange-500 hover:text-orange-700 font-medium">فراموشی رمز؟</a>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-xs text-center">
                                            {error}
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center gap-1.5">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                در حال ورود...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-1.5">
                                                <FiLogIn className="h-4 w-4" />
                                                ورود به پنل
                                            </span>
                                        )}
                                    </button>

                                    {/* Support Link */}
                                    <div className="text-center">
                                        <a href="#" className="text-gray-400 hover:text-orange-500 text-xs transition-colors inline-flex items-center gap-1">
                                            <FiHelpCircle className="h-3.5 w-3.5" />
                                            نیاز به راهنمایی دارید؟
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-3">
                            <p className="text-gray-400 text-xs">
                                نسخه 1.0.0
                            </p>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:block">
                        <div className="bg-white rounded-2xl shadow-xl p-4 sm:px-6 sm:py-6">
                            <div className="text-center mb-4 py-4" style={{ fontFamily: "Vazir" }}>
                                <h2 className="text-xl font-bold text-gray-800">ورود به حساب کاربری</h2>
                                <p className="text-gray-500 text-xs mt-1">اطلاعات کاربری خود را وارد کنید</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Username */}
                                <div>
                                    <label className="block text-gray-700 text-xs font-medium mb-1.5 text-right">نام کاربری</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                                            <FiUser className="h-4 w-4 text-orange-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-2.5 pr-8 pl-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-right text-sm"
                                            placeholder="نام کاربری"
                                            dir="rtl"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-gray-700 text-xs font-medium mb-1.5 text-right">رمز عبور</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                                            <FiLock className="h-4 w-4 text-orange-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-2.5 pr-8 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-all text-right text-sm"
                                            placeholder="رمز عبور"
                                            dir="rtl"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 left-0 pl-2.5 flex items-center"
                                        >
                                            {showPassword ? (
                                                <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-orange-500" />
                                            ) : (
                                                <FiEye className="h-4 w-4 text-gray-400 hover:text-orange-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember & Forgot */}
                                <div className="flex items-center justify-between text-xs">
                                    <a href="#" className="text-orange-500 hover:text-orange-700 font-medium">فراموشی رمز؟</a>

                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-xl text-xs text-center">
                                        {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 rounded-xl transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-1.5">
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            در حال ورود...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-1.5">
                                            <FiLogIn className="h-4 w-4" />
                                            ورود به پنل
                                        </span>
                                    )}
                                </button>

                                {/* Support Link */}
                                <div className="text-center">
                                    <a href="#" className="text-gray-400 hover:text-orange-500 text-xs transition-colors inline-flex items-center gap-1">
                                        <FiHelpCircle className="h-3.5 w-3.5" />
                                        نیاز به راهنمایی دارید؟
                                    </a>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-3">
                            <p className="text-gray-400 text-xs">
                                نسخه 1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
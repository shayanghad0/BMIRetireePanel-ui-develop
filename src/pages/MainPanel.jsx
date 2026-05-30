import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BMILogo from "../assets/logo.jpg"
import {
  FiFileText,
  FiClipboard,
  FiDollarSign,
  FiMessageCircle,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiBell,
  FiChevronLeft,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Button,
  Input,
  Alert,
  Box,
  CircularProgress,
  CssVarsProvider,
  CssBaseline,
  Snackbar,
  IconButton
} from '@mui/joy';

const MainPanel = ({ setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showBotModal, setShowBotModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [messengerId, setMessengerId] = useState('');
  const [botError, setBotError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  const services = [
    {
      id: 'payslip',
      title: 'فیش حقوقی',
      icon: FiFileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: 'مشاهده و دانلود فیش حقوقی ماهانه'
    },
    {
      id: 'administrative-rules',  // ← Changed
      title: 'احکام اداری',        // ← Changed
      icon: FiClipboard,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      description: 'مشاهده احکام اداری و بازنشستگی'
    },
    {
      id: 'pension',
      title: 'مستمری',
      icon: FiDollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      description: 'اطلاعات مستمری و پرداختی‌ها'
    },
    {
      id: 'robot',
      title: 'فعال‌سازی ربات بله',
      icon: FiMessageCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      description: 'فعال‌سازی و تنظیمات ربات بله'
    }
  ];

  const handleServiceClick = (service) => {
    if (service.id === 'robot') {
      setShowBotModal(true);
    } else if (service.id === 'payslip') {
      navigate('/payslip');
    } else if (service.id === 'administrative-rules') {  // ← Changed
      navigate('/administrative-rules');                   // ← Changed
    } else {
      setSelectedService(service);
    }
  };

  const handleBotSubmit = (e) => {
    e.preventDefault();
    setBotError('');

    if (!phoneNumber || !messengerId) {
      setBotError('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    if (!phoneNumber.match(/^09\d{9}$/)) {
      setBotError('شماره موبایل معتبر نیست');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowBotModal(false);
      setShowSuccessAlert(true);
      setPhoneNumber('');
      setMessengerId('');

      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }, 1500);
  };

  const closeModal = () => {
    setShowBotModal(false);
    setPhoneNumber('');
    setMessengerId('');
    setBotError('');
  };

  return (
    <CssVarsProvider>
      <CssBaseline />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl" style={{ fontFamily: 'Vazir, Vazirmatn, sans-serif' }}>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={3000}
          onClose={() => setShowSuccessAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ mt: 2 }}
        >
          <Alert
            variant="solid"
            color="success"
            startDecorator={<FiCheckCircle />}
            endDecorator={
              <IconButton
                size="sm"
                variant="plain"
                color="success"
                onClick={() => setShowSuccessAlert(false)}
              >
                <FiXCircle />
              </IconButton>
            }
            sx={{
              minWidth: 300,
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Vazir, Vazirmatn, sans-serif',
            }}
          >
            ربات بله با موفقیت فعال‌سازی شد
          </Alert>
        </Snackbar>

        {/* Bot Activation Modal */}
        <Modal
          open={showBotModal}
          onClose={closeModal}
        >
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            sx={{
              maxWidth: 420,
              width: '100%',
              borderRadius: '16px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
              padding: 0,
              overflow: 'hidden',
              fontFamily: 'Vazir, Vazirmatn, sans-serif',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                color: 'white',
                px: 2.5,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <FiMessageCircle style={{ fontSize: 24 }} />
              <Typography
                level="title-md"
                sx={{
                  flex: 1,
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: 'Vazir, Vazirmatn, sans-serif',
                }}
              >
                فعال‌سازی ربات بله
              </Typography>
              <ModalClose
                variant="plain"
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: '#FED7AA',
                    background: 'rgba(255,255,255,0.1)'
                  }
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Info Alert */}
              <Alert
                variant="soft"
                color="neutral"
                startDecorator={<FiMessageCircle />}
                sx={{
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontFamily: 'Vazir, Vazirmatn, sans-serif',
                }}
              >
                با فعال‌سازی ربات بله، اطلاعیه‌ها و فیش‌های حقوقی از طریق پیام‌رسان بله برای شما ارسال خواهد شد.
              </Alert>

              <form onSubmit={handleBotSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Phone Number */}
                  <Box>
                    <Typography
                      level="body-sm"
                      sx={{
                        mb: 0.5,
                        fontWeight: 500,
                        fontFamily: 'Vazir, Vazirmatn, sans-serif',
                      }}
                    >
                      شماره موبایل
                    </Typography>
                    <Input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="09xxxxxxxxx"
                      dir="ltr"
                      size="md"
                      sx={{
                        borderRadius: '12px',
                        backgroundColor: '#F9FAFB',
                        fontFamily: 'Vazir, Vazirmatn, sans-serif',
                        '& input': {
                          textAlign: 'left',
                          direction: 'ltr',
                          fontFamily: 'Vazir, Vazirmatn, sans-serif',
                        },
                        '&:hover': {
                          borderColor: '#F97316',
                        },
                        '&.Mui-focused': {
                          borderColor: '#F97316',
                          boxShadow: '0 0 0 2px rgba(249, 115, 22, 0.2)',
                        }
                      }}
                      slotProps={{
                        input: {
                          maxLength: 11,
                        }
                      }}
                    />
                  </Box>

                  {/* Messenger ID */}
                  <Box>
                    <Typography
                      level="body-sm"
                      sx={{
                        mb: 0.5,
                        fontWeight: 500,
                        fontFamily: 'Vazir, Vazirmatn, sans-serif',
                      }}
                    >
                      شناسه کاربری پیام‌رسان بله
                    </Typography>
                    <Input
                      value={messengerId}
                      onChange={(e) => setMessengerId(e.target.value)}
                      placeholder="@username"
                      dir="ltr"
                      size="md"
                      sx={{
                        borderRadius: '12px',
                        backgroundColor: '#F9FAFB',
                        fontFamily: 'Vazir, Vazirmatn, sans-serif',
                        '& input': {
                          textAlign: 'left',
                          direction: 'ltr',
                          fontFamily: 'Vazir, Vazirmatn, sans-serif',
                        },
                        '&:hover': {
                          borderColor: '#F97316',
                        },
                        '&.Mui-focused': {
                          borderColor: '#F97316',
                          boxShadow: '0 0 0 2px rgba(249, 115, 22, 0.2)',
                        }
                      }}
                    />
                  </Box>

                  {/* Error */}
                  {botError && (
                    <Alert
                      variant="soft"
                      color="danger"
                      sx={{
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontFamily: 'Vazir, Vazirmatn, sans-serif',
                      }}
                    >
                      {botError}
                    </Alert>
                  )}

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
                    <Button
                      variant="plain"
                      color="neutral"
                      onClick={closeModal}
                      sx={{
                        flex: 1,
                        borderRadius: '12px',
                        py: 1.2,
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Vazir, Vazirmatn, sans-serif',
                      }}
                    >
                      انصراف
                    </Button>
                    <Button
                      type="submit"
                      onClick={handleBotSubmit}
                      disabled={isSubmitting}
                      variant="solid"
                      color="warning"
                      startDecorator={
                        isSubmitting ? (
                          <CircularProgress size="sm" />
                        ) : (
                          <FiCheckCircle />
                        )
                      }
                      sx={{
                        flex: 1,
                        borderRadius: '12px',
                        py: 1.2,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: 'Vazir, Vazirmatn, sans-serif',
                        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
                        },
                      }}
                    >
                      {isSubmitting ? 'در حال فعال‌سازی...' : 'فعال‌سازی'}
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </ModalDialog>
        </Modal>

        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex justify-between items-center h-14 sm:h-16">

              {/* Logo and Title */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center ">
                    <img
                      src={BMILogo}
                      alt="BMI"
                      className=" "
                    />
                  </div>
                </div>
                <div className="leading-tight" style={{ fontFamily: "Vazir" }}>
                  <h1 className="text-sm sm:text-base font-bold text-gray-900">پنل بازنشستگان</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">بانک ملی ایران</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2 lg:gap-3">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <FiBell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="text-right leading-tight">
                    <p className="text-xs font-medium text-gray-900">خوش آمدید</p>
                    <p className="text-xs text-gray-500">{user.username || 'کاربر'}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>خروج</span>
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
              <div className="px-3 py-2 space-y-1">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-right leading-tight">
                      <p className="text-xs font-medium text-gray-900">{user.username || 'کاربر'}</p>
                      <p className="text-xs text-gray-500">خوش آمدید</p>
                    </div>
                  </div>
                  <button className="relative p-1.5 text-gray-400 hover:text-gray-600">
                    <FiBell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  خروج از حساب کاربری
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

          {selectedService ? (
            // Table View
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">{selectedService.title}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedService.description}</p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  بازگشت
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase">ردیف</th>
                        <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase">تاریخ</th>
                        <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase">شرح</th>
                        <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                        <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500 uppercase">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[1, 2, 3, 4, 5].map((row) => (
                        <tr key={row} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-900">{row}</td>
                          <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-500">
                            ۱۴۰۲/۱۲/{String(row).padStart(2, '۰')}
                          </td>
                          <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-900">
                            {selectedService.title} - ماهانه
                          </td>
                          <td className="px-3 sm:px-4 py-2.5">
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              تایید شده
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-900 text-xs flex items-center gap-1 transition-colors">
                                <FiEye className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">مشاهده</span>
                              </button>
                              <button className="text-green-600 hover:text-green-900 text-xs flex items-center gap-1 transition-colors">
                                <FiDownload className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">دانلود</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            // Service Buttons Grid
            <>
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">خدمات بازنشستگان</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">لطفاً یکی از خدمات مورد نظر خود را انتخاب کنید</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 p-3 sm:p-4 text-center overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${service.bgColor} rounded-xl mb-2 sm:mb-3 group-hover:bg-white/20 transition-all duration-300`}>
                        <service.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${service.iconColor} group-hover:text-white transition-colors duration-300`} />
                      </div>

                      <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-xs text-gray-600 group-hover:text-white/90 transition-colors duration-300 leading-tight hidden sm:block">
                        {service.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">آخرین فیش حقوقی</p>
                      <p className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">اسفند ۱۴۰۲</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">وضعیت مستمری</p>
                      <p className="text-sm sm:text-base font-bold text-green-600 mt-0.5">فعال</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">آخرین حکم</p>
                      <p className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">۱۴۰۲/۰۸/۱۵</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiClipboard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </CssVarsProvider>
  );
};

export default MainPanel;
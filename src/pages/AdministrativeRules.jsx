import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiClipboard,
  FiDownload,
  FiEye,
  FiChevronRight,
  FiInfo,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Button,
  Box,
  CssVarsProvider,
  CssBaseline
} from '@mui/joy';

const AdministrativeRules = () => {
  const navigate = useNavigate();
  const [selectedRule, setSelectedRule] = useState(null);

  // Sample administrative rules data
  const rules = [
    {
      id: 1,
      title: 'حکم بازنشستگی',
      number: '۱۴۰۲/۱۲/۱۵-۴۵۶۷۸',
      date: '۱۴۰۲/۱۲/۱۵',
      type: 'بازنشستگی',
      status: 'فعال',
      description: 'حکم بازنشستگی بر اساس ۳۰ سال خدمت - Administrative Rule: Retirement',
      details: {
        issueDate: '۱۴۰۲/۱۲/۱۵',
        effectiveDate: '۱۴۰۳/۰۱/۰۱',
        yearsOfService: '۳۰',
        ruleType: 'بازنشستگی عادی',
        issuer: 'اداره کل بازنشستگی',
        ruleNumber: '۴۵۶۷۸/۱۲/۱۴۰۲',
        monthlyPension: '۱۵۰,۰۰۰,۰۰۰',
        insuranceNumber: '۱۰۲۳۴۵۶۷۸۹',
        additionalInfo: 'این حکم بر اساس ماده ۱۰۳ قانون مدیریت خدمات کشوری صادر شده است.',
      }
    },
    {
      id: 2,
      title: 'حکم افزایش سنواتی',
      number: '۱۴۰۲/۰۸/۲۰-۳۲۱۴۵',
      date: '۱۴۰۲/۰۸/۲۰',
      type: 'افزایش',
      status: 'فعال',
      description: 'افزایش سنواتی پایه دوم - Administrative Rule: Annual Increment',
      details: {
        issueDate: '۱۴۰۲/۰۸/۲۰',
        effectiveDate: '۱۴۰۲/۰۹/۰۱',
        yearsOfService: '۲۸',
        ruleType: 'افزایش سنواتی',
        issuer: 'اداره کل بازنشستگی',
        ruleNumber: '۳۲۱۴۵/۰۸/۱۴۰۲',
        monthlyPension: '۱۴۵,۰۰۰,۰۰۰',
        insuranceNumber: '۱۰۲۳۴۵۶۷۸۹',
        additionalInfo: 'این حکم بر اساس افزایش سنواتی سالانه صادر شده است.',
      }
    },
    {
      id: 3,
      title: 'حکم اصلاح حقوق',
      number: '۱۴۰۲/۰۴/۱۰-۲۳۴۵۶',
      date: '۱۴۰۲/۰۴/۱۰',
      type: 'اصلاح',
      status: 'فعال',
      description: 'اصلاح حکم حقوقی بر اساس بخشنامه جدید - Administrative Rule: Salary Adjustment',
      details: {
        issueDate: '۱۴۰۲/۰۴/۱۰',
        effectiveDate: '۱۴۰۲/۰۵/۰۱',
        yearsOfService: '۲۷',
        ruleType: 'اصلاح حکم',
        issuer: 'معاونت اداری و مالی',
        ruleNumber: '۲۳۴۵۶/۰۴/۱۴۰۲',
        monthlyPension: '۱۴۲,۰۰۰,۰۰۰',
        insuranceNumber: '۱۰۲۳۴۵۶۷۸۹',
        additionalInfo: 'اصلاح بر اساس بخشنامه شماره ۴۵۶/۱۴۰۲ مورخ ۱۴۰۲/۰۴/۰۱ انجام شده است.',
      }
    },
    {
      id: 4,
      title: 'حکم کارگزینی',
      number: '۱۴۰۱/۱۱/۲۵-۱۲۳۴۵',
      date: '۱۴۰۱/۱۱/۲۵',
      type: 'کارگزینی',
      status: 'منقضی',
      description: 'آخرین حکم کارگزینی قبل از بازنشستگی - Administrative Rule: Personnel Record',
      details: {
        issueDate: '۱۴۰۱/۱۱/۲۵',
        effectiveDate: '۱۴۰۲/۰۱/۰۱',
        yearsOfService: '۲۹',
        ruleType: 'کارگزینی',
        issuer: 'اداره کارگزینی',
        ruleNumber: '۱۲۳۴۵/۱۱/۱۴۰۱',
        monthlyPension: '۱۳۸,۰۰۰,۰۰۰',
        insuranceNumber: '۱۰۲۳۴۵۶۷۸۹',
        additionalInfo: 'آخرین حکم کارگزینی پیش از صدور حکم بازنشستگی.',
      }
    },
    {
      id: 5,
      title: 'حکم تطبیق',
      number: '۱۴۰۱/۰۶/۱۵-۵۴۳۲۱',
      date: '۱۴۰۱/۰۶/۱۵',
      type: 'تطبیق',
      status: 'منقضی',
      description: 'تطبیق وضعیت استخدامی - Administrative Rule: Status Alignment',
      details: {
        issueDate: '۱۴۰۱/۰۶/۱۵',
        effectiveDate: '۱۴۰۱/۰۷/۰۱',
        yearsOfService: '۲۸',
        ruleType: 'تطبیق',
        issuer: 'اداره کل امور اداری',
        ruleNumber: '۵۴۳۲۱/۰۶/۱۴۰۱',
        monthlyPension: '۱۳۵,۰۰۰,۰۰۰',
        insuranceNumber: '۱۰۲۳۴۵۶۷۸۹',
        additionalInfo: 'تطبیق وضعیت بر اساس قانون جدید مدیریت خدمات کشوری.',
      }
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'فعال':
        return 'bg-green-100 text-green-700';
      case 'منقضی':
        return 'bg-gray-100 text-gray-700';
      case 'در انتظار':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'بازنشستگی':
        return <FiCheckCircle className="w-4 h-4" />;
      case 'افزایش':
        return <FiAlertCircle className="w-4 h-4" />;
      case 'اصلاح':
        return <FiInfo className="w-4 h-4" />;
      case 'کارگزینی':
        return <FiClipboard className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  return (
    <CssVarsProvider>
      <CssBaseline />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" dir="rtl" style={{ fontFamily: 'Vazir, Vazirmatn, sans-serif' }}>
        
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => navigate('/panel')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiChevronRight className="w-4 h-4" />
                  <span className="hidden sm:inline">بازگشت به پنل</span>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <FiClipboard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm sm:text-base font-bold text-gray-900">احکام اداری</h1>
                    <p className="text-xs text-gray-500 hidden sm:block">Administrative Rules</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">تعداد احکام: {rules.length}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-gray-500 mb-1">کل احکام</p>
              <p className="text-lg font-bold text-gray-900">{rules.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-gray-500 mb-1">احکام فعال</p>
              <p className="text-lg font-bold text-green-600">{rules.filter(d => d.status === 'فعال').length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-gray-500 mb-1">آخرین حکم</p>
              <p className="text-sm font-bold text-gray-900">بازنشستگی</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-gray-500 mb-1">تاریخ آخرین حکم</p>
              <p className="text-sm font-bold text-gray-900">۱۴۰۲/۱۲/۱۵</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">ردیف</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">عنوان حکم</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">شماره حکم</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">تاریخ صدور</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">نوع</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">وضعیت</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">عملیات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-900">{rule.id}</td>
                      <td className="px-3 sm:px-4 py-2.5 text-xs font-medium text-gray-900">{rule.title}</td>
                      <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-500">{rule.number}</td>
                      <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-500">{rule.date}</td>
                      <td className="px-3 sm:px-4 py-2.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                          {getTypeIcon(rule.type)}
                          {rule.type}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(rule.status)}`}>
                          {rule.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedRule(rule)}
                            className="text-blue-600 hover:text-blue-900 text-xs flex items-center gap-1 transition-colors"
                          >
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
        </main>

        {/* Joy UI Modal for Rule Details */}
        <Modal 
          open={!!selectedRule} 
          onClose={() => setSelectedRule(null)}
        >
          <ModalDialog
            variant="outlined"
            role="dialog"
            sx={{
              maxWidth: 700,
              width: '100%',
              maxHeight: '90vh',
              borderRadius: '16px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                px: 3,
                py: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexShrink: 0,
                fontFamily:"Vazir"
              }}
            >
              <FiClipboard style={{ fontSize: 24 }} />
              <Typography 
                level="title-lg" 
                sx={{ 
                  flex: 1, 
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                {selectedRule?.title}
              </Typography>
              <ModalClose 
                variant="plain" 
                sx={{ 
                  color: 'white',
                  '&:hover': { 
                    color: '#D1FAE5',
                    background: 'rgba(255,255,255,0.1)'
                  }
                }} 
              />
            </Box>

            {/* Scrollable Content */}
            <Box sx={{ 
              p: 3, 
              overflowY: 'auto',
              fontFamily:"Vazir",
              flex: 1,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#F3F4F6',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#D1D5DB',
                borderRadius: '4px',
                '&:hover': {
                  background: '#9CA3AF',
                },
              },
            }}>
              {/* Rule Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="col-span-2 p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">توضیحات</p>
                  <p className="text-sm text-gray-900">{selectedRule?.description}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">شماره حکم</p>
                  <p className="text-sm font-bold text-gray-900">{selectedRule?.details.ruleNumber}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">تاریخ صدور</p>
                  <p className="text-sm font-bold text-gray-900">{selectedRule?.details.issueDate}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">تاریخ اجرا</p>
                  <p className="text-sm font-bold text-gray-900">{selectedRule?.details.effectiveDate}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">نوع حکم</p>
                  <p className="text-sm font-bold text-gray-900">{selectedRule?.details.ruleType}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">سال‌های خدمت</p>
                  <p className="text-sm font-bold text-gray-900">{selectedRule?.details.yearsOfService} سال</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">مرجع صادر کننده</p>
                  <p className="text-sm font-bold text-gray-900">{selectedRule?.details.issuer}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">مستمری ماهانه</p>
                  <p className="text-sm font-bold text-green-600">{selectedRule?.details.monthlyPension} ریال</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">شماره بیمه</p>
                  <p className="text-sm font-bold text-gray-900">{selectedRule?.details.insuranceNumber}</p>
                </div>
                <div className="col-span-2 p-4 bg-blue-50 rounded-xl">
                  <p className="text-xs text-blue-600 mb-1">اطلاعات تکمیلی</p>
                  <p className="text-sm text-gray-900">{selectedRule?.details.additionalInfo}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="solid"
                  color="success"
                  startDecorator={<FiDownload />}
                  fullWidth
                  sx={{
                    borderRadius: '12px',
                    py: 1.2,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    },
                  }}
                >
                  دانلود حکم
                </Button>
                <Button
                  variant="plain"
                  color="neutral"
                  startDecorator={<FiEye />}
                  fullWidth
                  sx={{
                    borderRadius: '12px',
                    py: 1.2,
                    fontSize: '14px',
                    fontWeight: 500,
                    backgroundColor: '#F3F4F6',
                    '&:hover': {
                      backgroundColor: '#E5E7EB',
                    },
                  }}
                >
                  مشاهده کامل
                </Button>
              </div>
            </Box>
          </ModalDialog>
        </Modal>
      </div>
    </CssVarsProvider>
  );
};

export default AdministrativeRules;
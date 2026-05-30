import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiFileText,
  FiDownload,
  FiEye,
  FiChevronRight,
  FiCalendar,
  FiDollarSign,
  FiPrinter,
  FiClock
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

const PayslipPage = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('12');
  const [selectedYear, setSelectedYear] = useState('1402');
  const [viewModal, setViewModal] = useState(null);

  // Sample payslip data
  const payslips = [
    { id: 1, month: 'فروردین', year: '۱۴۰۳', status: 'پرداخت شده', amount: '۱۵۰,۰۰۰,۰۰۰', date: '۱۴۰۳/۰۱/۳۱' },
    { id: 2, month: 'اسفند', year: '۱۴۰۲', status: 'پرداخت شده', amount: '۱۴۵,۰۰۰,۰۰۰', date: '۱۴۰۲/۱۲/۲۹' },
    { id: 3, month: 'بهمن', year: '۱۴۰۲', status: 'پرداخت شده', amount: '۱۴۲,۰۰۰,۰۰۰', date: '۱۴۰۲/۱۱/۳۰' },
    { id: 4, month: 'دی', year: '۱۴۰۲', status: 'پرداخت شده', amount: '۱۴۰,۰۰۰,۰۰۰', date: '۱۴۰۲/۱۰/۳۰' },
    { id: 5, month: 'آذر', year: '۱۴۰۲', status: 'پرداخت شده', amount: '۱۳۸,۰۰۰,۰۰۰', date: '۱۴۰۲/۰۹/۲۹' },
    { id: 6, month: 'آبان', year: '۱۴۰۲', status: 'پرداخت شده', amount: '۱۳۵,۰۰۰,۰۰۰', date: '۱۴۰۲/۰۸/۳۰' },
  ];

  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  const years = ['۱۴۰۳', '۱۴۰۲', '۱۴۰۱', '۱۴۰۰'];

  const handlePrint = () => {
    if (!viewModal) return;

    const benefits = {
      'حقوق پایه': '۱۲۰,۰۰۰,۰۰۰',
      'فوق‌العاده ویژه': '۲۵,۰۰۰,۰۰۰',
      'حق مسکن': '۱۰,۰۰۰,۰۰۰',
      'حق اولاد': '۵,۰۰۰,۰۰۰',
      'بن کارگری': '۸,۰۰۰,۰۰۰',
      'عائله‌مندی': '۴,۵۰۰,۰۰۰',
      'پاداش عملکرد': '۷,۵۰۰,۰۰۰',
    };

    const deductions = {
      'بیمه سهم کارمند': '۸,۴۰۰,۰۰۰',
      'مالیات': '۱۲,۵۰۰,۰۰۰',
      'بیمه تکمیلی': '۳,۵۰۰,۰۰۰',
      'صندوق بازنشستگی': '۴,۲۰۰,۰۰۰',
      'وام اقساطی': '۵,۰۰۰,۰۰۰',
      'بیمه عمر': '۲,۸۰۰,۰۰۰',
      'سایر کسورات': '۱,۶۰۰,۰۰۰',
    };

    const totalBenefits = '۱۸۰,۰۰۰,۰۰۰';
    const totalDeductions = '۳۸,۰۰۰,۰۰۰';
    const netSalary = '۱۴۲,۰۰۰,۰۰۰';

    const workRows = [
      { title: 'روزهای کارکرد', value: '۳۰' },
      { title: 'ساعات کارکرد', value: '۱۹۲' },
      { title: 'اضافه کار (ساعت)', value: '۲۰' },
      { title: 'تعطیل کاری (ساعت)', value: '۸' },
      { title: 'شیفت کاری', value: '۱۰' },
      { title: 'ماموریت (روز)', value: '۲' },
      { title: 'مرخصی استحقاقی', value: '۱' },
    ];

    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl">
        <head>
          <title>فیش حقوقی ${viewModal.month} ${viewModal.year}</title>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700;800&display=swap');
            
            * {
              font-family: 'Vazirmatn', 'Vazir', sans-serif;
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              padding: 20px;
              background: white;
              color: #1F2937;
            }
            
            .print-header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 3px solid #3B82F6;
            }
            
            .print-header .bank-logo {
              font-size: 16px;
              font-weight: bold;
              color: #F97316;
              margin-bottom: 5px;
            }
            
            .print-header h1 {
              font-size: 20px;
              color: #1E40AF;
              margin-bottom: 5px;
            }
            
            .print-header p {
              font-size: 14px;
              color: #6B7280;
            }
            
            .employee-info {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
              padding: 15px;
              background: #F0F9FF;
              border: 1px solid #BFDBFE;
              border-radius: 8px;
              margin-bottom: 15px;
            }
            
            .employee-info div {
              text-align: right;
            }
            
            .employee-info .label {
              font-size: 11px;
              color: #6B7280;
              margin-bottom: 3px;
            }
            
            .employee-info .value {
              font-size: 13px;
              font-weight: bold;
              color: #1F2937;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
              direction: rtl;
            }
            
            table th {
              background: #F3F4F6;
              padding: 10px;
              font-size: 13px;
              font-weight: bold;
              border: 1px solid #D1D5DB;
              text-align: center;
            }
            
            table td {
              padding: 8px 10px;
              font-size: 12px;
              border: 1px solid #D1D5DB;
              text-align: right;
            }
            
            table td.amount {
              font-weight: 500;
              text-align: right;
            }
            
            table td.deduction {
              color: #DC2626;
              text-align: right;
            }
            
            table tr.total-row {
              background: #EFF6FF;
              font-weight: bold;
            }
            
            table tr.total-row td {
              font-weight: bold;
              font-size: 13px;
            }
            
            .summary {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              margin-bottom: 15px;
            }
            
            .summary-card {
              padding: 12px;
              border-radius: 8px;
              border: 1px solid #D1D5DB;
              text-align: right;
            }
            
            .summary-card.benefits {
              background: #F0FDF4;
              border-color: #86EFAC;
            }
            
            .summary-card.deductions {
              background: #FEF2F2;
              border-color: #FCA5A5;
            }
            
            .summary-card.net {
              background: #EFF6FF;
              border-color: #93C5FD;
            }
            
            .summary-card .label {
              font-size: 11px;
              color: #6B7280;
              margin-bottom: 4px;
            }
            
            .summary-card .amount {
              font-size: 16px;
              font-weight: 900;
            }
            
            .summary-card.benefits .amount { color: #16A34A; }
            .summary-card.deductions .amount { color: #DC2626; }
            .summary-card.net .amount { color: #2563EB; }
            
            .payment-info {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
              padding: 12px;
              background: #F9FAFB;
              border-radius: 8px;
              margin-bottom: 15px;
            }
            
            .payment-info div {
              text-align: right;
            }
            
            .payment-info .label {
              font-size: 11px;
              color: #6B7280;
              margin-bottom: 3px;
            }
            
            .payment-info .value {
              font-size: 12px;
              font-weight: bold;
              color: #1F2937;
            }
            
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 10px;
              border-top: 2px solid #E5E7EB;
              font-size: 11px;
              color: #9CA3AF;
            }
            
            @media print {
              body {
                padding: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              @page {
                size: A4;
                margin: 15mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <div class="bank-logo">بانک ملی ایران</div>
            <h1>فیش حقوقی ${viewModal.month} ${viewModal.year}</h1>
            <p>شماره فیش: ${viewModal.id} | تاریخ پرداخت: ${viewModal.date}</p>
          </div>
          
          <div class="employee-info">
            <div>
              <div class="label">نام و نام خانوادگی</div>
              <div class="value">علی محمدی</div>
            </div>
            <div>
              <div class="label">کد پرسنلی</div>
              <div class="value">۱۰۲۳۴۵۶</div>
            </div>
            <div>
              <div class="label">ماه حقوق</div>
              <div class="value">${viewModal.month} ${viewModal.year}</div>
            </div>
            <div>
              <div class="label">تاریخ پرداخت</div>
              <div class="value">${viewModal.date}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th colspan="2">کارکرد</th>
                <th colspan="2">مزایا</th>
                <th colspan="2">کسور</th>
              </tr>
              <tr>
                <th>عنوان</th>
                <th>مقدار</th>
                <th>عنوان</th>
                <th>مقدار (ریال)</th>
                <th>عنوان</th>
                <th>مقدار (ریال)</th>
              </tr>
            </thead>
            <tbody>
              ${workRows.map((work, index) => {
      const benefitKeys = Object.keys(benefits);
      const deductionKeys = Object.keys(deductions);
      return `
                  <tr>
                    <td>${work.title}</td>
                    <td>${work.value}</td>
                    <td>${benefitKeys[index] || ''}</td>
                    <td class="amount">${benefits[benefitKeys[index]] || ''}</td>
                    <td>${deductionKeys[index] || ''}</td>
                    <td class="amount deduction">${deductions[deductionKeys[index]] || ''}</td>
                  </tr>
                `;
    }).join('')}
              <tr class="total-row">
                <td>جمع کارکرد</td>
                <td>۲۶۳ واحد</td>
                <td>جمع مزایا</td>
                <td class="amount" style="color: #16A34A;">${totalBenefits}</td>
                <td>جمع کسورات</td>
                <td class="amount" style="color: #DC2626;">${totalDeductions}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="summary">
            <div class="summary-card benefits">
              <div class="label">جمع مزایا و پرداختی‌ها</div>
              <div class="amount">${totalBenefits} ریال</div>
            </div>
            <div class="summary-card deductions">
              <div class="label">جمع کسورات قانونی</div>
              <div class="amount">${totalDeductions} ریال</div>
            </div>
            <div class="summary-card net">
              <div class="label">خالص دریافتی</div>
              <div class="amount">${netSalary} ریال</div>
            </div>
          </div>
          
          <div class="payment-info">
            <div>
              <div class="label">شماره حساب</div>
              <div class="value">۶۰۳۷-۹۹۱۸-۲۳۴۵-۶۷۸۹</div>
            </div>
            <div>
              <div class="label">بانک</div>
              <div class="value">ملی ایران</div>
            </div>
            <div>
              <div class="label">شماره بیمه</div>
              <div class="value">۱۰۲۳۴۵۶۷۸۹</div>
            </div>
            <div>
              <div class="label">وضعیت</div>
              <div class="value">${viewModal.status}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>این فیش به صورت خودکار توسط سامانه بانک ملی ایران صادر شده است.</p>
            <p>تاریخ چاپ: ${new Date().toLocaleDateString('fa-IR')}</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = function () {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    };
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
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm sm:text-base font-bold text-gray-900">فیش حقوقی</h1>
                    <p className="text-xs text-gray-500 hidden sm:block">مشاهده و دانلود فیش‌های حقوقی</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">سال مالی ۱۴۰۳-۱۴۰۲</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">ماه</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  {months.map((month, index) => (
                    <option key={index} value={String(index + 1).padStart(2, '0')}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">سال</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex items-end gap-2">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5">
                  <FiEye className="w-3.5 h-3.5" />
                  جستجو
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 px-4 rounded-lg transition-colors">
                  نمایش همه
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-gray-500 mb-1">آخرین فیش</p>
              <p className="text-sm sm:text-base font-bold text-gray-900">اسفند ۱۴۰۲</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-gray-500 mb-1">مبلغ خالص</p>
              <p className="text-sm sm:text-base font-bold text-green-600">۱۵۰,۰۰۰,۰۰۰</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-gray-500 mb-1">کسر قانونی</p>
              <p className="text-sm sm:text-base font-bold text-red-600">۳۰,۰۰۰,۰۰۰</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
              <p className="text-xs text-gray-500 mb-1">مزایا</p>
              <p className="text-sm sm:text-base font-bold text-blue-600">۳۰,۰۰۰,۰۰۰</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">ردیف</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">ماه</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">سال</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">مبلغ (ریال)</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">تاریخ پرداخت</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">وضعیت</th>
                    <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-medium text-gray-500">عملیات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payslips.map((payslip) => (
                    <tr key={payslip.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-900">{payslip.id}</td>
                      <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-900">{payslip.month}</td>
                      <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-900">{payslip.year}</td>
                      <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-900 font-medium">{payslip.amount}</td>
                      <td className="px-3 sm:px-4 py-2.5 text-xs text-gray-500">{payslip.date}</td>
                      <td className="px-3 sm:px-4 py-2.5">
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          {payslip.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewModal(payslip)}
                            className="text-blue-600 hover:text-blue-900 text-xs flex items-center gap-1 transition-colors"
                          >
                            <FiEye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">مشاهده</span>
                          </button>
                          <button className="text-green-600 hover:text-green-900 text-xs flex items-center gap-1 transition-colors">
                            <FiDownload className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">دانلود PDF</span>
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 text-xs hidden sm:flex items-center gap-1 transition-colors">
                            <FiPrinter className="w-3.5 h-3.5" />
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

        {/* Joy UI Modal for Payslip Details */}
        <Modal
          open={!!viewModal}
          onClose={() => setViewModal(null)}
        >
          <ModalDialog
            variant="outlined"
            role="dialog"
            sx={{
              maxWidth: 900,
              width: '100%',
              maxHeight: '90vh',
              borderRadius: '16px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Vazir, Vazirmatn, sans-serif',
            }}
          >
            {/* Modal Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: 'white',
                px: 3,
                py: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexShrink: 0,
                fontFamily: 'Vazir, Vazirmatn, sans-serif',
              }}
            >
              <FiFileText style={{ fontSize: 24 }} />
              <Typography
                level="title-lg"
                sx={{
                  flex: 1,
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: 'Vazir, Vazirmatn, sans-serif',
                }}
              >
                فیش حقوقی {viewModal?.month} {viewModal?.year}
              </Typography>
              <ModalClose
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: '#DBEAFE',
                    background: 'rgba(255,255,255,0.1)'
                  },
                  '& svg': {
                    color: 'white',
                  }
                }}
              />
            </Box>

            {/* Scrollable Content */}
            <Box sx={{
              p: 3,
              overflowY: 'auto',
              flex: 1,
              fontFamily: 'Vazir, Vazirmatn, sans-serif',
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

              {/* Employee Info Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">نام و نام خانوادگی</p>
                    <p className="text-sm font-bold text-gray-900">علی محمدی</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">کد پرسنلی</p>
                    <p className="text-sm font-bold text-gray-900">۱۰۲۳۴۵۶</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">ماه حقوق</p>
                    <p className="text-sm font-bold text-gray-900">{viewModal?.month} {viewModal?.year}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">تاریخ پرداخت</p>
                    <p className="text-sm font-bold text-gray-900">{viewModal?.date}</p>
                  </div>
                </div>
              </div>

              {/* Main Salary Table */}
              <div className="bg-white rounded-xl border border-black overflow-y-hidden mb-6 overflow-x-auto  ">
                <table className="w-full" style={{ direction: 'rtl', fontFamily: 'Vazir, Vazirmatn, sans-serif' }}>
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-3 text-center text-sm font-bold text-blue-700 border-b border-l border-black" colSpan={2}>
                        <div className="flex items-center justify-center gap-2">
                          <FiClock className="w-4 h-4 text-blue-600" />
                          کارکرد
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-green-700 border-b border-l border-black" colSpan={2}>
                        <div className="flex items-center justify-center gap-2">
                          <FiDollarSign className="w-4 h-4 text-green-600" />
                          مزایا
                        </div>
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-red-700 border-b border-black" colSpan={2}>
                        <div className="flex items-center justify-center gap-2">
                          <FiDollarSign className="w-4 h-4 text-red-600" />
                          کسور
                        </div>
                      </th>
                    </tr>
                    <tr className="bg-gray-100">
                      <th className="px-3 py-2 text-right text-xs font-bold text-black border-b border-l border-black">عنوان</th>
                      <th className="px-3 py-2 text-right text-xs font-bold text-black border-b border-l border-black">مقدار </th>
                      <th className="px-3 py-2 text-right text-xs font-bold text-black border-b border-l border-black">عنوان</th>
                      <th className="px-3 py-2 text-right text-xs font-bold text-black border-b border-l border-black">مقدار (ریال)</th>
                      <th className="px-3 py-2 text-right text-xs font-bold text-black border-b border-l border-black">عنوان</th>
                      <th className="px-3 py-2 text-right text-xs font-bold text-black border-b border-black">مقدار (ریال)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black">
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5 text-xs text-blue-700 border-l border-black text-right">روزهای کارکرد</td>
                      <td className="px-3 py-2.5 text-xs text-blue-700 text-right border-l border-black">۳۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">حقوق پایه</td>
                      <td className="px-3 py-2.5 text-xs text-green-700 text-right font-bold border-l border-black">۱۲۰,۰۰۰,۰۰۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">بیمه سهم کارمند</td>
                      <td className="px-3 py-2.5 text-xs text-red-600 text-right font-bold">۸,۴۰۰,۰۰۰</td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                      <td className="px-3 py-2.5 text-xs text-blue-700 border-l border-black text-right">ساعات کارکرد</td>
                      <td className="px-3 py-2.5 text-xs text-blue-700 text-right border-l border-black">۱۹۲</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">فوق‌العاده ویژه</td>
                      <td className="px-3 py-2.5 text-xs text-green-700 text-right font-bold border-l border-black">۲۵,۰۰۰,۰۰۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">مالیات</td>
                      <td className="px-3 py-2.5 text-xs text-red-600 text-right font-bold">۱۲,۵۰۰,۰۰۰</td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5 text-xs text-blue-700 border-l border-black text-right">اضافه کار (ساعت)</td>
                      <td className="px-3 py-2.5 text-xs text-blue-700 text-right border-l border-black">۲۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">حق مسکن</td>
                      <td className="px-3 py-2.5 text-xs text-green-700 text-right font-bold border-l border-black">۱۰,۰۰۰,۰۰۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">بیمه تکمیلی</td>
                      <td className="px-3 py-2.5 text-xs text-red-600 text-right font-bold">۳,۵۰۰,۰۰۰</td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                      <td className="px-3 py-2.5 text-xs text-blue-700 border-l border-black text-right">تعطیل کاری (ساعت)</td>
                      <td className="px-3 py-2.5 text-xs text-blue-700 text-right border-l border-black">۸</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">حق اولاد</td>
                      <td className="px-3 py-2.5 text-xs text-green-700 text-right font-bold border-l border-black">۵,۰۰۰,۰۰۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">صندوق بازنشستگی</td>
                      <td className="px-3 py-2.5 text-xs text-red-600 text-right font-bold">۴,۲۰۰,۰۰۰</td>
                    </tr>
                    {/* Row 5 */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5 text-xs text-blue-700 border-l border-black text-right">شیفت کاری</td>
                      <td className="px-3 py-2.5 text-xs text-blue-700 text-right border-l border-black">۱۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">بن کارگری</td>
                      <td className="px-3 py-2.5 text-xs text-green-700 text-right font-bold border-l border-black">۸,۰۰۰,۰۰۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">وام اقساطی</td>
                      <td className="px-3 py-2.5 text-xs text-red-600 text-right font-bold">۵,۰۰۰,۰۰۰</td>
                    </tr>
                    {/* Row 6 */}
                    <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                      <td className="px-3 py-2.5 text-xs text-blue-700 border-l border-black text-right">ماموریت (روز)</td>
                      <td className="px-3 py-2.5 text-xs text-blue-700 text-right border-l border-black">۲</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">عائله‌مندی</td>
                      <td className="px-3 py-2.5 text-xs text-green-700 text-right font-bold border-l border-black">۴,۵۰۰,۰۰۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">بیمه عمر</td>
                      <td className="px-3 py-2.5 text-xs text-red-600 text-right font-bold">۲,۸۰۰,۰۰۰</td>
                    </tr>
                    {/* Row 7 */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5 text-xs text-blue-700 border-l border-black text-right">مرخصی استحقاقی</td>
                      <td className="px-3 py-2.5 text-xs text-blue-700 text-right border-l border-black">۱</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">پاداش عملکرد</td>
                      <td className="px-3 py-2.5 text-xs text-green-700 text-right font-bold border-l border-black">۷,۵۰۰,۰۰۰</td>
                      <td className="px-3 py-2.5 text-xs text-black border-l border-black text-right">سایر کسورات</td>
                      <td className="px-3 py-2.5 text-xs text-red-600 text-right font-bold">۱,۶۰۰,۰۰۰</td>
                    </tr>
                    {/* Row 8 - Totals */}
                    <tr className="bg-gray-200 font-bold border-t border-black">
                      <td className="px-3 py-3 text-xs text-blue-700 border-l border-black text-right">جمع کارکرد</td>
                      <td className="px-3 py-3 text-xs text-blue-700 text-right border-l border-black">۲۶۳ واحد</td>
                      <td className="px-3 py-3 text-xs text-black border-l border-black text-right">جمع مزایا</td>
                      <td className="px-3 py-3 text-sm text-green-700 text-right font-extrabold border-l border-black">۱۸۰,۰۰۰,۰۰۰</td>
                      <td className="px-3 py-3 text-xs text-black border-l border-black text-right">جمع کسورات</td>
                      <td className="px-3 py-3 text-sm text-red-700 text-right font-extrabold">۳۸,۰۰۰,۰۰۰</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Net Amount Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 text-right">
                  <p className="text-xs text-gray-600 mb-1">جمع مزایا و پرداختی‌ها</p>
                  <p className="text-lg font-black text-green-700">۱۸۰,۰۰۰,۰۰۰</p>
                  <p className="text-xs text-gray-500 mt-1">ریال</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-200 text-right">
                  <p className="text-xs text-gray-600 mb-1">جمع کسورات قانونی</p>
                  <p className="text-lg font-black text-red-700">۳۸,۰۰۰,۰۰۰</p>
                  <p className="text-xs text-gray-500 mt-1">ریال</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 text-right">
                  <p className="text-xs text-gray-600 mb-1">خالص دریافتی</p>
                  <p className="text-lg font-black text-blue-700">۱۴۲,۰۰۰,۰۰۰</p>
                  <p className="text-xs text-gray-500 mt-1">ریال</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">شماره حساب</p>
                    <p className="text-sm font-bold text-gray-900" dir="ltr" style={{ textAlign: 'right' }}>۶۰۳۷-۹۹۱۸-۲۳۴۵-۶۷۸۹</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">بانک</p>
                    <p className="text-sm font-bold text-gray-900">ملی ایران</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">شماره بیمه</p>
                    <p className="text-sm font-bold text-gray-900" dir="ltr" style={{ textAlign: 'right' }}>۱۰۲۳۴۵۶۷۸۹</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">وضعیت</p>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 inline-block">
                      {viewModal?.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="solid"
                  color="primary"
                  startDecorator={<FiDownload />}
                  fullWidth
                  sx={{
                    borderRadius: '12px',
                    py: 1.2,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily: 'Vazir, Vazirmatn, sans-serif',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    },
                  }}
                >
                  دانلود PDF
                </Button>
                <Button
                  variant="plain"
                  color="neutral"
                  startDecorator={<FiPrinter />}
                  fullWidth
                  onClick={handlePrint}
                  sx={{
                    borderRadius: '12px',
                    py: 1.2,
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Vazir, Vazirmatn, sans-serif',
                    backgroundColor: '#F3F4F6',
                    '&:hover': {
                      backgroundColor: '#E5E7EB',
                    },
                  }}
                >
                  چاپ
                </Button>
              </div>
            </Box>
          </ModalDialog>
        </Modal>
      </div>
    </CssVarsProvider>
  );
};

export default PayslipPage;
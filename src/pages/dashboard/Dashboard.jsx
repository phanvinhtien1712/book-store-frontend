import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdIncompleteCircle } from 'react-icons/md';
import RevenueChart from './RevenueChart';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [adminRes, ordersRes] = await Promise.all([
          axios.get(`${getBaseUrl()}/api/admin`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get(`${getBaseUrl()}/api/orders`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        setData(adminRes.data);
        setOrders(ordersRes.data.orders || []);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-6 space-y-10">
      {/* THỐNG KÊ NHANH */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardItem label="Tổng số sách" value={data?.totalBooks} color="purple" />
        <CardItem
          label="Tổng doanh thu"
          value={data?.totalSales?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          color="green"
        />
        <CardItem
          label="Sách thịnh hành trong tháng"
          value={data?.trendingBooks + ' (13%)'}
          color="red"
        />
        <CardItem label="Tổng đơn hàng" value={data?.totalOrders} color="blue" icon={<MdIncompleteCircle className="text-blue-600 w-6 h-6" />} />
      </section>

      {/* BIỂU ĐỒ DOANH THU */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Biểu đồ doanh thu hàng tháng</h2>
        <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
          <RevenueChart />
        </div>
      </section>

      {/* DANH SÁCH ĐƠN HÀNG */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Tất cả đơn hàng</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">Không có đơn hàng nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Mã đơn</th>
                  <th className="px-4 py-3">Khách hàng</th>
                  <th className="px-4 py-3">Ngày đặt</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                  <th className="px-4 py-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-4 py-2 font-medium">{order._id}</td>
                    <td className="px-4 py-2">{order.name}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                    <td className="px-4 py-2 text-red-600 font-semibold">
                      {order.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </td>
                    <td className="px-4 py-2">{order.status || 'Chờ xử lý'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 pt-8 border-t">
        Được tái tạo từ <a className="text-purple-600 hover:underline" href="#">Codepen</a> sử dụng <a className="text-teal-500 hover:underline" href="https://tailwindcss.com/">Tailwind CSS</a> · Thiết kế gốc bởi <a className="text-purple-600 hover:underline" href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard">Chili Labs</a>
      </footer>
    </div>
  );
};

// Component thống kê đơn lẻ
const CardItem = ({ label, value, color = 'gray', icon }) => {
  const colorMap = {
    purple: 'text-purple-600 bg-purple-100',
    green: 'text-green-600 bg-green-100',
    red: 'text-red-600 bg-red-100',
    blue: 'text-blue-600 bg-blue-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    teal: 'text-teal-600 bg-teal-100',
    gray: 'text-gray-600 bg-gray-100',
  };
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full mr-4 ${colorMap[color]}`}>
        {icon || <span className="text-xl">📊</span>}
      </div>
      <div>
        <div className="text-lg font-bold">{value}</div>
        <div className="text-gray-500 text-sm">{label}</div>
      </div>
    </div>
  );
};

export default Dashboard;

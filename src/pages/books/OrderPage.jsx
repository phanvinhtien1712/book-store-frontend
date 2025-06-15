import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { Card, List, Typography, Spin, Alert, Tag, Descriptions } from "antd";

const { Title, Text } = Typography;

const OrderPage = () => {
  const { currentUser } = useAuth();
  const userEmail = currentUser?.email;

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(userEmail, {
    skip: !userEmail,
  });

  if (!userEmail)
    return (
      <Alert
        message="Vui lòng đăng nhập để xem đơn hàng."
        type="warning"
        showIcon
        style={{ fontSize: 20, padding: 24 }}
      />
    );
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );
  if (isError)
    return (
      <Alert
        message="Lỗi khi lấy dữ liệu đơn hàng."
        type="error"
        showIcon
        style={{ fontSize: 20, padding: 24 }}
      />
    );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Title level={1} style={{ fontSize: 36, marginBottom: 32 }}>
        Đơn hàng của bạn
      </Title>
      {orders.length === 0 ? (
        <Alert
          message="Không tìm thấy đơn hàng nào!"
          type="info"
          showIcon
          style={{ fontSize: 20, padding: 24 }}
        />
      ) : (
        <List
          grid={{ gutter: 32, column: 1 }}
          dataSource={orders}
          renderItem={(order, index) => (
            <List.Item>
              <Card
                title={
                  <span style={{ fontSize: 22 }}>
                    <Tag
                      color="blue"
                      style={{ fontSize: 18, padding: "4px 12px" }}
                    >
                      #{index + 1}
                    </Tag>
                    <span style={{ marginLeft: 12 }}>
                      Mã đơn:{" "}
                      <Text copyable style={{ fontSize: 18 }}>
                        {order._id}
                      </Text>
                    </span>
                  </span>
                }
                bordered
                style={{
                  fontSize: 20,
                  borderWidth: 2,
                  borderRadius: 16,
                  boxShadow: "0 4px 24px #0001",
                }}
                headStyle={{ fontSize: 22, background: "#f0f5ff" }}
                bodyStyle={{ fontSize: 20, padding: 32 }}
              >
                <Descriptions
                  column={1}
                  size="large"
                  bordered
                  labelStyle={{ fontSize: 18, width: 180 }}
                  contentStyle={{ fontSize: 20 }}
                >
                  <Descriptions.Item label="Họ và tên">
                    {order.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {order.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">
                    {order.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tổng tiền">
                    <Text strong type="danger" style={{ fontSize: 22 }}>
                      {order.totalPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ">
                    <span style={{ fontSize: 18 }}>
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country}, {order.address.zipcode}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Mã sản phẩm">
                    <ul style={{ margin: 0, paddingLeft: 24, fontSize: 18 }}>
                      {order.productIds.map((productId) => (
                        <li key={productId}>{productId}</li>
                      ))}
                    </ul>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default OrderPage;

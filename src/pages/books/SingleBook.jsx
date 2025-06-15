import React, { useState, useEffect, useRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import BookCard from "../books/BookCard2";
import { Link, useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  useFetchBookByIdQuery,
  useFetchAllBooksQuery,
} from "../../redux/features/books/booksApi";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Divider,
  Select,
  message,
  Tag,
  Space,
} from "antd";
const { Title, Text, Paragraph } = Typography;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Thêm import gsap
import gsap from "gsap";

const categories = [
  "Tất cả thể loại",
  "Kinh doanh",
  "Tiểu thuyết",
  "Kinh dị",
  "Phiêu lưu",
];
const priceRanges = [
  { label: "Tất cả giá", min: 0, max: Infinity },
  { label: "Dưới 50.000đ", min: 0, max: 50000 },
  { label: "50.000đ - 100.000đ", min: 50000, max: 100000 },
  { label: "100.000đ - 200.000đ", min: 100000, max: 200000 },
  { label: "Trên 200.000đ", min: 200000, max: Infinity },
];

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetchBookByIdQuery(id);
  const book = data?.book || {};

  const { data: allBooksData } = useFetchAllBooksQuery();
  const allBooks = allBooksData?.books || [];

  const [selectedCategory, setSelectedCategory] = useState("Tất cả thể loại");
  const [selectedPrice, setSelectedPrice] = useState("Tất cả giá");

  const filteredBooks = allBooks.filter((b) => {
    if (b._id === book._id) return false;
    const matchCategory =
      selectedCategory === "Tất cả thể loại"
        ? true
        : b.category &&
          b.category.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase();
    const priceObj =
      priceRanges.find((pr) => pr.label === selectedPrice) || priceRanges[0];
    const matchPrice =
      (b.newPrice || 0) >= priceObj.min && (b.newPrice || 0) < priceObj.max;
    return matchCategory && matchPrice;
  });

  const dispatch = useDispatch();

  // GSAP refs
  const detailRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    gsap.from(detailRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.from(sliderRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.out",
    });
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    message.success("Đã thêm vào giỏ hàng!");
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Lỗi khi tải thông tin sách</div>;
  if (!book || Object.keys(book).length === 0)
    return <div>Không tìm thấy sách</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div ref={detailRef}>
        <Card
          bordered
          style={{
            marginBottom: 40,
            boxShadow: "0 8px 32px #0002",
            borderRadius: 24,
            padding: 0,
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Row gutter={[0, 0]} align="middle">
            <Col
              xs={24}
              md={10}
              style={{ background: "#f9fafc", borderRadius: "24px 0 0 24px" }}
            >
              <div
                style={{
                  padding: 40,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={getImgUrl(book.coverImage)}
                  alt={book.title}
                  style={{
                    maxHeight: 420,
                    borderRadius: 16,
                    boxShadow: "0 2px 24px #0002",
                  }}
                />
              </div>
            </Col>
            <Col xs={24} md={14}>
              <div style={{ padding: 40 }}>
                <Title level={1} style={{ marginBottom: 8, fontSize: 38 }}>
                  {book.title}
                </Title>
                <Space size="large" style={{ marginBottom: 12 }}>
                  <Tag color="blue" style={{ fontSize: 18 }}>
                    {book.category}
                  </Tag>
                  <Text type="secondary">
                    Tác giả: {book.author || "Admin"}
                  </Text>
                  <Text type="secondary">
                    Ngày xuất bản:{" "}
                    {book.createdAt
                      ? new Date(book.createdAt).toLocaleDateString()
                      : ""}
                  </Text>
                </Space>
                <Paragraph style={{ fontSize: 18, margin: "16px 0" }}>
                  <Text strong>Mô tả:</Text> {book.description}
                </Paragraph>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 32,
                    marginBottom: 32,
                  }}
                >
                  <Text strong style={{ fontSize: 36, color: "#e53935" }}>
                    {book.newPrice?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                  {book.oldPrice && (
                    <Text delete style={{ fontSize: 22, color: "#888" }}>
                      {book.oldPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  )}
                  <Button
                    className="btn-primary"
                    size="large"
                    icon={<FiShoppingCart />}
                    onClick={() => handleAddToCart(book)}
                    style={{
                      fontWeight: 700,
                      fontSize: 20,
                      height: 48,
                      padding: "0 32px",
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      <div className="mt-12" ref={sliderRef}>
        <Title level={2} style={{ marginBottom: 32, fontSize: 30 }}>
          Khám phá sách khác
        </Title>
        <Row gutter={24} style={{ marginBottom: 32 }}>
          <Col xs={24} md={8}>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: "100%", fontSize: 18 }}
              size="large"
            >
              {categories.map((category, idx) => (
                <Select.Option key={idx} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Select
              value={selectedPrice}
              onChange={setSelectedPrice}
              style={{ width: "100%", fontSize: 18 }}
              size="large"
            >
              {priceRanges.map((pr, idx) => (
                <Select.Option key={idx} value={pr.label}>
                  {pr.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          modules={[Pagination, Navigation]}
          style={{ paddingBottom: 40 }}
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((b) => (
              <SwiperSlide key={b._id}>
                <Card
                  hoverable
                  style={{
                    margin: 12,
                    borderRadius: 12,
                    boxShadow: "0 2px 16px #0001",
                  }}
                  // ...existing code...
                  cover={
                    <Link to={`/books/${b._id}`}>
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: 12,
                          boxShadow: "0 2px 12px #0001",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 240,
                          padding: 12,
                        }}
                      >
                        <img
                          src={getImgUrl(b.coverImage)}
                          alt={b.title}
                          style={{
                            maxHeight: 200,
                            maxWidth: "90%",
                            objectFit: "contain",
                            background: "#fff",
                            borderRadius: 8,
                            boxShadow: "0 1px 6px #0001",
                            display: "block",
                          }}
                        />
                      </div>
                    </Link>
                  }
                >
                  <Title level={4} style={{ marginBottom: 8 }}>
                    {b.title}
                  </Title>
                  <Text
                    type="secondary"
                    style={{ display: "block", marginBottom: 8 }}
                  >
                    {b.author || "Admin"}
                  </Text>
                  <Text strong style={{ fontSize: 18, color: "#e53935" }}>
                    {b.newPrice?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                  {b.oldPrice && (
                    <Text
                      delete
                      style={{ fontSize: 14, color: "#888", marginLeft: 8 }}
                    >
                      {b.oldPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  )}
                  <div style={{ marginTop: 16 }}>
                    <Button
                      className="btn-primary"
                      icon={<FiShoppingCart />}
                      onClick={() => handleAddToCart(b)}
                      style={{ fontWeight: 600 }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </Card>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Card style={{ textAlign: "center", fontSize: 20, padding: 40 }}>
                <Text type="secondary">Không có sách nào phù hợp.</Text>
              </Card>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default SingleBook;

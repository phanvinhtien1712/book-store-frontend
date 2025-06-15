import React, { useEffect } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
  if (bookData?.book) {
    setValue('title', bookData.book.title);
    setValue('description', bookData.book.description);
    setValue('category', bookData.book.category);
    setValue('trending', bookData.book.trending);
    setValue('oldPrice', bookData.book.oldPrice);
    setValue('newPrice', bookData.book.newPrice);
    setValue('coverImage', bookData.book.coverImage);
  }
}, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire({
        title: "Cập nhật thành công",
        text: "Thông tin sách đã được cập nhật!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đã hiểu"
      });
      await refetch()
    } catch (error) {
      console.log("Không thể cập nhật sách.");
      alert("Không thể cập nhật sách.");
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Lỗi khi tải dữ liệu sách</div>

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cập nhật sách</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Tiêu đề"
          name="title"
          placeholder="Nhập tiêu đề sách"
          register={register}
        />

        <InputField
          label="Mô tả"
          name="description"
          placeholder="Nhập mô tả sách"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Thể loại"
          name="category"
          options={[
            { value: '', label: 'Chọn thể loại' },
            { value: 'business', label: 'Kinh doanh' },
            { value: 'technology', label: 'Công nghệ' },
            { value: 'fiction', label: 'Tiểu thuyết' },
            { value: 'horror', label: 'Kinh dị' },
            { value: 'adventure', label: 'Phiêu lưu' },
          ]}
          register={register}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Đang thịnh hành</span>
          </label>
        </div>

        <InputField
          label="Giá cũ"
          name="oldPrice"
          type="number"
          placeholder="Nhập giá cũ"
          register={register}
        />

        <InputField
          label="Giá mới"
          name="newPrice"
          type="number"
          placeholder="Nhập giá mới"
          register={register}
        />

        <InputField
          label="URL ảnh bìa"
          name="coverImage"
          type="text"
          placeholder="Đường dẫn ảnh bìa"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Cập nhật sách
        </button>
      </form>
    </div>
  )
}

export default UpdateBook;

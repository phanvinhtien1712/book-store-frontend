import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';

const ManageBooks = () => {
  const navigate = useNavigate();
  const { data, refetch } = useFetchAllBooksQuery();
  const books = data?.books || [];
  const [deleteBook] = useDeleteBookMutation();

  // Xử lý xóa sách
  const handleDeleteBook = async (id) => {
  try {
    await deleteBook(id).unwrap(); 
    alert('Xóa sách thành công!');
    refetch();
  } catch (error) {
    console.error('Xóa sách thất bại:', error?.message);
    alert('Không thể xóa sách. Vui lòng thử lại.');
  }
};

  // Điều hướng đến trang chỉnh sửa sách
  const handleEditClick = (id) => {
    navigate(`dashboard/edit-book/${id}`);
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Danh sách tất cả sách</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Xem tất cả
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Tên sách
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Thể loại
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Giá bán
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                  books && books.map((book, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {book.title}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {book.category}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {book.newPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                        <Link
                          to={`/dashboard/edit-book/${book._id}`}
                          className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
                        >
                          Chỉnh sửa
                        </Link>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ManageBooks;

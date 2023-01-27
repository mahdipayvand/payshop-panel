import { RiDeleteBinLine } from "react-icons/ri";
import { deleteProduct } from "store/slices/products";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const { products, auth } = useSelector((store) => store);

  return (
    <>
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-5 text-xs font-medium text-right text-gray-500 border-b border-gray-200 bg-gray-50">
                محصول
              </th>
              <th className="p-5 text-xs font-medium text-right text-gray-500 border-b border-gray-200 bg-gray-50">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="p-5 border-b border-gray-200">
                  <div className="flex items-center gap-x-3">
                    <img className="w-14 h-14" alt={product.title} src={import.meta.env.VITE_API_URL + product.image} />
                    <div className="flex flex-col justify-between gap-y-2">
                      <h2 className="text-[15px] font-medium text-gray-700 line-clamp-2 w-2/3">{product.title}</h2>
                      <p className="font-bold text-gray-700 flex items-center gap-x-1">
                        {Number(product.price).toLocaleString("fa-IR")}
                        <span className="text-xs font-normal">تومان</span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-5 border-b border-gray-200">
                  <div className="grid place-items-center">
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => dispatch(deleteProduct({ productID: product.id, token: auth.token }))}
                    >
                      <RiDeleteBinLine className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;

import { useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct } from "store/slices/products";

const Products = () => {
  const dispatch = useDispatch();
  const { products, auth } = useSelector((store) => store);
  const { register, handleSubmit, formState, reset } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    dispatch(createProduct({ ...data, token: auth.token }));
    reset();
  };

  return (
    <div className="flex flex-col gap-y-10">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 gap-3 bg-white shadow-md p-3">
        <input
          type="text"
          placeholder="نام محصول"
          {...register("title", { required: "نام محصول رو وارد نکردی" })}
          className="bg-gray-100 rounded-full h-12 placeholder:text-gray-400 px-5 col-span-3"
        />
        <input
          type="number"
          placeholder="قیمت محصول"
          {...register("price", { required: "قیمت محصول رو وارد نکردی" })}
          className="bg-gray-100 rounded-full h-12 placeholder:text-gray-400 px-5"
        />
        <input
          type="number"
          {...register("discount")}
          placeholder="تخفیف محصول"
          className="bg-gray-100 rounded-full h-12 placeholder:text-gray-400 px-5"
        />
        <textarea
          placeholder="توضیحات محصول"
          {...register("description")}
          className="bg-gray-100 rounded-2xl h-12 placeholder:text-gray-400 px-5 col-span-full py-4 min-h-[150px]"
        />
        <input
          id="image"
          type="file"
          accept="image/*"
          {...register("image", { required: "عکس محصول رو انتخاب نکردی" })}
          className="bg-gray-100 rounded-full h-12 placeholder:text-gray-400 px-5 sr-only"
        />
        <label
          htmlFor="image"
          className="h-12 rounded-full border border-gray-200 grid place-items-center cursor-pointer"
        >
          انتخاب عکس محصول
        </label>
        <button className="bg-violet-500 text-white h-12 rounded-full hover:bg-violet-600">ایجاد محصول</button>
        {formState?.errors?.title && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.title?.message}</p>
        )}
        {formState?.errors?.price && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.price?.message}</p>
        )}
        {formState?.errors?.description && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.description?.message}</p>
        )}
        {formState?.errors?.image && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.image?.message}</p>
        )}
      </form>
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
    </div>
  );
};

export default Products;

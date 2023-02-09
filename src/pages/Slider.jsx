import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createSlide, deleteSlide } from "store/slices/slides";

const Products = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);
  const { slides, auth } = useSelector((store) => store);
  const { register, handleSubmit, formState, reset } = useForm({ mode: "onChange" });

  const onChange = (event) => setPreview(URL.createObjectURL(event.target.files[0]));

  const onSubmit = (data) => {
    dispatch(createSlide({ ...data, token: auth.token }));
    setPreview(null);
    reset();
  };

  return (
    <div className="flex flex-col gap-y-10">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-3 bg-white shadow-md p-3">
        <div className="col-span-full h-36 rounded-2xl border border-dashed border-gray-300 hover:border-violet-500 relative overflow-hidden group">
          {preview && (
            <img
              src={preview}
              className="absolute top-2 left-2 bottom-2 right-2 h-[calc(theme(height.full)_-_theme(height.4))] w-[calc(theme(width.full)_-_theme(width.4))] object-cover rounded-2xl blur-sm opacity-80"
            />
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={onChange}
            className="sr-only"
            {...register("image", { required: "عکس اسلاید رو انتخاب نکردی", onChange })}
          />
          <label
            htmlFor="image"
            className="h-full w-full grid place-items-center cursor-pointer hover:text-violet-500 z-10 relative"
          >
            <span
              className={
                preview && `bg-white py-2 px-4 rounded-full shadow group-hover:bg-violet-500 group-hover:text-white`
              }
            >
              انتخاب عکس اسلاید
            </span>
          </label>
        </div>
        <button className="bg-violet-500 text-white h-12 rounded-full hover:bg-violet-600">ایجاد اسلاید</button>
        {formState?.errors?.image && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.image?.message}</p>
        )}
      </form>
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-5 text-xs font-medium text-right text-gray-500 border-b border-gray-200 bg-gray-50">
                اسلاید
              </th>
              <th className="p-5 text-xs font-medium text-right text-gray-500 border-b border-gray-200 bg-gray-50">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {slides.map((slide) => (
              <tr key={slide.id}>
                <td className="p-5 border-b border-gray-200">
                  <div className="flex items-center gap-x-3">
                    <img
                      className="min-w-14 min-h-14 max-h-32 aspect-video"
                      alt={slide.title}
                      src={import.meta.env.VITE_API_URL + slide.image}
                    />
                  </div>
                </td>
                <td className="p-5 border-b border-gray-200">
                  <div className="grid place-items-center">
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => dispatch(deleteSlide({ slideID: slide.id, token: auth.token }))}
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

import { useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser } from "store/slices/users";

const Users = () => {
  const dispatch = useDispatch();
  const { users, auth } = useSelector((store) => store);
  const { register, handleSubmit, formState, reset } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    dispatch(createUser({ ...data, token: auth.token }));
    reset();
  };

  return (
    <div className="flex flex-col gap-y-10">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-3 bg-white shadow-md p-3">
        <input
          type="text"
          placeholder="نام"
          {...register("firstName", { required: "نام رو وارد نکردی" })}
          className="bg-gray-100 rounded-full h-12 placeholder:text-gray-400 px-5"
        />
        <input
          type="text"
          placeholder="نام خانوادگی"
          {...register("lastName", { required: "نام خانوادگی رو وارد نکردی" })}
          className="bg-gray-100 rounded-full h-12 placeholder:text-gray-400 px-5"
        />
        <input
          type="text"
          placeholder="ایمیل"
          className="bg-gray-100 rounded-full h-12 placeholder:text-gray-400 px-5"
          {...register("email", {
            required: "ایمیل رو وارد نکردی",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "ایمیلت رو درست وارد نکردی",
            },
          })}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          {...register("password", { required: "رمز عبور رو وارد نکردی" })}
          className="bg-gray-100 rounded-full h-12 placeholder:text-gray-400 px-5"
        />
        <button className="bg-violet-500 text-white h-12 rounded-full hover:bg-violet-600">ایجاد کاربر</button>
        {formState?.errors?.firstName && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.firstName?.message}</p>
        )}
        {formState?.errors?.lastName && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.lastName?.message}</p>
        )}
        {formState?.errors?.email && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.email?.message}</p>
        )}
        {formState?.errors?.password && (
          <p className="text-red-500 text-xs col-span-full">{formState?.errors?.password?.message}</p>
        )}
      </form>
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-5 text-xs font-medium text-right text-gray-500 border-b border-gray-200 bg-gray-50">
                نام
              </th>
              <th className="p-5 text-xs font-medium text-right text-gray-500 border-b border-gray-200 bg-gray-50">
                ایمیل
              </th>
              <th className="p-5 text-xs font-medium text-right text-gray-500 border-b border-gray-200 bg-gray-50">
                نقش
              </th>
              <th className="p-5 text-xs font-medium text-right text-gray-500 border-b border-gray-200 bg-gray-50">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-5 border-b border-gray-200">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-5 border-b border-gray-200 font-mono tracking-wide">{user.email}</td>
                <td className="p-5 border-b border-gray-200">{user.isAdmin ? "مدیر" : "کاربر"}</td>
                <td className="p-5 border-b border-gray-200">
                  <div className="grid place-items-center">
                    <button
                      disabled={user.id === auth.user.id}
                      onClick={() => dispatch(deleteUser({ userID: user.id, token: auth.token }))}
                      className="text-red-500 hover:text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed"
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

export default Users;

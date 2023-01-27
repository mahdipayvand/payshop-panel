import { deleteUser } from "store/slices/users";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const dispatch = useDispatch();
  const { users, auth } = useSelector((store) => store);

  return (
    <>
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
    </>
  );
};

export default Users;

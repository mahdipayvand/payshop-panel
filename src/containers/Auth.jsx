import { useEffect } from "react";
import { setToken } from "store/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const _token = searchParams.get("token");
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    if (!_token) return;

    dispatch(setToken(_token));
  }, []);

  useEffect(() => {
    if (_token || token) return;

    navigate("/access-denied");
  }, [token]);

  return <>{children}</>;
};

export default Auth;

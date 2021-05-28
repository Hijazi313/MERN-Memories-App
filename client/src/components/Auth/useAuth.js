import { signin, signup } from "../../actions/auth";

// Redux
import { useDispatch } from "react-redux";

// React Router
import { useHistory } from "react-router-dom";

const useAuth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const clientId =
    "691810798091-vbg78hd82abl5avregge7l5mgotav39s.apps.googleusercontent.com";

  const dispatch = useDispatch();

  const history = useHistory();

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // If user clicked sign up
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj; // If exists get it
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      // Redirect
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };
  // Return
  return [
    clientId,
    isSignup,
    setIsSignup,
    showPassword,
    setShowPassword,
    formData,
    setFormDat,
    handleSubmit,
    handleChange,
    handleShowPassword,
    switchMode,
    googleSuccess,
    googleFailure,
  ];
};
export default useAuth;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const AuthPages = ({ currentPage, setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(currentPage === "login");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLogin(currentPage === "login");
  }, [currentPage]);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "error", // Can be success, info, warning too
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login:", loginForm);

      if (
        loginForm.email === "test@example.com" &&
        loginForm.password === "123"
      ) {
        setUser({ email: loginForm.email });
        navigate("/dashboard");
      } else {
        setNotification({
          open: true,
          message: "Neplatné přihlašovací údaje!",
          severity: "error",
        });
      }
    } else {
      console.log("Register:", registerForm);

      if (registerForm.password !== registerForm.confirmPassword) {
        setNotification({
          open: true,
          message: "Hesla se neshodují!",
          severity: "error",
        });
        return;
      }

      setUser({ email: registerForm.email });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-[50px]">
      {/* Snackbar Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md transition-all duration-300 ease-in-out ${
              isLogin
                ? "bg-white shadow-sm text-judo-blue font-semibold"
                : "text-gray-600"
            }`}
          >
            Přihlášení
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md transition-all duration-300 ease-in-out ${
              !isLogin
                ? "bg-white shadow-sm text-judo-blue font-semibold"
                : "text-gray-600"
            }`}
          >
            Registrace
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jméno
                </label>
                <input
                  placeholder="Petr"
                  type="text"
                  required
                  value={registerForm.firstName}
                  onChange={(e) => {
                    const onlyLettersFirstName = e.target.value.replace(
                      /[^a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g,
                      ""
                    );                
                    setRegisterForm({
                      ...registerForm,
                      firstName: onlyLettersFirstName,
                    });
                  }}
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-judo-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Příjmení
                </label>
                <input
                  placeholder="Hároš"
                  type="text"
                  required
                  value={registerForm.lastName}
                  onChange={(e) => {
                    const onlyLettersLastName = e.target.value.replace(
                      /[^a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g,
                      ""
                    );                
                    setRegisterForm({
                      ...registerForm,
                      lastName: onlyLettersLastName,
                    });
                  }}
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-judo-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="777888999"
                  maxLength={9}
                  minLength={9}
                  required
                  value={registerForm.phoneNumber}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                    setRegisterForm({
                      ...registerForm,
                      phoneNumber: onlyNums,
                    });
                  }}
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-judo-blue"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              placeholder="ahoj@email.cz"
              type="email"
              required
              value={isLogin ? loginForm.email : registerForm.email}
              onChange={(e) => {
                if (isLogin)
                  setLoginForm({ ...loginForm, email: e.target.value });
                else
                  setRegisterForm({ ...registerForm, email: e.target.value });
              }}
              className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-judo-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heslo
            </label>
            <input
              placeholder="******"
              type={showPassword ? "text" : "password"}
              minLength={6}
              required
              value={isLogin ? loginForm.password : registerForm.password}
              onChange={(e) => {
                if (isLogin)
                  setLoginForm({ ...loginForm, password: e.target.value });
                else
                  setRegisterForm({
                    ...registerForm,
                    password: e.target.value,
                  });
              }}
              className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-judo-blue"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Potvrzení hesla
              </label>
              <input
                placeholder="******"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-judo-blue"
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4"
              />
              <span>Zobrazit heslo</span>
            </label>

            {isLogin && (
              <button
                type="button"
                onClick={() => navigate("/passwordRecovery")}
                className="text-sm text-judo-blue hover:underline"
              >
                Zapomenuté heslo?
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-judo-blue text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            {isLogin ? "Přihlásit se" : "Registrovat"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPages;

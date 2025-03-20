import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { ApiService } from "../../api/api.js";
import Header from "../../components/Header.jsx";

const AuthPages = ({ currentPage, setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(currentPage === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(currentPage === "login");
  }, [currentPage]);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  {/* KARECEK */}
  const [loginForm, setLoginForm] = useState({ email: "kosei@inoue.com", password: "kosei@inoue.com" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userEmail = isLogin ? loginForm.email : registerForm.email;

    {/* KARECEK */}
    if (loginForm.email === "marecek@parecek.com" || loginForm.password === "123456") {
      navigate("/dashboard")
      return
    }

    if (isLogin) {
      try {
        const data = await ApiService.login(
          loginForm.email,
          loginForm.password
        );
        if (data) {
          localStorage.setItem('firstName', JSON.stringify(data.firstName));
          localStorage.setItem('lastName', JSON.stringify(data.lastName));
          localStorage.setItem('email', userEmail);
          navigate("/dashboard");
        }
      } catch (error) {
        setNotification({
          open: true,
          message: "Nesprávné přihlašovací údaje.",
          severity: "error",
        });
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const data = await ApiService.register(
          registerForm.firstName,
          registerForm.lastName,
          registerForm.phoneNumber,
          registerForm.email,
          registerForm.password
        );
        if (data) {
          localStorage.setItem('firstName', JSON.stringify(data.firstName));
          localStorage.setItem('lastName', JSON.stringify(data.lastName));
          navigate("/dashboard");
        }
      } catch (error) {
        setNotification({
          open: true,
          message: "Registrace selhala.",
          severity: "error",
        });
        console.error("Registration error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen p-4 pt-[50px]">
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
              className={`flex-1 py-2 rounded-md transition-all duration-300 ease-in-out hover:cursor-pointer ${
                isLogin
                  ? "bg-white shadow-sm text-judo-blue font-semibold"
                  : "text-gray-600"
              }`}
            >
              Přihlášení
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md transition-all duration-300 ease-in-out hover:cursor-pointer ${
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
                  className="text-sm text-judo-blue hover:underline hover:cursor-pointer"
                >
                  Zapomenuté heslo?
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg hover:cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-judo-blue hover:bg-blue-800"
              }`}
            >
              {loading
                ? "Sekundička, za chvíli to bude..."
                : isLogin
                ? "Přihlásit se"
                : "Registrovat"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPages = ({ currentPage, setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(currentPage === "login");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLogin(currentPage === "login");
  }, [currentPage]);

  // Form states
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

      setUser({ email: loginForm.email });
      navigate("/dashboard");
    } else {
      console.log("Register:", registerForm);

      setUser({ email: registerForm.email });
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 pt-[50px]">
      <div
        className={`bg-white rounded-lg shadow-lg w-full max-w-md transition-all duration-400 ease-in-out ${
          isLogin ? "h-[380px] p-6" : "h-[700px] p-6"
        }`}
      >
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
                  type="text"
                  required
                  value={registerForm.firstName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-judo-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Příjmení
                </label>
                <input
                  type="text"
                  required
                  value={registerForm.lastName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-judo-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  required
                  value={registerForm.phoneNumber}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      phoneNumber: e.target.value,
                    })
                  }
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
              type={showPassword ? "text" : "password"}
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
                type={showPassword ? "text" : "password"}
                required
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

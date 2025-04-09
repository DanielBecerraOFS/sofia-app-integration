// EnterpriseLogin.tsx (componente principal refactorizado)
import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { SocialLoginButtons } from "../components/SocialLoginButtons";
import { FormToggle } from "../components/FormToggle";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formHeight, setFormHeight] = useState("auto");
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation(); // Gets the current location
  

  // Usar el hook de autenticación
  const { isLoading, error, handleLogin, handleRegister, handleClearError } =
    useAuth();
  //const { toast } = useToast()

  useEffect(() => {
    if (location.state && typeof location.state.isLogin === "boolean") {
      setIsLogin(location.state.isLogin);
    }
  }, [location.state]);

  // Handle form height adjustment for smooth transitions
  useEffect(() => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    if (loginForm && signupForm) {
      const height = isLogin ? loginForm.offsetHeight : signupForm.offsetHeight;
      setFormHeight(`${height}px`);
    }
  }, [isLogin, email, password, fullName, confirmPassword]);

  // Mostrar errores de autenticación cuando ocurran
  useEffect(() => {
    if (error) {
      /*toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })*/
      // Limpiamos el error después de mostrarlo
      handleClearError();
    }
  }, [error, handleClearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Manejar inicio de sesión
        await handleLogin({
          username: email,
          password,
        });
        
      } else {
        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
          /*toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            variant: "destructive",
          })*/
          return;
        }

        // Manejar registro
        await handleRegister({
          fullName,
          email,
          password,
        });
      }
    } catch (err) {
      // Los errores ya son manejados por el middleware de Redux y nuestro useEffect
      console.error("Error en la autenticación:", err);
    }
  };

  const toggleForm = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      // Reset form fields when toggling
      setEmail("");
      setPassword("");
      if (isLogin) {
        setFullName("");
        setConfirmPassword("");
      } else {
        setRememberMe(false);
      }
      setTimeout(() => setIsAnimating(false), 600);
    }, 300);
  };

  return (
    <>
    
    <div className="absolute top-0 left-0 w-full h-auto py-6 px-8">
      <div className="min-h-screen flex items-center justify-center ">
        <Card className="w-full max-w-md overflow-hidden border-1 border-primary rounded-md shadow-xl bg-primary/5 relative">

          <CardHeader className="space-y-6 text-center relative z-10 pb-2">
            <div className="mx-auto w-28 h-28 relative mb-2">
              <img
                src="src/assets/images/logos/ofi-light.png"
                alt="Company Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-4xl font-bold bg-clip-text text-on-primary font-title">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {isLogin
                  ? "Sign in to your account to continue"
                  : "Register a new account to get started"}
              </CardDescription>
            </div>

            {/* Form toggle tabs */}
            <FormToggle
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              isAnimating={isAnimating}
            />
          </CardHeader>

          <CardContent className="px-6 pt-4 pb-2">
            <div
              className="relative overflow-hidden transition-all duration-500 ease-in-out"
              style={{ height: formHeight }}
            >
              {/* Login Form */}
              <div
                id="login-form"
                className={cn(
                  "transition-all duration-500 ease-in-out transform absolute w-full",
                  isLogin
                    ? "translate-x-0 opacity-100 relative"
                    : "-translate-x-full opacity-0"
                )}
              >
                <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                  handleSubmit={handleSubmit}
                  disabled={!isLogin || isAnimating || isLoading}
                />
              </div>

              {/* Signup Form */}
              <div
                id="signup-form"
                className={cn(
                  "transition-all duration-500 ease-in-out transform absolute w-full",
                  !isLogin
                    ? "translate-x-0 opacity-100 relative"
                    : "translate-x-full opacity-0"
                )}
              >
                <SignupForm
                  name={fullName}
                  setName={setFullName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  handleSubmit={handleSubmit}
                  disabled={isLogin || isAnimating || isLoading}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 px-6 pt-2 pb-6">
            <SocialLoginButtons />

            <Button
              variant="link"
              onClick={toggleForm}
              className="w-full text-primary hover:text-gray-300 transition-colors mt-2 group"
              disabled={isAnimating || isLoading}
            >
              <span>
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </span>
              <ArrowRight className="ml-1 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </>
  );
}

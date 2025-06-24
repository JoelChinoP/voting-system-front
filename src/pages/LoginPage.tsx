import Login from "@/components/login"

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Iniciar sesión</h2>
        <Login />
      </div>
    </div>
  )
}

export default LoginPage;
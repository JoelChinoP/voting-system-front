import { AuthProvider } from "@/context"
import { AppRoutes } from "@/routes"

function App() {

  /* return (
    <div className="text-3xl font-bold underline">
        Hola Mundo
    </div>
  ) */

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App

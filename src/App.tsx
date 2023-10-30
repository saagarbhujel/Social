import { Routes, Route} from "react-router-dom";
import "./globals.css";
import SignUpForms from "./_auth/forms/SignUpForms";
import SignInForms from "./_auth/forms/SignInForms";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import { Toaster } from "./components/ui/toaster";


function App() {
  return (
    <main className="flex h-screen">
     
      <Routes>
        {/* Public Route */}
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInForms />} />
          <Route path="sign-up" element={<SignUpForms/>} />
        </Route>

        {/* Private Route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster/>
    </main>
  );
}

export default App;

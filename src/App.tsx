import { Routes, Route} from "react-router-dom";
import "./globals.css";
import SignUpForms from "./_auth/forms/SignUpForms";
import SignInForms from "./_auth/forms/SignInForms";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { AllUser, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from "./_root/pages";
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
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-user" element={<AllUser/>} />
          <Route path="/saved" element={<Saved/>} />
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/profile/:id/*" element={<Profile/>} />
          <Route path="/update-profile/:id" element={<UpdateProfile/>} />
          <Route path="/update-post/:id" element={<EditPost/>} />
          <Route path="/posts/:id" element={<PostDetails/>} />
        </Route>
      </Routes>
      <Toaster/>
    </main>
  );
}

export default App;

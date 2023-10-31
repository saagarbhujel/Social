import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link} from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast"
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations";


const SignInForms = () => {
  const {toast} = useToast()
  const navigate = useNavigate()
  const {checkAuthUser, isLoading:isUserLoading} = useUserContext()

  //Query
  const {mutateAsync: signInAccount, isPending: isSigningInUser} = useSignInAccount()

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },

  })

  const handleSignin = async (user: z.infer<typeof SignInValidation>) => {
    const session = await signInAccount(user)
    if(!session) {
      toast({
        title: "Signin Failed. Please try again.",
      })
      return
    }
    const isLoggedIn = await checkAuthUser()
    if(isLoggedIn){
      form.reset()
      navigate('/')
    } else {
      toast({
        title: "Signin Failed. Please try again.",
      })
      return
    }
  }
  

  return (
    <>
      <Form {...form}>
        <div className=" sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Login to your account.
          </h2>
          <p className="text-light-3 small-medium md:base-regular">
            Welcome back! Please login to your account.
          </p>

          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">{
              ( isSigningInUser || isUserLoading) ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : "SignIn"
            }</Button>
            <p className=" text-small-regular text-light-2 text-center mt-2">
              Didn&apos;t have an account?
              <Link to='/sign-up' className="text-primary-500 text-small-semibold ml-1">SignUp</Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignInForms;

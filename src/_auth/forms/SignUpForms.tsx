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
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";


const SignUpForms = () => {
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
  const navigate = useNavigate()

  // Mutation
  const {mutateAsync: createNewUser, isPending: isUserCreating} = useCreateUserAccount()
  const {mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount()
  
  const {toast} = useToast()

 
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
 async function onSubmit(user: z.infer<typeof SignUpValidation>) {
  try{
    const newUser = await createNewUser(user)

    if(!newUser) {
      return toast({
        title: "Signup Failed. Please try again.",
      })
    }

    const session = await signInAccount({ email: user.email, password: user.password });
    if(!session){
      toast({title: "Signin Failed. Please try again."})
      navigate('/sign-in')

      return 
    }

    const isLoddedIn = await checkAuthUser()

    if(isLoddedIn){
      form.reset()

      navigate('/');
    } else {
      toast({title: 'Signin Failed. Please try again.'})
      return;
    }
  } catch (error) {
      console.log(error);
      
    }
    
  }
  

  return (
    <>
      <Form {...form}>
        <div className=" sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.png" className="invert-white" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Create a new account.
          </h2>
          <p className="text-light-3 small-medium md:base-regular">
            To use Social, please enter your details.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              (isUserCreating || isSigningInUser || isUserLoading) ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : "Sign Up"
            }</Button>
            <p className=" text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">Sign In</Link>
            </p>
          </form>
        </div>
      </Form>
    </>
  );
};

export default SignUpForms;

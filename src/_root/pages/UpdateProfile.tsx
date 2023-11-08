import Loader from "@/components/shared/Loader";
import ProfileUploader from "@/components/shared/ProfileUploader";
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
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { ProfileValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const UpdateProfile = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  if (!currentUser) {
    return (
      <div className="h-full w-full flex-center">
        <Loader />
      </div>
    );
  }

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    console.log(values);
    console.log("clicked");

    const updateUserInfo = await updateUser({
      userId: currentUser.$id,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });
    if (!updateUserInfo) {
      toast({
        title: " Update user failed. Try Again!",
      });
    }

    setUser({
      ...user,
      name: updateUserInfo?.name,
      bio: updateUserInfo?.bio,
      imageUrl: updateUserInfo?.imageUrl,
    });
    return navigate(`/profile/${id}`);
    console.log("updated");
  };
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-2 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            className="invert-white"
            alt="edit"
          />
          <h2 className=" h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-9 w-full max-w-5xl"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser.imageUrl}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 justify-exd items-center">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isLoadingUpdate}
              >
                {isLoadingUpdate && <Loader />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;

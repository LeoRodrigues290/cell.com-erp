import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/firebase/config";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

const AuthLogin = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login realizado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      toast.error("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
                id="email"
                type="email"
                sizing="md"
                required
                className="form-control form-rounded-xl"
                {...register("email")}
            />
            {formState.errors.email && (
                <p className="text-red-500 text-sm">{formState.errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
                id="password"
                type="password"
                sizing="md"
                required
                className="form-control form-rounded-xl"
                {...register("password")}
            />
            {formState.errors.password && (
                <p className="text-red-500 text-sm">{formState.errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-between my-5">
            <div className="flex items-center gap-2">
              <Checkbox id="accept" className="checkbox" />
              <Label
                  htmlFor="accept"
                  className="opacity-90 font-normal cursor-pointer"
              >
                Remember this Device
              </Label>
            </div>
            <Link to="/" className="text-primary text-sm font-medium">
              Forgot Password?
            </Link>
          </div>

          <Button
              type="submit"
              color="primary"
              className="w-full bg-primary text-white rounded-xl"
              disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Entrando..." : "Sign in"}
          </Button>
        </form>
      </>
  );
};

export default AuthLogin;

import { Link, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { API_URL } from '../../constants/globals';
import { VALIDATION_INVALID_FORMAT_MSG, VALIDATION_MIN_LENGTH_MSG, VALIDATION_MISMATCH_PASSWORDS, VALIDATION_REQUIRED_FIELD_MSG } from '../../constants/formValidation';
import { SERVER_ERROR_MSG, type PhoenixError } from '../../constants/errors';

const signupSchema = z.object({
  name: z.string().min(1, { message: VALIDATION_REQUIRED_FIELD_MSG }),
  email: z.email({ message: VALIDATION_INVALID_FORMAT_MSG('email') }),
  password: z.string().min(8, { message: VALIDATION_MIN_LENGTH_MSG('password', 8) }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION_MISMATCH_PASSWORDS,
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      const payload = {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      };

      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Account created successfully!');
        navigate('/');
      } else if (response.status === 422) {
        const errorData: { errors: PhoenixError } = await response.json();
        Object.entries(errorData.errors).forEach(([field, messages]) => {
          const formField = field as keyof SignupFormValues;
          setError(formField, {
            type: 'server',
            message: messages.join(', '),
          });
        });
      } else {
        toast.error(SERVER_ERROR_MSG);
      }
    } catch (error) {
      toast.error(`Unexpected error: ${error}`);
    }
  };

  return (
    <div className="p-8 shadow-md rounded-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                type="email"
                {...field}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
              />
            )}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
              />
            )}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-6 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
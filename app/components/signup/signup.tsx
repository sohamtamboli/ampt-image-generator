'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '@/app/UserPool';
import { useRouter } from 'next/navigation';

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}
export default function SignupForm() {
  const [otp, setOtp] = useState('');
  const [registered, setregistered] = useState(false);
  const [otperror, setotperror] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setErrors(['Passwords do not match!!!']);
    } else {
      setErrors([]);
      event.preventDefault();
      const attributeList: CognitoUserAttribute[] = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: formState.email,
        }),
        new CognitoUserAttribute({
          Name: 'name',
          Value: formState.username,
        }),
      ];

      UserPool.signUp(
        formState.email,
        formState.password,
        attributeList,
        [],

        (err, data) => {
          if (err) {
            console.log(err);
          }
          console.log(data);
          //user registerd succesfully
          setregistered(true);
        },
      );
    }
  };
  const handleOtpSubmit = (event: FormEvent) => {
    event.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: formState.email,
      Pool: UserPool,
    });

    cognitoUser.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        console.log(err);
        setotperror('invalid otp');
        // Handle error
      } else {
        console.log(result);
        // OTP verification successful, proceed with further actions
        router.push('/home');
      }
    });
  };

  const handleResendOtp = () => {
    const cognitoUser = new CognitoUser({
      Username: formState.email,
      Pool: UserPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });
  };
  return (
    <>
      {!registered && (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to an account
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mb-2 mt-5 flex justify-center">
              <Image
                src="/images/profile.svg"
                width={100}
                height={100}
                alt="Picture of the user"
              />
            </div>
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="enter your email adress"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="enter your username"
                    required
                    value={formState.username}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="enter your password"
                    autoComplete="current-password"
                    required
                    value={formState.password}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="re-enter your password"
                    value={formState.confirmPassword}
                    onChange={handleInputChange}
                    className="mt-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {errors.length > 0 && (
                <div
                  className=" rounded-lg bg-red-50 p-2  text-sm text-red-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">{errors[0]}</span>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Alerady a member?{' '}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      )}
      {registered && (
        // the otp from if the user is registred successfullly
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              enter the otp recived at your {formState.email}
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleOtpSubmit}
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    enter recived otp
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="enter otp "
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {otperror && <span className="text-red-500">{otperror}</span>}
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="mb-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Resend OTP
                </button>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

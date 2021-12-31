import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { Link, redirect, useActionData } from 'remix';
import { commitSession, getSession } from '~/utils/session.server';
import RegisterAlert from '../components/register_alert';
import { supabaseClient } from '../utils/db.server';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export let action = async ({ request }: { request: any }) => {
    // get user credentials from form
    let form = await request.formData();
    let email = form.get("email");
    let password = form.get("password");
    let confirm_password = form.get("confirm_password");
    let agreed = form.get("agreed");

    let fields = {
        email: email,
        password: password,
    }
    // validate password confirmation
    if (password !== confirm_password) {

        return {
            fields,
            error: {
                message: "Passwords do not match"
            }
        }
    }
    // validate user must agree to terms and conditions
    if (!agreed) {

        return {
            fields,
            error: {
                message: "You must agree to the terms and conditions"
            }
        }
    }

    // signup using the credentials
    const { user, error, session } = await supabaseClient.auth.signUp({
        email,
        password,
    });

    // if i have a user then create the cookie with the
    // auth_token, not sure if i want to use the auth token,
    // but it works... will do more research
    if (user) {
        // get session and set access_token
        let mysession = await getSession(request.headers.get("Cookie"));
        mysession.set("access_token", session?.access_token);

        // redirect to page with the cookie set in header
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(mysession),
            },
        });
    }

    // else return the error
    return { fields, error };
};
function Register() {
    const actionData = useActionData();


    const [agreed, setAgreed] = useState(false)

    return (
        <div className="px-4 overflow-hidden bg-white sm:px-6 lg:px-8 ">
            <div className="relative max-w-xl mx-auto">
                <svg
                    className="absolute transform translate-x-1/2 left-full"
                    width={404}
                    height={404}
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="85737c0e-0916-41d7-917f-596dc7edfa27"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>
                <svg
                    className="absolute bottom-0 transform -translate-x-1/2 right-full"
                    width={404}
                    height={404}
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="85737c0e-0916-41d7-917f-596dc7edfa27"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
                </svg>

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Register Account</h2>
                    <p className="mt-4 text-lg leading-6 text-gray-500">Create new account to start building and deploying sites for free!</p>
                </div>
                <RegisterAlert actionData={actionData}></RegisterAlert>
                <div className="mt-12">
                    <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    defaultValue={actionData?.fields?.email}
                                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="juandelacruz@gmail.com"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    defaultValue={actionData?.fields?.password}
                                    required
                                    minLength={6}
                                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    minLength={6}
                                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Switch
                                        checked={agreed}
                                        onChange={() => setAgreed(!agreed)}
                                        className={classNames(
                                            agreed ? 'bg-indigo-600' : 'bg-gray-200',
                                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        )}
                                    >
                                        <span className="sr-only">Agree to policies</span>
                                        <input
                                            id="agreed"
                                            name="agreed"
                                            type="checkbox"
                                            defaultChecked={agreed}
                                            aria-hidden="true"
                                            className={classNames(
                                                agreed ? 'translate-x-5' : 'translate-x-0',
                                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                            )}
                                        />
                                    </Switch>
                                </div>
                                <div className="ml-3">
                                    <p className="text-base text-gray-500">
                                        By selecting this, you agree to the{' '}
                                        <Link to="/terms-and-condition" className="font-medium text-gray-700 underline">
                                            Terms and Condition
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register

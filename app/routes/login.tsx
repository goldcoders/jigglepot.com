import {
    Form, json, redirect, useActionData
} from "remix";
import LoginAlert from '../components/login_alert';
import { supabaseClient } from "../utils/db.server";
import { commitSession, getSession } from '../utils/session.server';

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader = () => {
    let data = {};

    // https://remix.run/api/remix#json
    return json(data);
};

/**
 *
 * @param {*} param0
 * @returns
 */
export let action = async ({ request }: { request: any }) => {
    // get user credentials from form
    let form = await request.formData();
    let email = form.get("email");
    let password = form.get("password");

    // login using the credentials
    const { user, error, session } = await supabaseClient.auth.signIn({
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
    return { user, error };
};

// https://remix.run/api/conventions#meta
export let meta = () => {
    return {
        title: "Login Page",
        description: "Login to your Account",
    };
};

// https://remix.run/guides/routing#index-routes
function Login() {
    const actionData = useActionData();
    return (
        <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="w-auto h-12 mx-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <Form method="post" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    minLength={6}
                                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </Form>
                    <LoginAlert actionData={actionData}></LoginAlert>
                </div>
            </div>
        </div>
    )
}

export default Login

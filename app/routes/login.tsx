import {
    ActionFunction,
    Form, json, redirect, useActionData
} from "remix";
import LoginAlert, { ActionData } from '../components/login_alert';
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

function validateEmail(email: unknown) {
    // add regex validation for email here
    if (typeof email !== "string" || !(email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/))) {
        return `Please Enter Valid Email`
    }
}

function validatePassword(password: unknown) {

    if (typeof password !== "string" || !(password.match(/(?=.{10,})/))) {
        return `Password should be at least 10 characters`;

    }
    if (typeof password !== "string" || !(password.match(/(?=.*[A-Z])/))) {
        return `Password should have at least one uppercase letter`;

    }
    if (typeof password !== "string" || !(password.match(/(?=.*[a-z])/))) {
        return `Password should have at least one lowercase letter`;

    }
    if (typeof password !== "string" || !(password.match(/(?=.*[0-9])/))) {
        return `Password should have at least one number`;

    }
    if (typeof password !== "string" || !(password.match(/([^A-Za-z0-9])/))) {
        return `Password should have at least one special character`;
    }
}



export let action: ActionFunction = async ({
    request,
}): Promise<Response | ActionData> => {
    // get user credentials from form
    let { email, password } = Object.fromEntries(await request.formData())

    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return { formError: `Form Input was submitted with Invalid Types` };
    }
    let fields = { email, password };

    // validate fields
    let fieldErrors = {
        email: validateEmail(email),
        password: validatePassword(password),
    };

    // Return All Field Errors
    if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

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
    } else {
        return { fields, formError: `Failed to Log you in with these credentials.` }
    }

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
    const actionData = useActionData<ActionData | undefined>();

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
                    <Form method="post" className="space-y-6" aria-describedby={actionData?.formError ? "form-error-message" : undefined}>
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
                                    placeholder="you@example.com"
                                    required
                                    defaultValue={actionData?.fields?.email}
                                    aria-invalid={Boolean(actionData?.fieldErrors?.email)}
                                    aria-describedby={actionData?.fieldErrors?.email ? "email-error" : undefined}
                                    className={actionData?.fieldErrors?.email ?
                                        "block w-full px-3 py-2 text-red-900 placeholder-red-300 border-red-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                        : "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    }
                                />
                                {actionData?.fieldErrors?.email ? (
                                    <p
                                        className="block mt-1 text-sm text-red-500"
                                        id="email-error"
                                    >

                                        {actionData.fieldErrors.email}
                                    </p>
                                ) : null}
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
                                    defaultValue={actionData?.fields?.password}
                                    required
                                    minLength={10}
                                    aria-invalid={Boolean(actionData?.fieldErrors?.password)}
                                    aria-describedby={actionData?.fieldErrors?.password ? "password-error" : undefined}
                                    className={actionData?.fieldErrors?.password ?
                                        "block w-full px-3 py-2 text-red-900 placeholder-red-300 border-red-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                        : "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    }
                                />
                                {actionData?.fieldErrors?.password ? (
                                    <p
                                        className="block mt-1 text-sm text-red-500"
                                        role="alert"
                                        id="password-error"
                                    >
                                        {actionData.fieldErrors.password}
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
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

import { ExclamationIcon } from "@heroicons/react/outline";

export type ActionData = {
    formError?: string;
    fieldErrors?: { email: string | undefined; password: string | undefined; };
    fields?: { email: string; password: string; };
};

function LoginAlert({ actionData }: { actionData: ActionData | undefined }) {

    if (actionData?.formError) {
        return (
            <div className="p-4 mt-5 border-l-4 border-red-400 bg-red-50" id="form-error-message" role="alert">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">
                            {actionData?.formError}
                        </p>
                    </div>
                </div>
            </div>
        )

    } else {
        return (<></>)
    }

}

export default LoginAlert

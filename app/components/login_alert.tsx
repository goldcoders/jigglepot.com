import { ExclamationIcon } from "@heroicons/react/outline";

function LoginAlert({ actionData }: { actionData: any }) {

    if (actionData?.error) {
        return (
            <div className="p-4 mt-5 border-l-4 border-red-400 bg-red-50">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">
                            {actionData?.error ? actionData?.error?.message : null}
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

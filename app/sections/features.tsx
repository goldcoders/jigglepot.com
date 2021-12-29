export default function FeatureSection() {
    return (
        <div className="bg-white">
            <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">All in one Platform</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Developing, Managing and Scaling sites on a non intuitive platform all in one platform.
                    </p>
                </div>
                <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative">
                            <dt>
                                <CheckIcon className="absolute w-6 h-6 text-green-500" aria-hidden="true" />
                                <p className="text-lg font-medium leading-6 text-gray-900 ml-9">{feature.name}</p>
                            </dt>
                            <dd className="mt-2 text-base text-gray-500 ml-9">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/outline'

const features = [
    {
        name: 'Offline Ready',
        description: 'Modify your Site Content Even Offline, Anywhere, Anytime.',
    },
    {
        name: 'Unlimited Customization',
        description: 'Customize your Site to your heart\'s content.',
    },
    {
        name: 'Multiple Cloud Services',
        description: 'Choose from Netlify, Vercel, Aws Amplify, Firebase, Heroku, and more.',
    },
    {
        name: 'No Monthly Fees',
        description: 'No monthly fees, no hidden costs.',
    },
    {
        name: 'Manage Unlimited Sites',
        description: 'Manage your sites offline or online. Deploy Unlimited Sites',
    },
    {
        name: 'Community Driven',
        description: 'No need to hire devs, Pay a small portion of the extra features with other users.',
    },
    {
        name: 'Marketplace',
        description: 'Different of web apps, Our marketplace is the best place to find the best apps.',
    },
    {
        name: 'Free to use',
        description: 'Free to use lifetime for non commercial sites (blog, portfolio, landing pages, etc).',
    },
]

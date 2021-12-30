import * as React from 'react';
import {
  Link, Links, LinksFunction, LiveReload, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration, useCatch
} from "remix";
import CatchError from './layouts/error';
import FooterBar from './layouts/footer';
import HeaderBar from './layouts/header';
import tailwindUrl from './styles/app.css';


export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindUrl },
  ]
}


export default function App({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <Document>
      <Layout>
        <div className="flex justify-center" style={{ height: "65vh" }}>
          <div className="min-h-full px-4 py-16 bg-white sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="mx-auto max-w-max">
              <main className="sm:flex">
                <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">There was an error</p>
                <div className="sm:ml-6">
                  <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{error.message}</h1>
                    <p className="mt-1 text-base text-gray-500">Hey, developer, you should replace this with what you want your
                      users to see.</p>
                  </div>
                  <div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">

                    <Link to="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Go Home</Link>
                    <Link
                      to="/support"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Contact support
                    </Link>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary({ children }: { children: React.ReactNode }) {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = `Oops! Looks like you tried to visit a page that you do not have access to.`;
      break;
    case 402:
      message = `Oops your Request cannot be process, until you make a payment`;
      break;
    case 403:
      message = `Ooops! Looks like you tried to visit a page that you do not have access to.`;
      break;
    case 404:
      message = `Oops! Looks like you tried to visit a page that does not exist.`;
      break;
    case 429:
      message = `Stop Making Too many requests! Please Try again later.`;
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{`${caught.status}|${caught.statusText}`}</title>
        <Links />
      </head>
      <body className='flex flex-col min-h-full'>
        <CatchError error={caught} message={message} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html >
  );
}


function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className='flex flex-col min-h-full'>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.PropsWithChildren<{}> }) {
  return (
    <>
      <HeaderBar></HeaderBar>
      <main className="flex-1">{children}</main>
      <FooterBar></FooterBar>
    </>
  );
};
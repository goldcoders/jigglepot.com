import * as React from 'react';
import {
  Links, LinksFunction, LiveReload,
  Meta, MetaFunction, Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
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


export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
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
      <body>
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
    <div className="flex flex-col min-h-screen">
      <HeaderBar></HeaderBar>
      <main className="flex-1">{children}</main>
      <FooterBar></FooterBar>
    </div>
  );
};
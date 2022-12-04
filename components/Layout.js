//Components
import Head from "next/head";
import Navigation from "./Navigation"; //NavBar

export default function Layout({ children }) {
    return (
        <div>    
            <Navigation />
            <Head>
                <title>Next.js Deneme</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {children}
        </div>
    )
}
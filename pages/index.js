//Libraries
import Head from "next/head" //Next [Header]
import Link from "next/link"; //Next [Link]


//Components
import Layout from "../components/Layout" //Master Page
import unfetch from 'isomorphic-unfetch'; //Fetch
import { useEffect, useState } from "react";

export default () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await unfetch("https://restcountries.com/v3.1/all"); //Get Data from API
            const result = await data.json(); //Convert to JSON
            setCountries(result);
        }

        fetchData()
    }, []);

    return (
        <Layout>
            <Head>
                <title>Anasayfa</title>
            </Head>

            <div className="container">
                <h1>Merhaba, Anasayfaya hoş geldiniz.</h1>
                <p className="mb-5">Hakkında daha fazla bilgi almak istediğiniz ülkenin detay butonuna tıklayınız.</p>

                <div className="row">
                    {
                        countries.map((item, index) => {
                            var languages = [];

                            if (item.languages) {
                                Object.keys(item.languages).forEach(function (key, value) {
                                    languages.push(item.languages[key]);
                                });
                            }

                            return (
                                <div key={index} className="col-3 mb-3">
                                    <div className="card">
                                        <img className="flag" src={item.flags.png} />
                                        <div className="card-body">
                                            <p className="fw-bold">{item.translations.tur.official}</p>
                                            <p><b>Başkent:</b> {item.capital}</p>
                                            <p><b>Diller:</b> {languages.join(", ")}</p>
                                            <Link href="/country/[id]" as={"country/" + item.cca2.toLowerCase()} className="btn btn-primary">Detay</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
}
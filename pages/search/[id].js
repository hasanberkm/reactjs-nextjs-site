//Libraries
import Head from "next/head" //Next [Header]
import { useRouter } from "next/router";

//Components
import Layout from "../../components/Layout" //Master Page
import unfetch from 'isomorphic-unfetch'; //Fetch
import { useEffect, useState } from "react";

export default () => {
    const router = useRouter().query;
    const id = router.id; //Get Country Code from URL Param

    const [country, setCountry] = useState([]); //Country Data
    const [preLoader, setPreLoader] = useState(true); //Preloader
    useEffect(() => {
        async function fetchData() {
            const data = await unfetch("https://restcountries.com/v3.1/alpha/" + id);
            const json = await data.json();

            setCountry(json);
            setPreLoader(false)
        }

        if (id) {
            fetchData();
        }

    }, [id])

    if (preLoader) {
        return (
            <div style={{ left: "45%", top: "50%", position: 'absolute' }}>
                <p className="fw-bold h1">Yükleniyor</p>
            </div>
        )
    } else {
        if (country.length > 0) {
            let capitals = [], languages = [], currencies = [];

            Object.keys(country[0].capital).forEach(function (key, value) {
                capitals.push(country[0].capital[key]);
            });

            Object.keys(country[0].languages).forEach(function (key, value) {
                languages.push(country[0].languages[key]);
            });

            Object.keys(country[0].currencies).forEach(function (key, value) {
                currencies.push(country[0].currencies[key].name + " (" + country[0].currencies[key].symbol + ")");
            });

            return (
                <Layout>
                    <Head>
                        <title>Search | {id}</title>
                    </Head>

                    <div className="container">
                        <h1>Merhaba, {country[0].translations.tur.official} hakkında edindiğimiz bilgiler aşağıda yer almaktadır.</h1>
                        <p className="mb-5">Verilerimizi farklı kaynaklardan sağlamaktayız.</p>

                        <div className="card">
                            <div className="row">
                                <div className="col-6 d-flex justify-content-center align-items-center">
                                    <img src={country[0].flags.png} style={{ height: 200, objectFit: 'contain' }} />
                                </div>

                                <div className="col-6">
                                    <iframe src={country[0].maps.googleMaps} width="100%" height="200" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                                </div>
                            </div>

                            <div className="card-body">
                                <p className="fw-bold">{country[0].translations.tur.official}</p>
                                <p><b>Başkent:</b> {capitals}</p>
                                <p><b>Diller:</b> {languages.join(", ")}</p>
                                <p><b>Para Birimi:</b> {currencies.join(", ")}</p>
                                <p><b>Kıta:</b> {country[0].region + " / " + country[0].subregion}</p>
                                <p><b>Toprak Büyüklüğü(Km):</b> {country[0].area}</p>
                                <p><b>Nüfüs(Kişi):</b> {country[0].population}</p>
                                <p><b>Zaman Dilimi:</b> {country[0].timezones}</p>
                                <p><b>Hafta Başlangıcı:</b> {country[0].startOfWeek}</p>
                                <p><b>Coğrafi Konum (Latitude, Longitude):</b> {country[0].capitalInfo.latlng.join(", ")}</p>
                            </div>
                        </div>
                    </div>
                </Layout >
            )
        } else {
            return (
                <Layout>
                    <Head>
                        <title>Search | {id}</title>
                    </Head>

                    <div className="container">
                        <h1>{id} ile eşleşen sonuçlar</h1>
                        <p className="mb-5">Verilerimizi farklı kaynaklardan sağlamaktayız.</p>
                        <hr />

                        <p>Aramanızla eşleşen bir sonuç bulunamadı</p>
                    </div>
                </Layout >
            )
        }
    }

}
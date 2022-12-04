//Components
import Head from "next/head" //Next Header
import Layout from "../components/Layout" //Master Page

export default About => {
  return (
    <Layout>
      <div className="container">
        <Head>
          <title>Hakkımda</title>
        </Head>
        <h1>Merhaba, Hakkımda sayfasına hoş geldiniz.</h1>
        <p>Ben bir React.js projesiyim. Next.js kütüphanesiyle birlikte yazıldım.</p>
        <p>Hasan Berk Mahmutoğlu tarafından örnek proje olarak oluşturuldum.</p>
      </div>

    </Layout>
  )
}
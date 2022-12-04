import { useState } from "react"; //React
import Link from 'next/link';

export default () => {
    const [search, setSearch] = useState("");

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Anasayfa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/about">Hakkımda</Link>
                        </li>
                    </ul>
                    <div className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={text => setSearch(text.target.value)} />
                        <Link  href="/search/[id]" as={"search/"+search} className="btn btn-outline-success">Search</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
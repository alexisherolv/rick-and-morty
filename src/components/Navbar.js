import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll=() => {
        const offset=window.scrollY;
        if(offset > 56 ){
          setScrolled(true);
        }
        else{
          setScrolled(false);
        }
      }

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    },[])

    let navbarClasses=["navbar", "fixed-top", "navbar-expand-lg", "navbar-dark"];
    
    if(scrolled){
        navbarClasses.push('scrolled');
    }

    return (
        <div>
            <nav className = {navbarClasses.join(" ")}>
                <Link className="navbar-brand logo" aria-current="page" to="/">
                        <img src={process.env.PUBLIC_URL + '/images/Logo.png'} width="170" height="70"/>
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto ">
                        <li className="nav-item active">
                            <Link className="nav-link active" aria-current="page" to="/">
                                HOME
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                CHARACTERS
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                EPISODES
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                LOCATIONS
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
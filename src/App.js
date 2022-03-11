import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/main.css";
import "./styles/characters.css";
import "./styles/footer.css";
import "./styles/pagination.css";
import "./styles/navbar.css";
import "./styles/filter.css";
import "./styles/slides.css";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Character from "./pages/Character";

function App() {
    
    return(
        <div className="page">
            <BrowserRouter>
                <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/character/:id/">
                            <Character />
                        </Route>
                    </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App;

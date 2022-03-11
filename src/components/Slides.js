import React from "react";

export default function Slides(props){
    return(
        <>
            <section className="main">
                <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={props.imagen} className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
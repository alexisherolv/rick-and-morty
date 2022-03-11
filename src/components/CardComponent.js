import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//Reacstrap Components
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Row,
    Col,
} from "reactstrap";

function CardComponent({index, item}){

    //Para obtener la información del primer episodio y colocarla en la tarjeta
    const [firstEpisode, setFirstEpisode] = useState("")
    
    const history = useHistory();

    useEffect(() => {
        var url = new URL(item.episode[0]);

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            setFirstEpisode(data.name)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion del episodio");
        });
    }, []);

    function onClickCharacter() {
        history.push(`/character/${item.id}/`);
    }


    return(
        <Card key={index} className = "card-character" onClick={onClickCharacter}>
            <Row>
                <Col md="5">
                    <img src={item.image} className="card-img" alt="..."/>
                </Col>
                <Col>
                    <CardBody>
                        <CardTitle tag="h5" className = "card-title">
                            {item.name}
                        </CardTitle>
                        <CardSubtitle
                            className={`mb-2 text-muted card-subtitle`}
                            tag="h6"
                        >
                            {item.status === "Alive" ? <span className="dot-alive"></span> : <span className="dot-dead"></span>} {item.status} - {item.species}
                        </CardSubtitle>
                        <CardText
                            className="card-location-title"
                        >
                            Last known location:
                        </CardText>
                        <CardText
                            className="mb-2 text-muted card-location-desc"
                            tag="h6"
                        >
                            {item.location.name}
                        </CardText>
                        <CardText
                            className="card-location-title"
                        >
                            First seen in:
                        </CardText>
                        <CardText
                            className="mb-2 text-muted card-location-desc"
                            tag="h6"
                        >
                            {firstEpisode}
                        </CardText>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    );
}

export default CardComponent;
import React, { useState, useEffect } from "react";
import Slide from "../components/Slides";
import { BrowserRouter as Router, useParams, useHistory } from "react-router-dom";
import Skeleton from '@yisheng90/react-loading';

//Reacstrap Components
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Row,
    Col,
    CardImg,
    CardGroup,
    Label
} from "reactstrap";


function Character(){
    const [character, setCharacter] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    const [relatedCharacters, setRelatedCharacters] = useState([]);

    //Bandera utilizada para el renderizado condicional
    const [dataFind, setDataFind] = useState(false);

    useEffect(() => {
        //Obtenemos la información del personaje actual de acuerdo a su ID
        var url = new URL(`${process.env.REACT_APP_API_URI}/character/${id}`);

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
            console.log(data);
            setCharacter(data);
            setDataFind(true)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion del personaje " + err );
        });
    }, [id]);

    useEffect(() => {
        //Obtenemos algunos personajes relacionados de acuerdo al status
        if(character!== null)
        {
            var url = new URL(`${process.env.REACT_APP_API_URI}/character/?status=${character.status}`);

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
                
                var dataAux = []
                
                for(var i=0; i<5; i++)
                {
                    if(data.results[i].id !== character.id)
                    {
                        dataAux.push(data.results[i])
                    }
                }
                setRelatedCharacters(dataAux);
            })
            .catch(function(err) {
                alert("No se pudo consultar la informacion de los personajes relacionados");
            });
        }
    }, [character]);

    function onClickCharacter(item) {
        history.push(`/character/${item.id}/`);
    }

    return dataFind === false ? (
        <>
            <Slide imagen={process.env.PUBLIC_URL + '/images/Slide1.png'} />
            <div className="container home">
                <Row className="abs-center">
                    <Col>
                        
                        <Skeleton height={25} color="#403c44" translucent/>
                        <Skeleton height="25px" color="#403c44" translucent/>
                        <Skeleton height="3rem" color="#403c44" translucent/>
                        
                    </Col>
                </Row>
            </div>
        </>
      ) : (
        <>
            <Slide imagen={process.env.PUBLIC_URL + '/images/Slide1.png'} />
            <div className="container home">
                <Card>
                    <Row>
                        <Col  md="5">
                            <img src= {`${character.image}`} className="img-fluid img-character" alt="..."/>
                        </Col>
                        <Col md="7">
                            <p className="character-title">{character.name}</p>
                            <p className="character-items">Created: {character.created}</p>
                            <p className="character-items">Status: {character.status === "Alive" ? <span className="dot-alive"></span> : <span className="dot-dead"></span>} {character.status}</p>
                            <p className="character-items">Episodes: {character.episode.length}</p>
                            <p className="character-items">Gender: {character.gender} </p>
                            <p className="character-items">Origin: {character.origin.name} </p>
                            <p className="character-items">Location: {character.location.name} </p>
                        </Col>
                    </Row>
                </Card>
                <Label className="related-label">Related Characters</Label>
                <CardGroup className="related-group">
                    {relatedCharacters.map((item, i) => (
                        <Card className = "card-character related-character" onClick={() => {onClickCharacter(item)}} key = {i}>
                            <CardImg
                                alt="Card image cap"
                                src={item.image}
                                top
                                width="100%"
                                className = "related-image"
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    {item.name}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                   {item.status === "Alive" ? <span className="dot-alive"></span> : <span className="dot-dead"></span>} {item.status} - {item.species}
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    ))
                    }
                </CardGroup>
            </div>
        </>
    );
}

export default Character;
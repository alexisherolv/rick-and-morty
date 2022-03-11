import React, { useEffect, useState } from "react";
import Skeleton from '@yisheng90/react-loading';

//Reacstrap Components
import {
    Row,
    Col,
} from "reactstrap";

import PaginationComponent from "../components/Pagination";
import CardComponent from "../components/CardComponent";
import Slides from "../components/Slides";
import Filter from "../components/Filter";

function Home() {

    //Para guardar la información de los personajes
    const [dataCharacters, setDataCharacters] = useState([]);

    //Para saber cuantas páginas (de personajes) son
    const [pages, setPages] = useState();

    //Bandera utilizada para el renderizado condicional
    const [dataFind, setDataFind] = useState(false);

    //Para saber en qué página nos encontramos actualmente
    const [currentPage, setCurrentPage] = useState(1);

    //Variables para el filtro
    const [name, setName] = useState("");

    const [status, setStatus] = useState({});

    const [specie, setSpecie] = useState("");

    const [type, setType] = useState("");

    const [gender, setGender] = useState({});

    const columnsPerRow = 2;

    useEffect(() => {
        //Obtenemos la data de los personajes por primera vez.
        var url = new URL(`${process.env.REACT_APP_API_URI}/character/`);

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
            console.log(data)
            setPages(data.info.pages)
            setDataCharacters(data.results)
            setDataFind(true)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los personajes");
        });
    }, []);


    useEffect(() => {
        //Cada que cambiemos de página obtenemos la data de acuerdo a los parámetros establecidos.
        var params = {}

        params = {
            page: currentPage,
            name: name,
            status: "",
            species: specie,
            type: type,
            gender: ""
        };

        if(status.value !== undefined && gender.value !== undefined)
        {
            params = {
                page: currentPage,
                name: name,
                status: status.value,
                species: specie,
                type: type,
                gender: gender.value
            };
        }
        else {
            if(status.value !== undefined)
            {
                params = {
                    page: currentPage,
                    name: name,
                    status: status.value,
                    species: specie,
                    type: type,
                    gender: ""
                };
            }
            else if(gender.value !== undefined)
            {
                params = {
                    page: currentPage,
                    name: name,
                    status: "",
                    species: specie,
                    type: type,
                    gender: gender.value
                };
            }
        }

        setDataFind(false)

        var url = new URL(`${process.env.REACT_APP_API_URI}/character/`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

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
            console.log(data)
            setPages(data.info.pages)
            setDataCharacters(data.results)
            setDataFind(true)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los personajes");
        });
    }, [currentPage]);

    function goToNextPage() {
        setCurrentPage((pages) => pages + 1)
    }
   
    function goToPreviousPage() {
        setCurrentPage((pages) => pages - 1)
    }

    function goToFirstPage() {
        setCurrentPage(1)
    }

    function goToLastPage() {
        setCurrentPage(pages)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 5) * 5;
        return new Array(5).fill().map((_, idx) => start + idx + 1);
    };

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        if(pageNumber<=pages)
        {
            setCurrentPage(pageNumber);
        }
    }

    function filterClick() {

        var params = {}

        params = {
            name: name,
            status: "",
            species: specie,
            type: type,
            gender: ""
        };

        if(status.value !== undefined && gender.value !== undefined)
        {
            params = {
                name: name,
                status: status.value,
                species: specie,
                type: type,
                gender: gender.value
            };
        }
        else {
            if(status.value !== undefined)
            {
                params = {
                    name: name,
                    status: status.value,
                    species: specie,
                    type: type,
                    gender: ""
                };
            }
            else if(gender.value !== undefined)
            {
                params = {
                    name: name,
                    status: "",
                    species: specie,
                    type: type,
                    gender: gender.value
                };
            }
        }

        setCurrentPage(1);
    
        var url = new URL(`${process.env.REACT_APP_API_URI}/character/`)
    
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        setDataFind(false)

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            if(response.status === 404)
            {
                setPages(1)
                setDataCharacters([])
                setDataFind(true)
            }
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            console.log(data)
            setPages(data.info.pages)
            setDataCharacters(data.results)
            setDataFind(true)
        })
        .catch(function(err) {
           console.log(err)
        });
    }

    function deleteClick() {
        //Regresamos las variables del filtro a su estado original
        setName("")
        setStatus({})
        setSpecie("")
        setType("")
        setGender({})

        //Regresamos la variable de nuestra página actual a 1
        setCurrentPage(1);

        setDataFind(false)
        var url = new URL(`${process.env.REACT_APP_API_URI}/character/`);

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
            console.log(data)
            setPages(data.info.pages)
            setDataCharacters(data.results)
            setDataFind(true)
        })
        .catch(function(err) {
            alert("No se pudo consultar la informacion de los personajes");
        });
    }

    return dataFind === false ? (
        <>
            <Slides imagen = {process.env.PUBLIC_URL + '/images/Slide1.png'} />
            <div className="container home">
                <Filter
                    filterClick = {filterClick}
                    deleteClick = {deleteClick}
                    name = {name}
                    setName = {setName}
                    status = {status}
                    setStatus = {setStatus}
                    specie = {specie}
                    setSpecie = {setSpecie}
                    type = {type}
                    setType = {setType}
                    gender = {gender}
                    setGender = {setGender}
                />
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
            <Slides imagen = {process.env.PUBLIC_URL + '/images/Slide1.png'} />
            <div className="container home">
                    <Filter
                        filterClick = {filterClick}
                        deleteClick = {deleteClick}
                        name = {name}
                        setName = {setName}
                        status = {status}
                        setStatus = {setStatus}
                        specie = {specie}
                        setSpecie = {setSpecie}
                        type = {type}
                        setType = {setType}
                        gender = {gender}
                        setGender = {setGender}
                    />

                    {dataCharacters.length === 0 ? (
                        <div className ="no-data">
                            <h2>No data found</h2>
                        </div>
                    ): 
                        <Row xs={1} md={columnsPerRow}>
                            {dataCharacters.map((item, i) => (
                                <Col key ={i}>
                                    <CardComponent
                                        index = {i}
                                        item = {item}
                                    />
                                </Col>
                            ))
                            }
                        </Row>
                    }   
                    <PaginationComponent 
                        pages = {pages} 
                        goToPreviousPage = {goToPreviousPage} 
                        getPaginationGroup = {getPaginationGroup} 
                        changePage = {changePage} 
                        goToNextPage = {goToNextPage} 
                        currentPage = {currentPage}
                        goToFirstPage = {goToFirstPage}
                        goToLastPage = {goToLastPage}
                    />
            </div>
        </>
    );
}

export default Home;
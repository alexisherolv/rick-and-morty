import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    FormGroup,
    Form,
    Label,
    Input,
} from "reactstrap";

import Select from "react-select";

function Filter({filterClick, deleteClick, name, setName, status, setStatus, specie, setSpecie, type, setType, gender, setGender}) {

    return (
        <Card className="filter">
            <CardHeader className="filter-header">
                <CardTitle tag="h4">Filter Characters</CardTitle>
            </CardHeader >
            <CardBody className="filter-body">
                <Form>
                    <Row className="justify-content-center">
                        <Col sm = "11">
                            <Row className="justify-content-center">
                                <Col sm = "4">
                                    <FormGroup>
                                        <Label className="filter-labels">Name </Label>
                                        <Input
                                            name="name"
                                            type="text"
                                            autoComplete="off"
                                            value = {name}
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm = "4">
                                    <Label className="filter-labels">Status </Label>
                                    <Select
                                        name=""
                                        className="react-select"
                                        placeholder="Select a status"
                                        classNamePrefix="react-select"
                                        value={status}
                                        onChange={(value) => {
                                            setStatus(value)
                                        }}
                                        options = {[{value:"alive", label: "Alive"}, {value:"dead", label: "Dead"}, {value:"unknown", label: "Unknown"}]}
                                    />
                                </Col>
                                <Col sm = "4">
                                    <FormGroup>
                                        <Label className="filter-labels">Specie</Label>
                                        <Input
                                            name="name"
                                            type="text"
                                            autoComplete="off"
                                            value = {specie}
                                            onChange={(e) => {
                                                setSpecie(e.target.value)
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col sm = "6">
                                    <FormGroup >
                                        <Label className="filter-labels">Type</Label>
                                        <Input
                                            name="noExterior"
                                            type="text"
                                            autoComplete="off"
                                            value = {type}
                                            onChange={(e) => {
                                                setType(e.target.value)
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm = "6">
                                    <FormGroup>
                                        <Label className="filter-labels">Gender</Label>
                                        <Select
                                            name=""
                                            className="react-select"
                                            placeholder="Select a gender"
                                            classNamePrefix="react-select"
                                            value={gender}
                                            onChange={(value) => {
                                                setGender(value)
                                            }}
                                            options = {[{value:"female", label: "Female"}, {value:"male", label: "Male"}, {value:"genderless", label: "Genderless"}, {value:"unknown", label: "Unknown"}]}
                                        />
                                    </FormGroup>
                                
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col sm = "3">

                                </Col>
                                <Col sm = "3">
                                    <Button className="button-delete" color="primary" onClick={deleteClick}>
                                        Borrar Filtros
                                    </Button>
                                </Col>
                                <Col sm = "3">
                                    <Button className="button-filter" color="primary" onClick={filterClick}>
                                        Filtrar
                                    </Button>
                                </Col>
                                <Col sm = "3">

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>  
            </CardBody>
        </Card> 
    )
}

export default Filter;
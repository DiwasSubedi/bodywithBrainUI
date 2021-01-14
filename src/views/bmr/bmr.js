/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    CardImg,
    CardTitle,
    CardText,
    Button
} from "reactstrap";
import Header from "components/Headers/Header.js";
import Form from "reactstrap/es/Form";

class bmr extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        this.state = {

        }


    }



    async componentDidMount() {

    }


    render() {
        return (
            <>
                <Header/>
                <Container className="mt--7 bg-gradient-info container-fluid" fluid>
                    <Row><Col><h3>&nbsp;&nbsp;BMR CALCULATOR</h3></Col><Col></Col></Row>
                    <Row className={"mt-5"}>
                        <div className=" col-1"></div>
                        <div className=" col">
                            {/* <h1>{this.props.location.state.title}</h1> */}
                            <Card className="bg-white text-dark border-0 p-1">
                                <CardBody>
                                    <Row >
                                        <p  style={{border:"2px solid black",borderRadius:"10px",padding:"10px"}}><strong>Basal Metabolic Rate</strong> is the amount of energy per unit of time that a person needs to keep the body functioning at rest. Some of those processes are breathing, blood circulation, controlling body temperature, cell growth, brain and nerve function, and contraction of muscles. </p>
                                    </Row>
                                    <br/>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <Form>

                                            </Form>
                                            <Button type="button"  className="float-right mt-5 mb-2" color="default"><span><i class="fas fa-ok"></i>&nbsp;Calculate</span></Button>
                                        </Col>
                                        <Col>
                                            
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <h1></h1>
                        </div>
                        <div className="col-1"></div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default bmr;

import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import LoadingSpinner from "./spinner/LoadingSpinner";
import React from "react";
class Home extends React.Component {
  state = {};
constructor(props){
  super(props);
  this.state = {
    loading: false
  }
}

  render() {
    return (
      <>
        <Container className=" mt-10" fluid>
          {/* Table */}
            {this.state.loading && <LoadingSpinner></LoadingSpinner>}
          <Row ><Col><h3>HOME</h3></Col><Col></Col></Row>
          <Row>
			  <Col>Welcome to Fitness</Col>
			
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;

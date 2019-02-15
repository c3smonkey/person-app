import React, { Component } from "react"
import { Alert } from "reactstrap"
import abDeploymentImg from "./a-b-deployment.png"
 
const ACTUATOR_SERVICE_URL = `http://ab-route-dev.apps.c3smonkey.ch/actuator/info`
 
const divStyle = {
  padding: "10px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
  color: "#4db1e8",
  textAlign: "center",
  fontFamily: "sans-serif"
}

const ImageAbDeploymnet = () => (
  <div style={divStyle}>
    <img src={abDeploymentImg} width="100%" height="100%" alt="bluegreen" />
  </div>
)
 

export default class AbDeployment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.fetchData()
    this.timer = setInterval(() => this.fetchData(), 500)
  }
  componentWillUnmount() {
    this.timer = null
  }

  fetchData = () => {
    this.setState({ ...this.state, isFetching: true })
    fetch(ACTUATOR_SERVICE_URL)
      .then(response => response.json())
      .then(result => this.setState({ actuator: result, isFetching: false }))
      .catch(e => console.log(e))
  }

  render() {
    if (!this.state.actuator) return <p>Loading...</p>
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <h2 class="text-center ">A/B Deployment</h2>
        <ImageAbDeploymnet />
        <div className="panel-list">
          <Alert color={`${this.state.actuator.git.branch === "feature2" ? "secondary" : "dark"}`} className="code">
             Greetings from {this.state.actuator.build.artifact} my version is {this.state.actuator.build.version}
            
          </Alert>
        </div>
      </div>
    )
  }
}

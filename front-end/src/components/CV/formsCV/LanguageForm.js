import React, { Component } from "react";
import { connect } from "react-redux";
import { addLanguage } from "../../../actions/cvActions";

import { Form, FormGroup, Col, Label, Button, Input } from "reactstrap";

class LanguageForm extends Component {
  state = {
    displayLanguage: {},
    displayInfo: [],
    key: 0
  };

  handleSubmit = e => {
    e.preventDefault();
    let newLanguage = {};
    newLanguage.name = e.target.name.value;
    newLanguage.level = e.target.level.value;

    const id = this.props.cvUser[0]._id;
    this.props.addLanguage(id, newLanguage);

    let elementToDelete = e.target.id;

    let newDisplay = this.state.displayLanguage;
    delete newDisplay[elementToDelete];
    this.setState({ displayLanguage: newDisplay });
    //
    let newRenderInfo = this.state.displayInfo;
    newRenderInfo.unshift(this.renderInfo(newLanguage));
    this.setState({ displayInfo: newRenderInfo });
  };
  renderInfo = obj => {
    return (
      <div>
        <div>
          <div>
            <strong>Language: </strong>
            {obj.name}
          </div>
          <div>
            <strong>Level: </strong>
            {obj.level}
          </div>
        </div>
        <hr />
      </div>
    );
  };

  renderForm = () => {
    return (
      <Form
        id={this.state.key}
        onSubmit={this.handleSubmit}
        key={this.state.key}
      >
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="language">Language</Label>
          </Col>
          <Col xs="12" md="9">
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="langauges .."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="diploma">Level</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select" name="level" id="degree" bsSize="sm">
              <option value="Basic">Basic level</option>
              <option value="Intermidate">Intermediate level</option>
              <option value="Advanced">Advanced level</option>
              <option value="Native">Native</option>
            </Input>
          </Col>
        </FormGroup>
        <Button
          type="submit"
          size="sm"
          color="primary"
          onSubmit={this.handleSubmit}
        >
          Add to my profil
        </Button>
      </Form>
    );
  };

  renderNewForm() {
    const languagesForms = this.state.displayLanguage;

    languagesForms[this.state.key] = this.renderForm();

    let newKey = this.state.key + 1;
    this.setState({
      displaylanguage: languagesForms,
      key: newKey
    });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div className="card animated fadeInLeft">
          <div className="card-body">
            <h3 className="card-title">My Languages</h3>
            <hr />
            <div>
              <button
                className="btn btn-info"
                onClick={this.renderNewForm.bind(this)}
              >
                add new language
              </button>
            </div>
          </div>
        </div>

        <div>{Object.values(this.state.displayLanguage)}</div>
        <div>{this.state.displayInfo}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { addLanguage })(LanguageForm);

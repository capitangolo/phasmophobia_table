import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import socketIOClient from "socket.io-client";
import qs from "qs";

// Hash from url query
const hash = qs.parse(window.location.search, { ignoreQueryPrefix: true }).hash

let socket = socketIOClient();
socket.on('connect', function() {
  socket.emit('register', hash);
});

class OverlayApp extends React.Component {

  constructor() {
    super();

    this.Evidences = {
      emf: {
        name: "emf",
        value: 1
      },
      fingerprints: {
        name: "fingerprints",
        value: 2
      },
      temp: {
        name: "temp",
        value: 4
      },
      orbs: {
        name: "orbs",
        value: 8
      },
      writing: {
        name: "writing",
        value: 16
      },
      box: {
        name: "box",
        value: 32
      },
      dots: {
        name: "dots",
        value: 64
      }
    }

    this.state = {
      evidences_yes: 0,
      evidences_not: 0,
    }

    this.toggleEvidence = this.toggleEvidence.bind(this);

    socket.on("evidence_updated", evidences => {
      this.setEvidences(evidences.yes, evidences.not);
    });
  }

  toggleEvidence(evidence) {
    // evidence = 0010
    // value    = 0111
    // ----------------
    // and      = 0010
    var has_evidence = (this.state.evidences_yes & evidence) === evidence
    var not_evidence = (this.state.evidences_not & evidence) === evidence
    var new_evidences_yes = this.state.evidences_yes
    var new_evidences_not = this.state.evidences_not

    if ( has_evidence ) {
      new_evidences_yes = this.state.evidences_yes - evidence
      new_evidences_not = this.state.evidences_not + evidence
    } else if ( not_evidence ) {
      new_evidences_not = this.state.evidences_not - evidence
    } else {
      new_evidences_yes = this.state.evidences_yes + evidence
    }

    this.setEvidences(new_evidences_yes, new_evidences_not);
    socket.emit('evidence_updated', {
      yes: new_evidences_yes,
      not: new_evidences_not
    } );
  }


  setEvidences(new_evidences_yes, new_evidences_not) {
    this.setState({
      evidences_yes: new_evidences_yes,
      evidences_not: new_evidences_not,
    });
  }

  render() {
    return (
      <div>
      <div>
        <div class="div-container">
          {Object.entries(this.Evidences).map((item) => <EvidenceButton evidence={item[1]} callback={this.toggleEvidence} state={this.state} />)}
        </div>
      </div>
      </div>
    );
  }
}

class EvidenceButton extends Component {
  handleClick = () => {
    this.props.callback(this.props.evidence.value)
  }

  render() {
    var value = this.props.evidence.value
    var has_evidence = (this.props.state.evidences_yes & value) === value
    var not_evidence = (this.props.state.evidences_not & value) === value
    // var evidence_name_key = "Evidence." + this.props.evidence.name + ".name"
    var css_class = has_evidence ? "green" : not_evidence ? "red" : ""
    var img_url = "img/" + this.props.evidence.name + ".svg"

    if ( has_evidence || not_evidence ) {
    return (
      <div class="grid-item">
        <button class="evidence" onClick={this.handleClick}>
          <img class={css_class} src={img_url} width="100%" height="100%"
               alt={this.props.evidence.name} />
        </button>
      </div>
    )
    } else {
      return null
    }
  }
}
export default OverlayApp

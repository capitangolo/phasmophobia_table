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
      }/*,
      footprints: {
        name: "footprints",
        value: 64
      }*/
    }

    this.Ghosts = [
      {
        name: "banshee",
        evidences: this.Evidences.emf.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.temp.value

      },
      {
        name: "demon",
        evidences: this.Evidences.temp.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value
      },
      {
        name: "jinn",
        evidences: this.Evidences.emf.value
                 + this.Evidences.orbs.value
                 + this.Evidences.box.value
      },
      {
        name: "mare",
        evidences: this.Evidences.temp.value
                 + this.Evidences.orbs.value
                 + this.Evidences.box.value
      },
      {
        name: "oni",
        evidences: this.Evidences.emf.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value
      },
      {
        name: "phantom",
        evidences: this.Evidences.emf.value
                 + this.Evidences.temp.value
                 + this.Evidences.orbs.value
      },
      {
        name: "poltergeist",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.orbs.value
                 + this.Evidences.box.value
      },
      {
        name: "revenant",
        evidences: this.Evidences.emf.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.writing.value
      },
      {
        name: "shade",
        evidences: this.Evidences.emf.value
                 + this.Evidences.orbs.value
                 + this.Evidences.writing.value
      },
      {
        name: "spirit",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value
      },
      {
        name: "wraith",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.temp.value
                 + this.Evidences.box.value
      },
      {
        name: "yurei",
        evidences: this.Evidences.temp.value
                 + this.Evidences.orbs.value
                 + this.Evidences.writing.value
      },
      {
        name: "yokai",
        evidences: this.Evidences.orbs.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value
      },
      {
        name: "hantu",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.orbs.value
                 + this.Evidences.writing.value
      }
    ]

    this.state = {
      evidences_yes: 0,
      evidences_not: 0,
      possible_ghosts: this.Ghosts
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
    var new_possible_ghosts = this.calculateGhosts(this.Ghosts, new_evidences_yes, new_evidences_not)

    this.setState({
      evidences_yes: new_evidences_yes,
      evidences_not: new_evidences_not,
      possible_ghosts: new_possible_ghosts
    });
  }

  calculateGhosts(ghosts, evidences_yes, evidences_not) {
    return ghosts.filter( (ghost) => {
      // evidence = 0110
      // ghost    = 0111
      // ----------------
      // and      = 0110
      var matches_yes = (ghost.evidences & evidences_yes) === evidences_yes

      // evidence = 1001
      // ghost    = 0111
      // ----------------
      // and      = 0001
      var matches_not = (ghost.evidences & evidences_not) !== 0

      return matches_yes && !matches_not
    })
  }

  calculateMissing(ghost) {
    var missing = ghost.evidences - this.state.evidences_yes

    var missing_evidences = Object.entries(this.Evidences).filter((item) => {
      var evidence = item[1]
      return( (missing & evidence.value) === evidence.value )
    })
    return missing_evidences
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

class Ghost extends React.Component {
  render() {
    var missing = []

    if (this.props.missing.length > 0) {
      var missing_names = this.props.missing.map((item) => {
        return item[1].name
      })
      missing = missing_names
    }

    var ghost_name_key = "Ghost." + this.props.ghost.name + ".name"

    return (
      <tr>
        <th>
          <FormattedMessage id={ghost_name_key} defaultMessage={this.props.ghost.name} />
        </th>
        <td>
          {missing.map((name) => <img src={"img/" + name + ".svg"} width="50px" height="50px" alt={name} />)}
        </td>
      </tr>
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

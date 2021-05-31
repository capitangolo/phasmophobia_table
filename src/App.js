import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';


class App extends React.Component {

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
      footprints: {
        name: "footprints",
        value: 64
      }
    }

    this.Ghosts = [
      {
        name: "banshee",
        evidences: this.Evidences.emf.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.temp.value
                 + this.Evidences.footprints.value

      },
      {
        name: "demon",
        evidences: this.Evidences.temp.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value
                 + this.Evidences.footprints.value
      },
      {
        name: "jinn",
        evidences: this.Evidences.emf.value
                 + this.Evidences.orbs.value
                 + this.Evidences.box.value
                 + this.Evidences.footprints.value
      },
      {
        name: "mare",
        evidences: this.Evidences.temp.value
                 + this.Evidences.orbs.value
                 + this.Evidences.box.value
                 + this.Evidences.footprints.value
      },
      {
        name: "oni",
        evidences: this.Evidences.emf.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value
                 + this.Evidences.footprints.value
      },
      {
        name: "phantom",
        evidences: this.Evidences.emf.value
                 + this.Evidences.temp.value
                 + this.Evidences.orbs.value
                 + this.Evidences.footprints.value
      },
      {
        name: "poltergeist",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.orbs.value
                 + this.Evidences.box.value
                 + this.Evidences.footprints.value
      },
      {
        name: "revenant",
        evidences: this.Evidences.emf.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.writing.value
                 + this.Evidences.footprints.value
      },
      {
        name: "shade",
        evidences: this.Evidences.emf.value
                 + this.Evidences.orbs.value
                 + this.Evidences.writing.value
                 + this.Evidences.footprints.value
      },
      {
        name: "spirit",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value
                 + this.Evidences.footprints.value
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
                 + this.Evidences.footprints.value
      },
      {
        name: "yokai",
        evidences: this.Evidences.orbs.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value
                 + this.Evidences.footprints.value
      },
      {
        name: "hantu",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.orbs.value
                 + this.Evidences.writing.value
                 + this.Evidences.footprints.value
      }
    ]

    this.state = {
      evidences_yes: 0,
      evidences_not: 0,
      possible_ghosts: this.Ghosts
    }

    this.toggleEvidence = this.toggleEvidence.bind(this);
  }

  toggleEvidence(evidence) {
    // evidence = 0010
    // value    = 0111
    // ----------------
    // and      = 0010
    var has_evidence = (this.state.evidences_yes & evidence) == evidence
    var not_evidence = (this.state.evidences_not & evidence) == evidence
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
      var matches_yes = (ghost.evidences & evidences_yes) == evidences_yes

      // evidence = 1001
      // ghost    = 0111
      // ----------------
      // and      = 0001
      var matches_not = (ghost.evidences & evidences_not) != 0

      return matches_yes && !matches_not
    })
  }

  calculateMissing(ghost) {
    var missing = ghost.evidences - this.state.evidences_yes

    var missing_evidences = Object.entries(this.Evidences).filter((item) => {
      var evidence = item[1]
      return( (missing & evidence.value) == evidence.value )
    })
    return missing_evidences
  }

  render() {
    return (
      <div>
      <div>
        <h1><FormattedMessage id="Evidence.list.title"/></h1>
        <ul>
          {Object.entries(this.Evidences).map((item) => <EvidenceButton evidence={item[1]} callback={this.toggleEvidence} state={this.state} />)}
        </ul>
      </div>
      <div>
        <h1><FormattedMessage id="Ghost.list.title"/></h1>
        <ul>
          {this.state.possible_ghosts.map((item) => <Ghost ghost={item} missing={this.calculateMissing(item)} />)}
        </ul>
      </div>
      <div>
        <p>Check the code <a href="https://github.com/capitangolo/phasmophobia_table">in GitHub</a></p>
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
      <li>
        <b><FormattedMessage id={ghost_name_key} defaultMessage={this.props.ghost.name} />:</b>
        {missing.map((name) => <span style={{margin: "10px"}} ><FormattedMessage id={"Evidence." + name + ".name"} defaultMessage={name} /></span>)}
      </li>
    );
  }
}

class EvidenceButton extends Component {
  handleClick = () => {
    this.props.callback(this.props.evidence.value);
  }

  render() {
    var value = this.props.evidence.value
    var has_evidence = (this.props.state.evidences_yes & value) == value
    var not_evidence = (this.props.state.evidences_not & value) == value
    var evidence_name_key = "Evidence." + this.props.evidence.name + ".name"

    if ( has_evidence ) {
      return (
        <li><button style={{"background-color": "green"}} onClick={this.handleClick}>
          <FormattedMessage id={evidence_name_key} defaultMessage={this.props.evidence.name} />
        </button></li>
      );
    } else if ( not_evidence ) {
      return (
        <li><button style={{"background-color": "red"}} onClick={this.handleClick}>
          <FormattedMessage id={evidence_name_key} defaultMessage={this.props.evidence.name} />
        </button></li>
      );
    } else {
      return (
        <li><button onClick={this.handleClick}>
          <FormattedMessage id={evidence_name_key} defaultMessage={this.props.evidence.name} />
        </button></li>
      );
    }
  }
}
export default App;

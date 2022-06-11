import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import socketIOClient from "socket.io-client";
import qs from "qs";

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Hash from url query
const lang = qs.parse(window.location.search, { ignoreQueryPrefix: true }).lang
const queryhash = qs.parse(window.location.search, { ignoreQueryPrefix: true }).hash
const hash = queryhash || makeid(6)
if ( !queryhash ) {
  let state = "/?"
  if ( lang ) {
    state += "lang=" + lang + "&"
  }
  state += "hash=" + hash
  window.history.replaceState(null, "", state)
}

let socket = socketIOClient();
socket.on('connect', function() {
  socket.emit('register', hash);
});


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
      dots: {
        name: "dots",
        value: 64
      }
    }

    this.Ghosts = [
      {
        name: "banshee",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.dots.value
                 + this.Evidences.orbs.value,
        evicences_optional: 0
      },
      {
        name: "demon",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.writing.value
                 + this.Evidences.temp.value,
        evicences_optional: 0
      },
      {
        name: "jinn",
        evidences: this.Evidences.emf.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.temp.value,
        evicences_optional: 0
      },
      {
        name: "mare",
        evidences: this.Evidences.writing.value
                 + this.Evidences.orbs.value
                 + this.Evidences.box.value,
        evicences_optional: 0
      },
      {
        name: "oni",
        evidences: this.Evidences.emf.value
                 + this.Evidences.temp.value
                 + this.Evidences.dots.value,
        evicences_optional: 0
      },
      {
        name: "phantom",
        evidences: this.Evidences.box.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.dots.value,
        evicences_optional: 0
      },
      {
        name: "poltergeist",
        evidences: this.Evidences.box.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.writing.value,
        evicences_optional: 0
      },
      {
        name: "revenant",
        evidences: this.Evidences.orbs.value
                 + this.Evidences.temp.value
                 + this.Evidences.writing.value,
        evicences_optional: 0
      },
      {
        name: "shade",
        evidences: this.Evidences.emf.value
                 + this.Evidences.temp.value
                 + this.Evidences.writing.value,
        evicences_optional: 0
      },
      {
        name: "spirit",
        evidences: this.Evidences.emf.value
                 + this.Evidences.writing.value
                 + this.Evidences.box.value,
        evicences_optional: 0
      },
      {
        name: "wraith",
        evidences: this.Evidences.emf.value
                 + this.Evidences.dots.value
                 + this.Evidences.box.value,
        evicences_optional: 0
      },
      {
        name: "yurei",
        evidences: this.Evidences.temp.value
                 + this.Evidences.orbs.value
                 + this.Evidences.dots.value,
        evicences_optional: 0
      },
      {
        name: "yokai",
        evidences: this.Evidences.orbs.value
                 + this.Evidences.dots.value
                 + this.Evidences.box.value,
        evicences_optional: 0
      },
      {
        name: "hantu",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.orbs.value
                 + this.Evidences.temp.value,
        evicences_optional: 0
      },
      {
        name: "goryo",
        evidences: this.Evidences.emf.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.dots.value,
        evicences_optional: 0
      },
      {
        name: "myling",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.emf.value
                 + this.Evidences.writing.value,
        evicences_optional: 0
      },
      {
        name: "onryo",
        evidences: this.Evidences.box.value
                 + this.Evidences.orbs.value
                 + this.Evidences.temp.value,
        evicences_optional: 0
      },
      {
        name: "twins",
        evidences: this.Evidences.emf.value
                 + this.Evidences.box.value
                 + this.Evidences.temp.value,
        evicences_optional: 0
      },
      {
        name: "raiju",
        evidences: this.Evidences.emf.value
                 + this.Evidences.orbs.value
                 + this.Evidences.dots.value,
        evicences_optional: 0
      },
      {
        name: "obake",
        evidences: this.Evidences.fingerprints.value
                 + this.Evidences.emf.value
                 + this.Evidences.orbs.value,
        evicences_optional: 0
      },
      {
        name: "mimic",
        evidences: this.Evidences.box.value
                 + this.Evidences.fingerprints.value
                 + this.Evidences.temp.value,
        evicences_optional: this.Evidences.orbs.value
      },
      {
        name: "deogen",
        evidences: this.Evidences.box.value
                 + this.Evidences.writing.value
                 + this.Evidences.dots.value,
        evicences_optional: this.Evidences.orbs.value
      },
      {
        name: "moroi",
        evidences: this.Evidences.box.value
                 + this.Evidences.temp.value
                 + this.Evidences.writing.value,
        evicences_optional: this.Evidences.orbs.value
      },
      {
        name: "thaye",
        evidences: this.Evidences.orbs.value
                 + this.Evidences.writing.value
                 + this.Evidences.dots.value,
        evicences_optional: this.Evidences.orbs.value
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
      hash: hash,
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
      var matches_optional = ((ghost.evidences + ghost.evicences_optional) & evidences_yes) === evidences_yes

      // evidence = 1001
      // ghost    = 0111
      // ----------------
      // and      = 0001
      var matches_not = (ghost.evidences & evidences_not) !== 0

      return (matches_yes || matches_optional) && !matches_not
    })
  }

  calculateMissing(ghost) {
    // evidence = 1011
    // evidence = 0100 <- Negate
    // ghost    = 0101
    // ----------------
    // and      = 0100
    var missing = ghost.evidences & (~this.state.evidences_yes)

    var missing_evidences = Object.entries(this.Evidences).filter((item) => {
      var evidence = item[1]
      return( (missing & evidence.value) === evidence.value )
    })
    return missing_evidences
  }

  calculateOptional(ghost) {
    var optional = ghost.evicences_optional & (~this.state.evidences_yes)

    var missing_optional = Object.entries(this.Evidences).filter((item) => {
      var evidence = item[1]
      return( (optional & evidence.value) === evidence.value )
    })
    return missing_optional
  }

  render() {
    return (
      <div>
      <div>
        <h1><FormattedMessage id="Evidence.list.title"/></h1>
        <div class="div-container">
          {Object.entries(this.Evidences).map((item) => <EvidenceButton evidence={item[1]} callback={this.toggleEvidence} state={this.state} />)}
        </div>
      </div>
      <div>
        <h1><FormattedMessage id="Ghost.list.title"/></h1>
        <table>
          {this.state.possible_ghosts.map((item) => <Ghost ghost={item} missing={this.calculateMissing(item)} optional={this.calculateOptional(item)} />)}
        </table>
      </div>
      <div>
        <p><a href={"overlay/?hash=" + hash}>OBS Overlay</a></p>
        <p>Check the code <a href="https://github.com/capitangolo/phasmophobia_table">in GitHub</a></p>
      </div>
      </div>
    );
  }
}

class Ghost extends React.Component {
  render() {
    var missing = []
    var optional = []

    if (this.props.missing.length > 0) {
      var missing_names = this.props.missing.map((item) => {
        return item[1].name
      })
      missing = missing_names
    }

    if (this.props.optional.length > 0) {
      var optional_names = this.props.optional.map((item) => {
        return item[1].name
      })
      optional = optional_names
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
        <td>
          {optional.map((name) => <img src={"img/" + name + ".svg"} width="50px" height="50px" class="optional" alt={name} />)}
        </td>
      </tr>
    );
  }
}

class EvidenceButton extends Component {
  handleClick = () => {
    this.props.callback(this.props.evidence.value);
  }

  render() {
    var value = this.props.evidence.value
    var has_evidence = (this.props.state.evidences_yes & value) === value
    var not_evidence = (this.props.state.evidences_not & value) === value
    // var evidence_name_key = "Evidence." + this.props.evidence.name + ".name"
    var css_class = has_evidence ? "green" : not_evidence ? "red" : ""
    var img_url = "img/" + this.props.evidence.name + ".svg"

    return (
      <div class="grid-item">
        <button class="evidence" onClick={this.handleClick}>
          <img class={css_class} src={img_url} width="100%" height="100%"
               alt={this.props.evidence.name} />
        </button>
      </div>
    );
  }
}
export default App;

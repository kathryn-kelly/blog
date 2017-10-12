import React, { Component } from "react";
import { render } from "react-dom";

class Playlist extends Component {
  constructor() {
    super();
    this.state = { playlist: ["", ""] };
  }

  addSong(str) {
    this.state.playlist = this.state.playlist.concat(str);
  }

  render() {
    return (
      <div>
        <h3 className="text-center">Playlists</h3>
        <div className="col-sm-12">Hello I'm the playlist component.</div>
        <h4> {this.state.playlist} </h4>
        <button onClick={() => this.addSong("")}>Song </button>
      </div>
    );
  }
}

export default Playlist;

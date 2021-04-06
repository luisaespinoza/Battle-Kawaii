import React, { useState } from 'react';
import GameModel from '../models/Game'

function NewGame(props) {
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [coverArtUrl, setCoverArtUrl] = useState("");
  const [completed, setCompleted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    GameModel.create({ title, publisher, coverArtUrl, completed })
      .then(data => {
        props.history.push('/games')
      })
  }

  return (
    <div>
      <h2>New Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            name="title" 
            onChange={(e) => setTitle(e.target.value)}
            value={title} />
        </div>
        <div className="form-input">
          <label htmlFor="publisher">Publisher</label>
          <input 
            type="text" 
            name="publisher" 
            onChange={(e) => setPublisher(e.target.value)}
            value={publisher} />
        </div>
        <div className="form-input">
          <label htmlFor="coverArtUrl">Image URL</label>
          <input 
            type="text" 
            name="coverArtUrl" 
            onChange={(e) => setCoverArtUrl(e.target.value)}
            value={coverArtUrl} />
        </div>
        <div className="form-input">
          <label htmlFor="completed">Completed</label>
          <input 
            type="checkbox" 
            id="completed" 
            checked={completed} 
            onChange={(e) => setCompleted(!completed)} />
        </div>

        <input type="submit" value="Save!"/>
      </form>
    </div>
  );
}

export default NewGame;

import './App.css';
import React, { Component } from 'react'

const serverURL = "http://cab2-108-53-232-66.ngrok.io";

const mapPrompt = (prompt) => {
  console.log(prompt)
// {text: '', isLie: true}
// {prompt: '', isLie: true}
  const newPrompt = {
    prompt: prompt.text,
    isLie: prompt.isLie
  }
  return newPrompt;
}

const mapVote = (username, vote) => {
  const newVote = {
    userName: username,
    promptVote: parseInt(vote)
  }
  return newVote;
}

export class App extends Component {
  state = {
    username: '',
    vote: '',
    promptOne: {
      text: '',
      isLie: true
    },
    promptTwo: {
      text: '',
      isLie: true
    },
    promptThree: {
      text: '',
      isLie: false
    }
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    })
  }

  handleVoteChange = (event) => {
    this.setState({
      vote: event.target.value,
    })
  }

  handlePromptOneChange = (event) => {
    this.setState({
      promptOne: {
        ...this.state.promptOne,
        text: event.target.value,
      }
    })
  }

  handlePromptOneBox = () => {
    this.setState({
      promptOne: {
        ...this.state.promptOne,
        isLie: !this.state.promptOne.isLie
      }
    })
  }

  handlePromptTwoChange = (event) => {
    this.setState({
      promptTwo: {
        ...this.state.promptTwo,
        text: event.target.value,
      }
    })
  }

  handlePromptTwoBox = () => {
    this.setState({
      promptTwo: {
        ...this.state.promptTwo,
        isLie: !this.state.promptTwo.isLie
      }
    })
  }

  handlePromptThreeChange = (event) => {
    this.setState({
      promptThree: {
        ...this.state.promptThree,
        text: event.target.value,
      }
    })
  }

  handlePromptThreeBox = () => {
    this.setState({
      promptThree: {
        ...this.state.promptThree,
        isLie: !this.state.promptThree.isLie
      }
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
  }

  async pingDetails(username) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "x-Trigger": "CORS", },
      body: JSON.stringify({ username })
    }
    const response = await fetch(`${serverURL}/ping`, requestOptions);
    const pingResponse = await response.text();
    return pingResponse;
  }

  async promptSubmit(username, promptOne, promptTwo, promptThree) {
    console.log(promptOne, promptTwo, promptThree);
    const mappedPromptOne = mapPrompt(promptOne);
    const mappedPromptTwo = mapPrompt(promptTwo);
    const mappedPromptThree = mapPrompt(promptThree);
    console.log(mappedPromptOne)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "x-Trigger": "CORS", },
      body: JSON.stringify({ 
        userName: username,
        prompts: {
          promptOne: mappedPromptOne,
          promptTwo: mappedPromptTwo,
          promptThree: mappedPromptThree
        }
      })
    }
    console.log('Sent prompts')
    const response = await fetch(`${serverURL}/prompt-submit`, requestOptions);
    const promptResponse = await response.text();
    console.log(promptResponse);
    return promptResponse;
  }

  async voteSubmit(username, vote) {
    const mappedVote = mapVote(username, vote)
    console.log(mappedVote)
    console.log(typeof(mappedVote.promptVote))
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "x-Trigger": "CORS", },
      body: JSON.stringify({ 
        userName: mappedVote.userName,
        promptVote: mappedVote.promptVote
      })
    }
    console.log('Sent vote')
    const response = await fetch(`${serverURL}/prompt-vote`, requestOptions);
    const voteResponse = await response.text();
    console.log(voteResponse)
    return voteResponse;
  }

  showDetails = () => {
		return (
			<div>
				{this.state.username}
        <br />
        Prompt One is: {JSON.stringify(this.state.promptOne.isLie)}
        <br />
        Prompt Two is: {JSON.stringify(this.state.promptTwo.isLie)}
        <br />
        Prompt Three is: {JSON.stringify(this.state.promptThree.isLie)}
        <br />
        {this.state.vote}
			</div>
		)
	}

  render() {
    const { username, vote, promptOne, promptTwo, promptThree } = this.state;
    return (
      <div className='App'>
        <h1>Two Truths and a Lie</h1>
        <form onSubmit={this.handleOnSubmit}>
					<label>Username:</label>
					<input
					name='newUsername'
          type='text'
					value={username}
					onChange={this.handleUsernameChange}
					/>
          <label>Prompt 1:</label>
					<input
					name='PromptOne'
          type='text'
					value={promptOne.text}
					onChange={this.handlePromptOneChange}
					/>
          <label>isLie:</label>
          <input
          type='checkbox'
					checked={promptOne.isLie}
					onChange={this.handlePromptOneBox}
					/>
          <label>Prompt 2:</label>
					<input
					name='promptTwo'
          type='text'
					value={promptTwo.text}
					onChange={this.handlePromptTwoChange}
					/>
          <label>isLie:</label>
          <input
          type='checkbox'
					checked={promptTwo.isLie}
					onChange={this.handlePromptTwoBox}
					/>
          <label>Prompt 3:</label>
					<input
					name='promptThree'
          type='text'
					value={promptThree.text}
					onChange={this.handlePromptThreeChange}
					/>
          <label>isLie:</label>
          <input
          type='checkbox'
					checked={promptThree.isLie}
					onChange={this.handlePromptThreeBox}
					/>
          <label>Vote:</label>
					<input
					name='vote'
          type='number'
					value={vote}
					onChange={this.handleVoteChange}
					/>
					<button onClick={() => {this.promptSubmit(username, promptOne, promptTwo, promptThree)}}>Send Prompt</button>
          <button onClick={() => {this.voteSubmit(username, vote)}}>Send Vote</button>
          <button onClick={() => {this.pingDetails(username)}}>Send Ping</button>
				</form>
        {this.showDetails()}
      </div>
    )
  }
}

export default App
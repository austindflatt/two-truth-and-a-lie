import './App.css';
import React, { Component } from 'react'
import FetchedPrompt from './components/FetchedPrompt';

const serverURL = "http://ce44-108-53-232-66.ngrok.io";

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
    },
    fetchedUsername: '',
    fetchedPromptOne: {
      prompt: '',
      isLie: false
    },
    fetchedPromptTwo: {
      prompt: '',
      isLie: false
    },
    fetchedPromptThree: {
      prompt: '',
      isLie: false
    },

    fetchedVoteOne: '',
    fetchedVoteTwo: '',
    fetchedVoteThree: '',
  }

  handleUsernameChange = (event) => {
    event.preventDefault();
    this.setState({
      username: event.target.value,
    })
  }

  handleVoteChange = (event) => {
    event.preventDefault();
    this.setState({
      vote: event.target.value,
    })
  }

  handlePromptOneChange = (event) => {
    event.preventDefault();
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
    event.preventDefault();
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
    event.preventDefault();
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

  async promptPoll() {
    const requestOptions = await fetch (`${serverURL}/prompt-poll`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "x-Trigger": "CORS", },
    })
    return requestOptions.text();
  }

  getPollPrompt = async () => {
    const currentPoll = await this.promptPoll();
    const parsedPoll = JSON.parse(currentPoll);
    console.log('current poll', currentPoll)
    console.log('parsed poll', parsedPoll)
    this.setState({
      fetchedUsername: parsedPoll.currentPrompt.userName,
      
      fetchedPromptOne: parsedPoll.currentPrompt.prompts.promptOne,
      fetchedPromptTwo: parsedPoll.currentPrompt.prompts.promptTwo,
      fetchedPromptThree: parsedPoll.currentPrompt.prompts.promptThree,

      fetchedVoteOne: parsedPoll.promptVotes[1],
      fetchedVoteTwo: parsedPoll.promptVotes[2],
      fetchedVoteThree: parsedPoll.promptVotes[3],
    })
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
					<label>Username:</label>
					<input
					name='newUsername'
          type='text'
					value={username}
					onChange={this.handleUsernameChange}
					/>
          <br />
          <label>Prompt 1:</label>
					<input
					name='PromptOne'
          type='text'
					value={promptOne.text}
					onChange={this.handlePromptOneChange}
					/>
          <br />
          <label>isLie:</label>
          <input
          type='checkbox'
					checked={promptOne.isLie}
					onChange={this.handlePromptOneBox}
					/>
          <br />
          <label>Prompt 2:</label>
					<input
					name='promptTwo'
          type='text'
					value={promptTwo.text}
					onChange={this.handlePromptTwoChange}
					/>
          <br />
          <label>isLie:</label>
          <input
          type='checkbox'
					checked={promptTwo.isLie}
					onChange={this.handlePromptTwoBox}
					/>
          <br />
          <label>Prompt 3:</label>
					<input
					name='promptThree'
          type='text'
					value={promptThree.text}
					onChange={this.handlePromptThreeChange}
					/>
          <br />
          <label>isLie:</label>
          <input
          type='checkbox'
					checked={promptThree.isLie}
					onChange={this.handlePromptThreeBox}
					/>
          <br />
          <label>Vote:</label>
					<input
					name='vote'
          type='number'
          min='1'
          max='3'
					value={vote}
					onChange={this.handleVoteChange}
					/>
          <br /><br />
					<button onClick={() => {this.promptSubmit(username, promptOne, promptTwo, promptThree)}}>Send Prompt</button>
          <button onClick={() => {this.voteSubmit(username, vote)}}>Send Vote</button>
          <button onClick={() => {this.pingDetails(username)}}>Send Ping</button>
          {/* {this.showDetails()} */}
          <hr />
          <FetchedPrompt
          fetchedUsernameProp={this.state.fetchedUsername}

          fetchedPromptOneProp={this.state.fetchedPromptOne.prompt}
          fetchedPromptTwoProp={this.state.fetchedPromptTwo.prompt}
          fetchedPromptThreeProp={this.state.fetchedPromptThree.prompt}

          fetchedVoteOneProp={this.state.fetchedVoteOne}
          fetchedVoteTwoProp={this.state.fetchedVoteTwo}
          fetchedVoteThreeProp={this.state.fetchedVoteThree}
          clickPoll={this.getPollPrompt}
          />
      </div>
    )
  }
}

export default App
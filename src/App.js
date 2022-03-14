import './App.css';
import React, { Component } from 'react'

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
					<button>Send Prompt</button>
          <button>Send Vote</button>
				</form>
        {this.showDetails()}
      </div>
    )
  }
}

export default App
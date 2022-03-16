import React from 'react'


export default function FetchedPrompt(props) {
  return (
	  <>
	  <h1>From the server</h1>
		<div>
			<label>Fetched Username:</label>
			{props.fetchedUsernameProp}
			<br />

			<label>Prompt 1:</label>
			{props.fetchedPromptOneProp}
			<br />
			<label>Prompt 2:</label>
			{props.fetchedPromptTwoProp}
			<br />
			<label>Prompt 3:</label>
			{props.fetchedPromptThreeProp}
			<br />

			<label>Vote 1:</label>
			{props.fetchedVoteOneProp}
			<label>Vote 2:</label>
			{props.fetchedVoteTwoProp}
			<label>Vote 3:</label>
			{props.fetchedVoteThreeProp}
			<br />
			<button onClick={props.clickPoll}>Get Poll</button>
		</div>
	</>
  )
}
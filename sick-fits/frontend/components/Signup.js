import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$email: String!
		$name: String!
		$password: String!
	) {
		signup(email: $email, name: $name, password: $password) {
			id
			email
			name
		}
	}
`;

export default class Signup extends Component {
	state = {
		name: '',
		email: '',
		password: '',
	};

	saveToState = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	render() {
		const { email, name, password } = this.state;
		return (
			<Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
				{(signup, { error, loading }) => (
					<Form
						method="post"
						onSubmit={async e => {
							e.preventDefault();
							await signup();
							this.setState({ name: '', email: '', password: '' });
						}}
					>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Signup</h2>
							<Error error={error} />
							<label htmlFor="email">
								<input
									type="email"
									name="email"
									value={email}
									onChange={this.saveToState}
								/>
							</label>
							<label htmlFor="name">
								<input
									type="text"
									name="name"
									value={name}
									onChange={this.saveToState}
								/>
							</label>
							<label htmlFor="password">
								<input
									type="password"
									name="password"
									value={password}
									onChange={this.saveToState}
								/>
							</label>
							<button type="submit">Sign Up</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

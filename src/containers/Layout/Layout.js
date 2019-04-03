import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import GameType from '../../components/GameType/GameType';
import PlayerName from '../../components/PlayerName/PlayerName';
import GameBoard from '../../components/GameBoard/GameBoard';

class Layout extends Component {

	state = {
		player: {
			player1: {
				name: 'Player1',
				value: 'X',
				moves: []
			},
			player2: {
				name: 'Player2',
				value: 'O',
				moves: []
			}
		},
		isPlayer1Active: true,
		isUserTurn: true,
		flag: false,
		isPlayer2Active: false,
		gameType: null,
		isPlayerAdded: false,
		isGameOver: false,
		box: [
			{ value: '', index: 0 }, { value: '', index: 1 }, { value: '', index: 2 },
			{ value: '', index: 3 }, { value: '', index: 4 }, { value: '', index: 5 },
			{ value: '', index: 6 }, { value: '', index: 7 }, { value: '', index: 8 },
		]
	};

	componentDidUpdate() {
		if (this.state.gameType === 'single' && !this.state.isGameOver) {
			console.log('---componentDidUpdate------state---', !this.state.isUserTurn && this.state.flag)

			if (!this.state.isUserTurn && this.state.flag) {
				const player = JSON.parse(JSON.stringify(this.state.player));
				const box = JSON.parse(JSON.stringify(this.state.box));
				const activePlayer = this.state.isPlayer1Active ? 'player1' : 'player2';
				console.log('=====', player['player1'].moves, '====player2', player['player2'].moves)
				while (true) {
					let moves = Math.floor(Math.random() * 9);
					// let filter = box.filter(item => {
					// 	if (item.index !== moves) {

					// 	}
					// })
					if (player['player1'].moves.includes(moves) || player['player2'].moves.includes(moves)) {
						continue;
					}
					if (!player['player1'].moves.includes(moves) && !player['player2'].moves.includes(moves)) {
						console.log('----moves----', moves, player[activePlayer].moves)
						player[activePlayer].moves.push(moves);
						box[moves].value = player[activePlayer].value;
						break;
					}
				}
				let checkWinner = (
					(
						player['player2'].moves.includes(0) &&
						(
							(player['player2'].moves.includes(1) && player['player2'].moves.includes(2)) ||
							(player['player2'].moves.includes(3) && player['player2'].moves.includes(6)) ||
							(player['player2'].moves.includes(4) && player['player2'].moves.includes(8))
						)
					)
					||
					(player['player2'].moves.includes(1) && player['player2'].moves.includes(4) && player['player2'].moves.includes(7)) ||
					(player['player2'].moves.includes(2) && player['player2'].moves.includes(5) && player['player2'].moves.includes(8)) ||
					(player['player2'].moves.includes(2) && player['player2'].moves.includes(4) && player['player2'].moves.includes(6)) ||
					(player['player2'].moves.includes(3) && player['player2'].moves.includes(4) && player['player2'].moves.includes(5)) ||
					(player['player2'].moves.includes(6) && player['player2'].moves.includes(7) && player['player2'].moves.includes(8))
				);
				let checkDraw = box.filter(item => item.value === '');

				if (checkDraw.length === 0 && !checkWinner) {
					alert(' Its a Tie !!');
				}
				if (checkWinner) {
					alert('Player2 is the winner !!');
				}
				// console.log('---player---', player, '----box----', box)
				this.setState({
					player,
					box,
					isPlayer1Active: !this.state.isPlayer1Active,
					isUserTurn: !this.state.isUserTurn,
					flag: false
				})
			}
		}
	}

	selectGameType = (event) => {
		this.setState({
			gameType: event.target.value
		});
	};

	nameChangeHandler = (event) => {
		let player = JSON.parse(JSON.stringify(this.state.player));
		player[event.target.name].name = event.target.value
		this.setState({
			player
		});
	};

	addPlayer = () => {
		this.setState({
			isPlayerAdded: true
		});
	};

	setValue = (event, moves) => {
		const player = JSON.parse(JSON.stringify(this.state.player));
		const box = JSON.parse(JSON.stringify(this.state.box));
		player[event.target.id].moves.push(moves);
		box[moves].value = player[event.target.id].value;
		console.log('----user----', moves)
		let checkWinner = (
			(
				player[event.target.id].moves.includes(0) &&
				(
					(player[event.target.id].moves.includes(1) && player[event.target.id].moves.includes(2)) ||
					(player[event.target.id].moves.includes(3) && player[event.target.id].moves.includes(6)) ||
					(player[event.target.id].moves.includes(4) && player[event.target.id].moves.includes(8))
				)
			)
			||
			(player[event.target.id].moves.includes(1) && player[event.target.id].moves.includes(4) && player[event.target.id].moves.includes(7)) ||
			(player[event.target.id].moves.includes(2) && player[event.target.id].moves.includes(5) && player[event.target.id].moves.includes(8)) ||
			(player[event.target.id].moves.includes(2) && player[event.target.id].moves.includes(4) && player[event.target.id].moves.includes(6)) ||
			(player[event.target.id].moves.includes(3) && player[event.target.id].moves.includes(4) && player[event.target.id].moves.includes(5)) ||
			(player[event.target.id].moves.includes(6) && player[event.target.id].moves.includes(7) && player[event.target.id].moves.includes(8))
		);

		let checkDraw = box.filter(item => item.value === '');

		if (checkDraw.length === 0 && !checkWinner) {
			alert(' Its a Tie !!');
		}
		if (checkWinner) {
			alert(player[event.target.id].name + ' is the winner !!');
		}

		this.setState({
			player,
			box,
			isPlayer1Active: !this.state.isPlayer1Active,
			isUserTurn: !this.state.isUserTurn,
			flag: true,
			isGameOver: checkWinner
		});
	};

	restart = () => {
		this.setState({
			...this.state,
			player: {
				player1: {
					name: 'Player1',
					value: 'X',
					moves: []
				},
				player2: {
					name: 'Player2',
					value: 'O',
					moves: []
				}
			},
			isPlayer1Active: true,
			isPlayer2Active: false,
			gameType: null,
			isPlayerAdded: false,
			box: [
				{ value: '', index: 0 }, { value: '', index: 1 }, { value: '', index: 2 },
				{ value: '', index: 3 }, { value: '', index: 4 }, { value: '', index: 5 },
				{ value: '', index: 6 }, { value: '', index: 7 }, { value: '', index: 8 },
			]
		})
	}

	render() {
		return (
			<div className="layout col-md-5 offset-3 mt-5 border">
				<Header />
				<GameType selectGameType={(event) => this.selectGameType(event)} />
				{
					this.state.gameType !== null &&
					<PlayerName
						nameChangeHandler={(event) => this.nameChangeHandler(event)}
						addPlayer={this.addPlayer}
						{...this.state} />
				}
				<GameBoard
					box={this.state.box}
					setValue={(event, moves) => this.setValue(event, moves)}
					player={this.state.player}
					isPlayer1Active={this.state.isPlayer1Active}
					restart={this.restart} />
			</div>
		);
	};
};

export default Layout;

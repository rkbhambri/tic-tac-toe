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
        isPlayer2Active: false,
        // playerActive:
        gameType: null,
        isPlayerAdded: false,
        box: [
            { value: '', index: 0 }, { value: '', index: 1 }, { value: '', index: 2 },
            { value: '', index: 3 }, { value: '', index: 4 }, { value: '', index: 5 },
            { value: '', index: 6 }, { value: '', index: 7 }, { value: '', index: 8 },
        ]
    };

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
        let player = JSON.parse(JSON.stringify(this.state.player));
        let box = JSON.parse(JSON.stringify(this.state.box));
        player[event.target.id].moves.push(moves);
        box[moves].value = player[event.target.id].value;

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
        )

        if (checkWinner) {
            alert(player[event.target.id].name + ' is the winner')
        }
        console.log('---player---', player, '---box----', box)
        this.setState({
            player,
            box,
            isPlayer1Active: !this.state.isPlayer1Active
        });
    };

    render() {
        console.log('----this.state.player----', this.state.player)
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
                    isPlayer1Active={this.state.isPlayer1Active} />
            </div>
        );
    }
}

export default Layout;

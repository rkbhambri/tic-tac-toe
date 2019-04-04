import React from 'react';

const GameResult = (props) => {
    let message = null;
    if (props.isGameTied !== null) {
        message = <h3 className="w-100">Its a Tie !!</h3>
    }
    if (props.winner !== null) {
        message = <h3 className="w-100">{props.winner} has won !!</h3>
    }

    return (
        <div className="game-board row col-md-8 offset-2 mt-5 text-center">
            {message}
        </div>
    );
};

export default GameResult;

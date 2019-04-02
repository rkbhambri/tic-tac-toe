import React from 'react';

const GameBoard = (props) => {
    const activePlayer = props.isPlayer1Active ? 'player1' : 'player2';
    return (
        <div className="game-board row col-md-8 offset-2 mt-5">
            {
                props.box.map(item => {
                    return (
                        <div
                            className="box col-md-4 border p-4 text-center"
                            key={item.index}
                            id={activePlayer}
                            style={{ minHeight: '80px', minWidth: '80px' }}
                            onClick={(event) => props.setValue(event, item.index)}>
                            {item.value}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default GameBoard;

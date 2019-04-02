import React from 'react';

const GameType = (props) => {
    return (
        <div className="select-game-type text-center mt-5 pt-3">
            <span className="single-player">
                <button
                    className="btn btn-sm btn-primary"
                    value="single"
                    onClick={(event) => props.selectGameType(event)}>
                    Single Player
                </button>
            </span>
            <span className="double-player ml-5">
                <button
                    className="btn btn-sm btn-primary"
                    value="double"
                    onClick={(event) => props.selectGameType(event)}>
                    Double Player
                </button>
            </span>
        </div>
    );
};

export default GameType;

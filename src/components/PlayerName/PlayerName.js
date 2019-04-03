import React from 'react';

const PlayerName = (props) => {
    return (
        <form
            className="player row col-md-8 offset-2 mt-4"
            onChange={(event) => props.nameChangeHandler(event)}>
            <input
                type="text"
                className="form-control col-md-4"
                name="player1"
                defaultValue={props.player.player1.name}
                placeholder="Enter name"
                readOnly={props.isPlayerAdded} />
            {
                props.gameType === 'double' &&
                <input
                    type="text"
                    className="form-control col-md-4 ml-2"
                    name="player2"
                    defaultValue={props.player.player2.name}
                    placeholder="Enter name"
                    readOnly={props.isPlayerAdded} />
            }
            <button
                className="btn btn-sm btn-primary col-md-3 ml-3"
                type="button"
                onClick={props.addPlayer}>
                Add
        </button>
        </form>
    );
};

export default PlayerName;

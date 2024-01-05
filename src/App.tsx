import React from 'react';
import P5Component from './components/P5Component';
import GameInfo from './components/GameInfo';

const App : React.FC = ({}) => {
    return (
        <>
            <h1>LOL World</h1>
            <GameInfo/>
            <P5Component/>
        </>
    )
}

export default App;
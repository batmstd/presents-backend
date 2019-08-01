import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Master from "./core/Master";

const App: React.FC = () => {
    const [user, setUser] = useState();
    return (
        <BrowserRouter>
            <Master {...{user}}/>
        </BrowserRouter>
    );
};

export default App;

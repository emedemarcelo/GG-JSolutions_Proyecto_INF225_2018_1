import React from 'react';
import CardResults from './CardResults.jsx';


class Results extends React.Component {
    state = {
        test : 1,
    }

    render(){
        return(
                <CardResults />
        );
    }
}

export default Results;
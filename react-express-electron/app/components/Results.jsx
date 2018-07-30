import React from 'react';
import CardResults from './CardResults.jsx';


class Results extends React.Component {
    render(){
        const cards = this.props.cards;

        return(
                cards.map((item) => (
                    <CardResults key={item.id} name={item.nombre}/>
                ))
        );
    }
}

export default Results;
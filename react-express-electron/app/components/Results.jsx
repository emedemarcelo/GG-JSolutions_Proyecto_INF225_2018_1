import React from 'react';
import CardResults from './CardResults.jsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Results extends React.Component {
    componentWillReceiveProps(nextProps){
        // this check makes sure that the getDashboardStats action is not getting called for other prop changes
        console.log("alooo")
   }
   componentWillUnmount(){
       console.log("me mueeero");
   }

    render(){
        const cards = this.props.cards;
        console.log(this.props.value);
        return(
                cards.map((item) => (
                    <CardResults key={item.id} name={item.nombre}/>
                ))
        );
    }
}

const mapStateToProps = state => {
    return {
        value: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (data_in) =>
            dispatch({
                type: 'ADD',
            })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);

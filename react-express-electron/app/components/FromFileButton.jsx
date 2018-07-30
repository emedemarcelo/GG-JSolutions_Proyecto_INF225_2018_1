import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DataParser from './DataParser.jsx';
import ReactFileReader from 'react-file-reader';


class FromFileButton extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        data: null
    }

    

    handleFiles = (files) => {
        
        var reader = new FileReader();
        

        reader.onload = function(e) {
            let data;
            // Use reader.result
            //alert(reader.result)
            //LO QUE SALE DE DATA PARSER HAY QUE GUARDARLO EN UN ESTADO
            data = DataParser.loadDataFromFile(reader.result);
            console.log(data);
            this.state.data=data;
        }
        
        reader.readAsText(files[0]);
    }
    render(){
        return(
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                <Button size="small" color="secondary" variant="outlined" 
                    onClick = {()=>{this.props.myData(
                        this.state
                    )}}>
                    Buscar archivo CSV</Button>
            </ReactFileReader>
        
        )
    }

}

FromFileButton.propTypes = {  
    classes: PropTypes.object.isRequired,
    myData: PropTypes.func
};
export default FromFileButton;
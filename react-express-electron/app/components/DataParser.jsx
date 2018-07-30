import React, { Component } from 'react';
import Papa from 'papaparse';

class DataParser extends Component {

  constructor(props) {
    // Call super class
    super(props);

    // Bind this to function updateData (This eliminates the error)
    this.updateData = this.updateData.bind(this);
  }

  static loadDataFromFile(CSVcontent) {
      var data = Papa.parse(CSVcontent);
      

    // // Your parse code, but not seperated in a function
    // Papa.parse(CSVfile, {
    //   header: true,
    //   download: true,
    //   skipEmptyLines: true,
    //   // Here this is also available. So we can call our custom class method
    //   complete: this.updateData
    // });
      return data;
  }

  updateData(result) {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
  }

  render() {
    // Your render function
    return <div>Data</div>
  }
}

export default DataParser;
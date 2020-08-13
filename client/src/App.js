import React, {useEffect, useState, useRef} from 'react';
import { ListGroup, ListGroupItem, Container} from 'reactstrap';
import './App.css'
import * as math from 'mathjs';
import Axios from 'axios'



class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
      forexObj: null,
      factor: 1
    }
    this.intervals = []

    this.updateForex = this.updateForex.bind(this)
    this.changeForexDirection = this.changeForexDirection.bind(this)
  }

  componentDidMount() {
    Axios.get('/forex').then((data)=>{
      this.setState({forexObj:data.data.rates})
    })
    this.intervals.push(setInterval(this.updateForex, 5*1000))
    this.intervals.push(setInterval(this.changeForexDirection, 60*1000))
    setTimeout(() => {
      
this.intervals.map(value => {
        clearInterval(value)
      })
    }, 60*5*1000)
  }

  updateForex() {
    const {forexObj, factor} = this.state
    Object.keys(forexObj).map((key) => {
      forexObj[key] += factor * 0.0001
    })
    this.setState({forexObj})
  }

  changeForexDirection() {
    this.setState({factor: this.state.factor * -1})
  }


  render() {

    const {forexObj, factor} = this.state

    if(forexObj === null) {
      return("Loading...")
    }

    return (
        <Container>
               <h3 style={{textAlign:'center',marginTop:10}}>Forex rates</h3>
          <ListGroup style={{marginTop:30}} className="forex">
            <ListGroupItem>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                     <div>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1200px-Flag_of_Europe.svg.png" style={{height:50, width:80,marginRight:10}}/>
                     <img src="https://www.merchantstronghold.com/currency/wp-content/uploads/2017/05/usd-1.png" style={{height:50, width:80}}/>
                     </div>
                     <div style={{marginTop:14, marginLeft:5}}>
                       <b>EUR/USD</b>
                     </div>
                  </div>
                <div style={factor === -1 ? {backgroundColor:'crimson', padding:10, borderRadius:5} : {backgroundColor:'green', padding:10, borderRadius:5}}>
                  {math.format(forexObj.USD, {precision: 4, notation: 'fixed'})}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                     <div>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1200px-Flag_of_Europe.svg.png" style={{height:50, width:80,marginRight:10}}/>
                     <img src="https://cdn.countryflags.com/thumbs/australia/flag-400.png" style={{height:50, width:80}}/>
                     </div>
                     <div style={{marginTop:14, marginLeft:5}}>
                       <b>EUR/AUD</b>
                     </div>
                  </div>
                <div style={factor === -1 ? {backgroundColor:'crimson', padding:10, borderRadius:5} : {backgroundColor:'green', padding:10, borderRadius:5}}>
                  {math.format(forexObj.AUD, {precision: 4, notation: 'fixed'})}
                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                     <div>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1200px-Flag_of_Europe.svg.png" style={{height:50, width:80,marginRight:10}}/>
                     <img src="https://cntvna.files.wordpress.com/2014/05/cms_77a7d41f16c44f428f5c8072fce43b17.gif" style={{height:50, width:80}}/>
                     </div>
                     <div style={{marginTop:14, marginLeft:5}}>
                       <b>EUR/CAD</b>
                     </div>
                  </div>
                <div style={factor === -1 ? {backgroundColor:'crimson', padding:10, borderRadius:5} : {backgroundColor:'green', padding:10, borderRadius:5}}>
                  {math.format(forexObj.CAD, {precision: 4, notation: 'fixed'})}

                </div>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div>
                  <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                     <div>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1200px-Flag_of_Europe.svg.png" style={{height:50, width:80,marginRight:10}}/>
                     <img src="https://etc.usf.edu/clipart/72000/72016/72016_bg_flag_col_lg.gif" style={{height:50, width:80}}/>
                     </div>
                     <div style={{marginTop:14, marginLeft:5}}>
                       <b>EUR/BGN</b>
                     </div>
                  </div>
                </div>
                <div style={factor === -1 ? {backgroundColor:'crimson', padding:10, borderRadius:5} : {backgroundColor:'green', padding:10, borderRadius:5}}>
                  {math.format(forexObj.BGN, {precision: 4, notation: 'fixed'})}
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Container>
    );
  }
}
  //


export default App;
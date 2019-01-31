import React from "react";
//import Async from "react-async"
//import { CheckAccount} from "./EosCore";

import Eos from "eosjs";



import {
  Button,
  AppBar,
  Typography,
  Toolbar,
  Paper,
  Grid,
  Divider,
  // TextField,
  Table
} from "@material-ui/core";

global.fetch = require('node-fetch')
const cc = require('cryptocompare')
cc.setApiKey('3e6a2ba71dddbb9996848462b47c2e7b736fb5ce67d546dc791f5e9baa873b00')




const style = {
  AppBar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 15,
    border: 1,
    //color: "white",
    height: 50,
    boxShadow: "0 3px 10  px 5px rgba(0, 0, 0, .3)"
  },
  Paper:{
    borderRadius: 15,
    //marginTop: 15,
    padding: "15px 15px",
    textAlign: "justify",
    //background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)"
    background: "linear-gradient(45deg, #ffc714 30%, #de4320 90%)",

  },
  Paper2: {
    borderRadius: 10,
    //marginTop: 15,
    padding: "10px 10px",
    textAlign: "justify",
    //background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)"
    background: 'linear-gradient(45deg, #420c0c 30%, #800808 90%)',

  }
}

const config = {
  chainId: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
  // chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  //keyProvider: [wif],
  //httpEndpoint: "https://telos.eos.barcelona", 
  httpEndpoint: "https://api.eosimpera.com/",
     // httpEndpoint: 'http://jungle.cryptolions.io:18888',
  // TODO: changeable https://api.eosnewyork.io https://nodes.get-scatter.com https://api1.eosasia.one
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, 
  sign: true
};


const eos = Eos(config);
const BPACCOUNTNAME = "tlosimperabp";
const DIVACCOUNTNAME = "imperadivids";
//const PROACCOUNTNAME = "gyytqnbxhage";
const PROACCOUNTNAME = "imperareserv";

let BPACCOUNT;
let DIVACCOUNT;
let PROACCOUNT;
let BPACTIONS;
let DIVACTIONS;
let PROACTIONS;
let TELOSPRICE;

function CheckAccount(account): Promise<any> {
//console.log(account);
  return new Promise((resolve: any) => {
    eos.getAccount(account).then(AccInfo => {
      //console.log(AccInfo)
      if (account === BPACCOUNTNAME) {
        BPACCOUNT=AccInfo;
        console.log(BPACCOUNT);
      }
      if (account === DIVACCOUNTNAME) {
        DIVACCOUNT=AccInfo;
                console.log(DIVACCOUNT);
      }
      if (account === PROACCOUNTNAME) {
        PROACCOUNT=AccInfo;
        console.log(PROACCOUNT);     
      }
    })
      .catch(error => {
        console.error(error);
      });
  })
}
function CheckAction2(account): Promise<any> {

  return new Promise((resolve: any) => {
    console.log("ciao")

    eos.getActions("tlosimperabp").then(console.log)


  })
}

function CheckAction(account): Promise<any> {
  return new Promise((resolve: any) => {
console.log(account + "  actions")
    eos.getActions(account).then(actions =>{
      console.log(actions)
      if (account === BPACCOUNTNAME) {
        BPACTIONS = actions.map(a => a.action_trace);
       // console.log(BPACTIONS);
      }
      if (account === DIVACCOUNT) {
        DIVACTIONS = actions.map(a => a.action_trace);
       // console.log(DIVACTIONS);
      }
      if (account === PROACCOUNTNAME) {
        PROACTIONS = actions.map(a => a.action_trace);
       // console.log(PROACTIONS);
      }

    })
      .catch(error => {
        console.error(error);
      });
  })
}

class App extends React.Component {
constructor(){
  super();
  this.state ={
    bpbalance:"0",
    divbalance:"0",
    probalance:"0",
    bpcpu:"0",
    divcpu:"0",
    procpu:"0",
    bpban:"0",
    divban:"0",
    proban:"0",
    bpUnstake:0,
    divUnstake:0,
    proUnstake:0,
    totalbpbalance:0,
    totaldivbalance:0,
    totalprobalance:0,
    eosPriceUSD:0,
    eosPriceEUR: 0,
    eosPriceBTC: 0,
    eosPricETH: 0,
    tlosEOS:0.03,
  }
  }
  
  componentDidMount() {


    //setTimeout(this.changeState1, 4000);
    //setTimeout(this.changeState2, 4000);
    //setTimeout(this.changeState3, 4000);

    setInterval(this.changeState1, 2000);
    setInterval(this.changeState2, 2000);
    setInterval(this.changeState3, 2000);

    CheckAccount(BPACCOUNTNAME);
    CheckAccount(DIVACCOUNTNAME);
    CheckAccount(PROACCOUNTNAME);

    
 //   fetch("https://api.chainrift.com/v1/Public/Market?")
 //     .then(results => {
 //       return results.json();
 //     }).then(data =>{
 //       console.log(data)
 //     })
    cc.price('EOS', ['USD', 'EUR','BTC','ETH'])
      .then(prices => {
        //console.log(prices)
        this.setState({
          eosPriceUSD: prices.USD,
          eosPriceBTC: prices.BTC,
          eosPriceETH: prices.ETH,
          eosPriceEUR: prices.EUR
        })
        // -> { USD: 1100.24, EUR: 1039.63 }
       // console.log(this.state.eosPriceEUR)
       // console.log(this.state.eosPriceUSD)
      })
      .catch(console.error)


  

    };


  changeState1 = ()=> {
     this.setState({
      bpbalance: BPACCOUNT.core_liquid_balance,
      bpcpu: BPACCOUNT.total_resources.cpu_weight,
      bpban: BPACCOUNT.total_resources.net_weight,
      totalbpbalance: this.balance(this.state.bpbalance) + this.balance(this.state.bpcpu) + this.balance(this.state.bpban),
      bpUnstake: this.balance(BPACCOUNT.refund_request.net_amount) + this.balance(BPACCOUNT.refund_request.cpu_amount),

    });
  }

  balance = (value) => {
    return parseFloat(value);
  }
  
  changeState2 = () => {
    this.setState({
      divbalance: DIVACCOUNT.core_liquid_balance,
      divcpu: DIVACCOUNT.total_resources.cpu_weight,
      divban: DIVACCOUNT.total_resources.net_weight,
      totaldivbalance: this.balance(this.state.divbalance) + this.balance(this.state.divcpu) + this.balance(this.state.divban),
      divUnstake: this.balance(DIVACCOUNT.refund_request.net_amount) + this.balance(DIVACCOUNT.refund_request.cpu_amount),

    });
    //console.log(this.state.totaldivbalance)

  }

  changeState3 = () => {
    this.setState({
      probalance: PROACCOUNT.core_liquid_balance,
      procpu: PROACCOUNT.total_resources.cpu_weight,
      proban: PROACCOUNT.total_resources.net_weight,
      totalprobalance: this.balance(this.state.probalance) + this.balance(this.state.procpu) + this.balance(this.state.proban),
      proUnstake: this.balance(PROACCOUNT.refund_request.net_amount) + this.balance(PROACCOUNT.refund_request.cpu_amount),

    });

    //console.log(PROACCOUNT.refund_request.net_amount)

  }

 
  render() {
    return(
    <div>

        <img
          src="/images/htmlheadmail.png"
          style={{
            // marginLeft: '-10px',
            position: "relative",
            //flexGrow: 1,
            width: "100%",

            //margin: '0px',
            //borderRadius: 15
          }}
        />
        <Grid container spacing={24} direction="row">
          <Grid item xs={6} sm={6}>

            <Paper
              style={{
                ...style.Paper2,
                topMargin: 10,
                //  height: 320
              }}
              elevation={10}
            >
              
              <Typography component="p" align="left"  style={{
                color: "white",
                topMargin: -10,
              }}>
                EOS/USD: <strong> {this.state.eosPriceUSD}$</strong><br/>
                TLOS/EOS: <strong> {this.state.tlosEOS} </strong><br />
                TLOS/USD: <strong> {(this.state.eosPriceUSD * this.state.tlosEOS).toFixed(3)}$</strong><br />
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={6}>

            <Paper
              style={{
                ...style.Paper2,
                topMargin: 10,
                //  height: 320
              }}
              elevation={10}
            >

              <Typography component="p" align="left"  style={{
                color: "white",
                topMargin: -10,
                            }}>
                EOS/USD: <strong> {this.state.eosPriceEUR}€</strong><br />
                TLOS/EOS: <strong> {this.state.tlosEOS}  </strong><br />
                TLOS/USD: <strong> {(this.state.tlosEOS * this.state.eosPriceEUR).toFixed(3)}€</strong><br />              
                </Typography>
            </Paper>
          </Grid>


          </Grid>
       



        <Grid container spacing={24} direction="row">
          <Grid item xs={12} sm={4}>

        <Paper
          style={{
            ...style.Paper,
            topMargin:10,
          //  height: 320
          }}
          elevation={10}
        >
              <Typography variant="caption">
             Account:
              </Typography>
              <Typography variant="headline" variant="h6">
                {(BPACCOUNTNAME).toUpperCase()}
          </Typography>
          <Typography component="p">
                Liquid:  <strong>{this.state.bpbalance}</strong><br />
                Staked CPU:  <strong>{this.state.bpcpu}</strong><br />
                Staked BAN: <strong> {this.state.bpban}</strong><br />
                  </Typography>
              <Typography variant="caption">
                Unstake:  <strong> {this.state.bpUnstake}</strong> TLOS
              </Typography>
              <hr
                style={{
                  //     color: red,
                  //     backgroundColor: color,
                  height: 1
                }}
              />
              <Typography variant="headline" variant="h6">
                <strong>{this.state.totalbpbalance}</strong> Telos
              </Typography>
              <Typography variant="headline" variant="caption">
                <strong>{((this.state.totalbpbalance * this.state.tlosEOS) * this.state.eosPriceUSD).toFixed(2)}</strong> $ - <strong>{((this.state.totalbpbalance * this.state.tlosEOS) * this.state.eosPriceEUR).toFixed(2)}</strong> €
              </Typography>
        </Paper>
        </Grid>
          <Grid item xs={12} sm={4}>

        <Paper
          style={{
            ...style.Paper,
            //  height: 320
            topMargin: 10,

          }}
          elevation={10}
        >
              <Typography variant="caption">
                 Account:
              </Typography>
              <Typography variant="headline" variant="h6">
                {(DIVACCOUNTNAME).toUpperCase()}
          </Typography>
          <Typography component="p">
               Liquid: <strong> {this.state.divbalance}</strong><br />
                Staked CPU: <strong> {this.state.divcpu}</strong><br />
                Staked BAN: <strong>{this.state.divban}</strong><br />
          </Typography>
              <Typography variant="caption">
                Unstake:  <strong> {this.state.divUnstake}</strong> TLOS
              </Typography>
              <hr
                style={{
                  //     color: red,
                  //     backgroundColor: color,
                  height: 1
                }}
              />
              <Typography variant="headline" variant="h6">
                <strong>{this.state.totaldivbalance}</strong> Telos
              </Typography>
              <Typography variant="headline" variant="caption">
                <strong>{((this.state.totaldivbalance * this.state.tlosEOS) * this.state.eosPriceUSD).toFixed(2)}</strong> $ - <strong>{((this.state.totaldivbalance * this.state.tlosEOS) * this.state.eosPriceEUR).toFixed(2)}</strong> €
              </Typography>
        </Paper>
          </Grid>

            <Grid item xs={12} sm={4}>

        <Paper
          style={{
            ...style.Paper,
            //  height: 320
            topMargin: 10,

          }}
          elevation={10}
        >
              <Typography variant="caption">
                Account:
              </Typography>
              <Typography variant="headline" variant="h6">
                {(PROACCOUNTNAME).toUpperCase()}
          </Typography>
          <Typography component="p">
                Liquid: <strong> {this.state.probalance}</strong><br />
            Staked CPU:  <strong>{this.state.procpu}</strong><br />
                Staked BAN:  <strong>{this.state.proban}</strong><br />
          </Typography>
              <Typography variant="caption">
                Unstake:  <strong> {this.state.proUnstake}</strong> TLOS
              </Typography>
              <hr
                style={{
             //     color: red,
             //     backgroundColor: color,
                  height: 1
                }}
              />
              <Typography variant="headline" variant="h6">
                <strong>{this.state.totalprobalance}</strong> Telos
              </Typography>
              <Typography variant="headline" variant="caption">
                <strong>{((this.state.totalprobalance * this.state.tlosEOS) * this.state.eosPriceUSD).toFixed(2)}</strong> $ - <strong>{((this.state.totalprobalance * this.state.tlosEOS) * this.state.eosPriceEUR).toFixed(2)}</strong> €
              </Typography>
        </Paper>
          </Grid>

        </Grid>

        <Grid container spacing={24} direction="row">
          <Grid item xs={12} sm={12}>

            <Paper
              style={{
                ...style.Paper2,
                topMargin: 10,
                //  height: 320
              }}
              elevation={10}
            >

              <Typography component="p" align="left" style={{
                color: "white",
                topMargin: -10,
              }}>
                USD: <strong> {(this.state.eosPriceUSD * this.state.tlosEOS * (this.state.totalbpbalance + this.state.totaldivbalance + this.state.totalprobalance)).toFixed(2)} </strong>$<br />
                EUR: <strong> {(this.state.eosPriceEUR * this.state.tlosEOS * (this.state.totalbpbalance + this.state.totaldivbalance + this.state.totalprobalance)).toFixed(2)} </strong>€<br />
                TLOS: <strong> {(this.state.totalbpbalance + this.state.totaldivbalance + this.state.totalprobalance).toFixed(4)} </strong><br />
                EOS: <strong> {((this.state.totalbpbalance + this.state.totaldivbalance + this.state.totalprobalance) * this.state.tlosEOS).toFixed(4)} </strong><br />
                BTC: <strong> {((this.state.totalbpbalance + this.state.totaldivbalance + this.state.totalprobalance) * (this.state.tlosEOS * this.state.eosPriceBTC)).toFixed(10)} </strong><br />
                ETH: <strong> {((this.state.totalbpbalance + this.state.totaldivbalance + this.state.totalprobalance) * (this.state.tlosEOS * this.state.eosPriceETH)).toFixed(10)} </strong><br />

              </Typography>
            </Paper>
          </Grid>



        </Grid>
      </div>

    )}
};
export default App;

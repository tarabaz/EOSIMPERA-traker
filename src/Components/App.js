
import React from "react";
//import Async from "react-async"
//import { CheckAccount} from "./EosCore";

import Eos from "eosjs";
import axios from "axios";

import {
  Typography,
  Paper,
  Grid

  // TextField,
} from "@material-ui/core";

global.fetch = require("node-fetch");
const cc = require("cryptocompare");
cc.setApiKey(
  "3e6a2ba71dddbb9996848462b47c2e7b736fb5ce67d546dc791f5e9baa873b00"
);

const style = {
  AppBar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 15,
    border: 1,
    //color: "white",
    height: 50,
    boxShadow: "0 3px 10  px 5px rgba(0, 0, 0, .3)"
  },
  Paper: {
    borderRadius: 15,
    //marginTop: 15,
    padding: "15px 15px",
    textAlign: "justify",
    //background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)"
    background: "linear-gradient(45deg, #ffc714 30%, #de4320 90%)"
  },
  Paper2: {
    borderRadius: 10,
    //marginTop: 15,
    padding: "10px 10px",
    textAlign: "justify",
    //background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)"
    background: "linear-gradient(45deg, #420c0c 30%, #800808 90%)"
  },
  button: {
    background: "linear-gradient(45deg, #ffffff 30%, #e8e8e8 90%)",
    borderRadius: 15,
    border: 0,
    color: "white",
    //height: 28,
    padding: "0 0px"
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  Paper3: {
    borderRadius: 10,
    //marginTop: 15,
    padding: "10px 10px",
    textAlign: "center",
    background: "linear-gradient(45deg, #ffc714 30%, #de4320 90%)"
    // background: 'linear-gradient(45deg, #420c0c 30%, #800808 90%)',
  }
};

const config = {
  chainId: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
  // chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  //keyProvider: [wif],
  //httpEndpoint: "https://telos.eos.barcelona",
  //httpEndpoint: "https://api.eosimpera.com/",
  httpEndpoint: "https://api.eos.miami",
  //httpEndpoint: "https://api.eosimpera.com/",
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
const ACCOUNTNAME = "gyytqnbxhage";
const PROACCOUNTNAME = "imperareserv";

let BPACCOUNT;
let DIVACCOUNT;
let PROACCOUNT;
let ACCOUNT;
let BPLIST;
let TELOS = 0;
//let BPACTIONS;
//let DIVACTIONS;
//let PROACTIONS;
//let TELOSPRICE;

function CheckAccount(account): Promise<any> {
  //console.log(account);
  return new Promise((resolve: any) => {
    eos
      .getAccount(account)
      .then(AccInfo => {
        //console.log(AccInfo)
        if (account === BPACCOUNTNAME) {
          BPACCOUNT = AccInfo;
          //  console.log(BPACCOUNT);
        }
        if (account === DIVACCOUNTNAME) {
          DIVACCOUNT = AccInfo;
          //          console.log(DIVACCOUNT);
        }
        if (account === PROACCOUNTNAME) {
          PROACCOUNT = AccInfo;
          //   console.log(PROACCOUNT);
        }
        if (account === ACCOUNTNAME) {
          ACCOUNT = AccInfo;
          //console.log(AccInfo);
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
}

/*
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
*/
/*
function CheckPrise(): Promise<any> {
  return new Promise((resolve: any) => {
    let webLink = "http://api.chainrift.com/v1/Public/GetPairStats?";
    fetch(webLink)
      .then(res => {
        return res.json();
      })
      .then(dati => {
        const risultato = dati.data;
        console.log(risultato);
      });
  });
}

function prise(): Promise<any> {
  console.log("inizio");
  return new Promise((resolve: any) => {
    const response = fetch(
      "https://api.coingecko.com/api/v3/coins/telos/tickers"
    ).then(data => {
      console.log(response);

      response.json();
    });
    console.log(response);
  }).catch(error => {
    console.error(error);
  });
}
*/
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bpbalance: "0",
      divbalance: "0",
      probalance: "0",
      bpcpu: "0",
      divcpu: "0",
      procpu: "0",
      bpban: "0",
      divban: "0",
      proban: "0",
      bpUnstake: "0",
      divUnstake: 0,
      proUnstake: 0,
      totalbpbalance: 0,
      totaldivbalance: 0,
      totalprobalance: 0,
      eosPriceUSD: 0,
      eosPriceEUR: 0,
      eosPriceBTC: 0,
      eosPricETH: 0,
      tlosEOS: 0,
      bpPosition: "-",
      totalDivids: "",
      totalTelosDivids: "",
      bpBlockProduced: "",
      bpMissedBlock: "",
      bpMissedBlockRotation: "",
      bpVotes: 0,
      bpUnpaid: "",
      data: null,
      metadata: [],
      tlosTickers: [],
      bpTx: [],
      divTx: [],
      proTx: [],
      fetchingBP: null,
      avvioTabella: null
    };
  }

  componentDidMount() {
    CheckAccount(ACCOUNTNAME);
    ////////////////////////////////////////////////////////////////////////////U

    //const datiprezzo = fetch('https://api.chainrift.com/v1/Public/GetPairStats?')

    axios
      .get("https://api.coingecko.com/api/v3/coins/telos/tickers.json")
      .then(res => {
        this.setState({
          tlosTickers: res.data.tickers,
          tlosEOS: res.data.tickers[0].last
        });
        // console.log(this.state.tlosTickers)
        // console.log(this.state.tlosTickers.length)
        for (var i = 0; i < this.state.tlosTickers.length; i++) {
          if (this.state.tlosTickers[i].target === "EOS") {
            TELOS = parseFloat(this.state.tlosTickers[i].last);
            //console.log(TELOS)

            // console.log(this.state.tlosTickers[i].last)
            /*
          this.setstate({
            tlosEOS: TELOS,
          })
*/
          } else {
          }
        }
      });

    //xhttp.open("get", "https://api.livecoin.net/exchange/ticker?currencyPair=BTC/USD", true);
    /*

   this.setState({
        tlosEOS:dati,
      })

*/
    console.log("inizio");
    // eos.getActions({ account_name: BPACCOUNTNAME, pos: 379, offset: 5 }).then(_data => {

    eos
      .getActions(BPACCOUNTNAME, -1)
      .then(_data => {
        this.setState({
          bpTx: _data,
          avvioTabella: true
        });
        console.log(this.state.bpTx);
      })
      .then(() => {
        console.log(this.state.bpTx.actions.length);
        //  this.createBpTable()
      })
      .catch(error => {
        console.error(error);
      });

    eos
      .getActions(DIVACCOUNTNAME, -1)
      .then(_data => {
        // console.log(_data);
        this.setState({
          divTx: _data
        });
      })
      .catch(error => {
        console.error(error);
      });

    eos
      .getActions(PROACCOUNTNAME, -1)
      .then(_data => {
        this.setState({
          proTx: _data
        });
        // console.log(this.state.proTx);
      })
      .catch(error => {
        console.error(error);
      });

    console.log("fine");

    eos
      .getAccount(BPACCOUNTNAME)
      .then(AccInfo => {
        BPACCOUNT = AccInfo;
        console.log(AccInfo);
        let valore1 = 0;
        BPACCOUNT.refund_request
          ? (valore1 =
              this.balance(BPACCOUNT.refund_request.net_amount) +
              this.balance(BPACCOUNT.refund_request.cpu_amount))
          : // console.log("valore c'è")
            (valore1 = 0);

        this.setState({
          bpUnstake: valore1,
          bpbalance: BPACCOUNT.core_liquid_balance,
          bpcpu: BPACCOUNT.total_resources.cpu_weight,
          bpban: BPACCOUNT.total_resources.net_weight
        });
        let total =
          this.balance(this.state.bpbalance) +
          this.balance(this.state.bpcpu) +
          this.balance(this.state.bpban) +
          this.balance(this.state.bpUnstake);
        this.setState({
          totalbpbalance: total
        });
      })
      .catch(error => {
        console.error(error);
      });

    eos
      .getAccount(DIVACCOUNTNAME)
      .then(AccInfo => {
        DIVACCOUNT = AccInfo;
        //          console.log(DIVACCOUNT);
        let valore = 0;
        DIVACCOUNT.refund_request
          ? (valore =
              this.balance(DIVACCOUNT.refund_request.net_amount) +
              this.balance(DIVACCOUNT.refund_request.cpu_amount))
          : (valore = 0);

        this.setState({
          divUnstake: valore,

          divbalance: DIVACCOUNT.core_liquid_balance,
          divcpu: DIVACCOUNT.total_resources.cpu_weight,
          divban: DIVACCOUNT.total_resources.net_weight,
          totaldivbalance:
            this.balance(this.state.divbalance) +
            this.balance(this.state.divcpu) +
            this.balance(this.state.divban) +
            this.balance(this.state.divUnstake)
          // divUnstake: this.balance(DIVACCOUNT.refund_request.net_amount) + this.balance(DIVACCOUNT.refund_request.cpu_amount),
        });
        let total =
          this.balance(this.state.divbalance) +
          this.balance(this.state.divcpu) +
          this.balance(this.state.divban) +
          this.balance(this.state.divUnstake);
        this.setState({
          totaldivbalance: total
        });
      })
      .catch(error => {
        console.error(error);
      });

    eos
      .getAccount(PROACCOUNTNAME)
      .then(AccInfo => {
        //console.log(AccInfo)

        PROACCOUNT = AccInfo;
        let valore = 0;
        PROACCOUNT.refund_request
          ? (valore =
              this.balance(PROACCOUNT.refund_request.net_amount) +
              this.balance(PROACCOUNT.refund_request.cpu_amount))
          : (valore = 0);

        this.setState({
          proUnstake: valore,
          probalance: PROACCOUNT.core_liquid_balance,
          procpu: PROACCOUNT.total_resources.cpu_weight,
          proban: PROACCOUNT.total_resources.net_weight
          // proUnstake: this.balance(PROACCOUNT.refund_request.net_amount) + this.balance(PROACCOUNT.refund_request.cpu_amount),
        });
        let total =
          this.balance(this.state.probalance) +
          this.balance(this.state.procpu) +
          this.balance(this.state.proban) +
          this.balance(this.state.proUnstake);
        this.setState({
          totalprobalance: total
        });
      })
      .catch(error => {
        console.error(error);
      });

    //////////////////////////////////////////////////////////////////////////////

    //   fetch("https://api.chainrift.com/v1/Public/Market?")
    //     .then(results => {
    //       return results.json();
    //     }).then(data =>{
    //       console.log(data)
    //     })
    cc.price("EOS", ["USD", "EUR", "BTC", "ETH"])
      .then(prices => {
        //console.log(prices)
        this.setState({
          eosPriceUSD: prices.USD,
          eosPriceBTC: prices.BTC,
          eosPriceETH: prices.ETH,
          eosPriceEUR: prices.EUR
        });
      })
      .catch(console.error);

    /*
      axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=6d18f57f-0ba0-40e6-8c93-3686ea23fa56')
        .then(res => {
          console.log(res.data)
          const persons = res.data
          this.setState = ({
            metadata: persons,
          })
        })
  
  
  */

    eos.getProducers({ json: true, limit: 50 }).then(lista => {
      //console.log(lista);
      BPLIST = lista;
      //console.log(BPLIST);

      for (var i = 0; i < 40; i++) {
        let bp = BPLIST.rows[i].owner;
        if (bp === "tlosimperabp") {
          // console.log(bp)
          // console.log(BPLIST.rows[i]);
          let vot = parseFloat(BPLIST.rows[i].total_votes);
          this.setState({
            bpPosition: i + 1,
            bpBlockProduced: BPLIST.rows[i].lifetime_produced_blocks,
            bpMissedBlock: BPLIST.rows[i].lifetime_missed_blocks,
            bpMissedBlockRotation: BPLIST.rows[i].missed_blocks_per_rotation,
            bpVotes: vot.toFixed(0),
            bpUnpaid: BPLIST.rows[i].unpaid_blocks
          });
        }
      }
    });

    //////////////////////////////////////////////////TEST TX

    //////////////////////////////////////////////////TEST TX FINE
  }

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  /*
  createBpTable = () => {
    let table = [];
    console.log("prova");
    for (var i = 0; i < this.state.bpTx.actions.lenght; i++) {
      let _tipo = this.state.bpTx.actions[i].action_trace.act.name;
      let _trxIDNext;
      if (i === 19) {
        _trxIDNext = this.state.bpTx.actions[i].action_trace.trx_id;
      } else {
        _trxIDNext = this.state.bpTx.actions[i + 1].action_trace.trx_id;
      }
      let _trxID = this.state.bpTx.actions[i].action_trace.trx_id;
      let _sender = this.state.bpTx.actions[i].action_trace.act.data.from;
      let _receiver = this.state.bpTx.actions[i].action_trace.act.data.to;
      let _memo = this.state.bpTx.actions[i].action_trace.act.data.memo;
      let _ammount = this.state.bpTx.actions[i].action_trace.act.data.quantity;
      if (_tipo === "claimrewards") {
      } else {
        if (_trxID === _trxIDNext) {
        } else {
          console.log(
            _trxID +
              " " +
              _tipo +
              " - " +
              _sender +
              " - " +
              _receiver +
              " - " +
              _memo +
              " - " +
              _ammount
          );
          ///////////////////////qui crea la tabella ok
          table.push(
            <TableRow>
              <TableCell>{_tipo}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell>{_ammount}</TableCell>
              <TableCell>{_memo}</TableCell>
            </TableRow>
          );
          ///////////////////////qui crea la tabella ok
        }
      }
    }
    this.setState({
      fetchingBP: true
    });
    return table;
  };
*/
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  aspetta = () => {
    console.log("aspettando 2 sec");
  };

  balance = value => {
    return parseFloat(value);
  };

  render() {
    return (
     <div>



          <div align="center">
            <img
              src="/images/htmlheadmail.png"
              align="center"
              alt="loading"
              style={{
                // marginLeft: '-10px',
                position: "relative",
                //flexGrow: 1,

                width: "50%"

                //margin: '0px',
                //borderRadius: 15
              }}
            />
          </div>

          <Grid container spacing={24} direction="row">
            <Grid item xs={6} sm={6}>
              <Paper
                style={{
                  ...style.Paper2,
                  topMargin: 10
                  //  height: 320
                }}
                elevation={10}
              >
                <Typography
                  component="p"
                  align="left"
                  style={{
                    color: "white",
                    topMargin: -10
                  }}
                >
                  EOS/USD: <strong> {this.state.eosPriceUSD}$</strong>
                  <br />
                  TLOS/EOS: <strong> {this.state.tlosEOS.toFixed(4)} </strong>
                  <br />
                  TLOS/USD:{" "}
                  <strong>
                    {" "}
                    {(this.state.eosPriceUSD * this.state.tlosEOS).toFixed(3)}$
                </strong>
                  <br />
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Paper
                style={{
                  ...style.Paper2,
                  topMargin: 10
                  //  height: 320
                }}
                elevation={10}
              >
                <Typography
                  component="p"
                  align="left"
                  style={{
                    color: "white",
                    topMargin: -10
                  }}
                >
                  EOS/USD: <strong> {this.state.eosPriceEUR}€</strong>
                  <br />
                  TLOS/EOS: <strong> {this.state.tlosEOS.toFixed(4)} </strong>
                  <br />
                  TLOS/USD:{" "}
                  <strong>
                    {" "}
                    {(this.state.tlosEOS * this.state.eosPriceEUR).toFixed(3)}€
                </strong>
                  <br />
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={24} direction="row">
            <Grid item xs={12} sm={4}>
              <Paper
                style={{
                  ...style.Paper,
                  topMargin: 10
                  //  height: 320
                }}
                elevation={10}
              >
                <Typography variant="caption">Account:</Typography>
                <Typography variant="h6">
                  {BPACCOUNTNAME.toUpperCase()}
                </Typography>
                <Typography component="p">
                  Liquid: <strong>{this.state.bpbalance}</strong>
                  <br />
                  Staked CPU: <strong>{this.state.bpcpu}</strong>
                  <br />
                  Staked BAN: <strong> {this.state.bpban}</strong>
                  <br />
                </Typography>
                <Typography variant="caption">
                  Unstake: <strong> {this.state.bpUnstake}</strong> TLOS
              </Typography>
                <hr
                  style={{
                    //     color: red,
                    //     backgroundColor: color,
                    height: 1
                  }}
                />
                <Typography variant="h6">
                  <strong>{this.state.totalbpbalance.toFixed(4)}</strong> Telos
              </Typography>
                <Typography variant="caption">
                  <strong>
                    {(
                      this.state.totalbpbalance *
                      this.state.tlosEOS *
                      this.state.eosPriceUSD
                    ).toFixed(2)}
                  </strong>{" "}
                  $ -{" "}
                  <strong>
                    {(
                      this.state.totalbpbalance *
                      this.state.tlosEOS *
                      this.state.eosPriceEUR
                    ).toFixed(2)}
                  </strong>{" "}
                  €
              </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                style={{
                  ...style.Paper,
                  //  height: 320
                  topMargin: 10
                }}
                elevation={10}
              >
                <Typography variant="caption">Account:</Typography>
                <Typography variant="h6">
                  {DIVACCOUNTNAME.toUpperCase()}
                </Typography>
                <Typography component="p">
                  Liquid: <strong> {this.state.divbalance}</strong>
                  <br />
                  Staked CPU: <strong> {this.state.divcpu}</strong>
                  <br />
                  Staked BAN: <strong>{this.state.divban}</strong>
                  <br />
                </Typography>
                <Typography variant="caption">
                  Unstake: <strong> {this.state.divUnstake}</strong> TLOS
              </Typography>
                <hr
                  style={{
                    //     color: red,
                    //     backgroundColor: color,
                    height: 1
                  }}
                />
                <Typography variant="h6">
                  <strong>{this.state.totaldivbalance.toFixed(4)}</strong> Telos
              </Typography>
                <Typography variant="caption">
                  <strong>
                    {(
                      this.state.totaldivbalance *
                      this.state.tlosEOS *
                      this.state.eosPriceUSD
                    ).toFixed(2)}
                  </strong>{" "}
                  $ - {" "}
                  <strong>
                    {(
                      this.state.totaldivbalance *
                      this.state.tlosEOS *
                      this.state.eosPriceEUR
                    ).toFixed(2)}
                  </strong>{" "}
                  €
              </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                style={{
                  ...style.Paper,
                  //  height: 320
                  topMargin: 10
                }}
                elevation={10}
              >
                <Typography variant="caption">Account:</Typography>
                <Typography variant="h6">
                  {PROACCOUNTNAME.toUpperCase()}
                </Typography>
                <Typography component="p">
                  Liquid: <strong> {this.state.probalance}</strong>
                  <br />
                  Staked CPU: <strong>{this.state.procpu}</strong>
                  <br />
                  Staked BAN: <strong>{this.state.proban}</strong>
                  <br />
                </Typography>
                <Typography variant="caption">
                  Unstake: <strong> {this.state.proUnstake}</strong> TLOS
              </Typography>
                <hr
                  style={{
                    //     color: red,
                    //     backgroundColor: color,
                    height: 1
                  }}
                />
                <Typography variant="h6">
                  <strong>{this.state.totalprobalance.toFixed(4)}</strong> Telos
              </Typography>
                <Typography variant="caption">
                  <strong>
                    {(
                      this.state.totalprobalance *
                      this.state.tlosEOS *
                      this.state.eosPriceUSD
                    ).toFixed(2)}
                  </strong>{" "}
                  $ -{" "}
                  <strong>
                    {(
                      this.state.totalprobalance *
                      this.state.tlosEOS *
                      this.state.eosPriceEUR
                    ).toFixed(2)}
                  </strong>{" "}
                  €
              </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={24} direction="row">
            <Grid item xs={12} sm={6}>
              <Paper
                style={{
                  ...style.Paper3,
                  topMargin: 10
                  //  height: 320
                }}
                elevation={10}
              >
                <Typography variant="h6">
                  <strong>Block Producer Stats</strong>
                </Typography>
                <hr style={{ height: 1 }} />

                <Typography
                  component="p"
                  align="center"
                  style={{
                    color: "black",
                    topMargin: -10
                  }}
                >
                  Lifetime Produced Block:{" "}
                  <strong> {this.state.bpBlockProduced} </strong>
                  <br />
                  Missed Block per Rotation:{" "}
                  <strong> {this.state.bpMissedBlockRotation} </strong>
                  <br />
                  Lifetime Missed Block:{" "}
                  <strong> {this.state.bpMissedBlock} </strong>
                  <br />
                  Votes: <strong> {this.state.bpVotes} </strong>
                  <br />
                  Position: <strong> {this.state.bpPosition}° </strong>
                  <br />
                  Unpaid Block: <strong> {this.state.bpUnpaid} </strong>
                  <br />
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper
                style={{
                  ...style.Paper3,
                  topMargin: 10
                  //  height: 320
                }}
                elevation={10}
              >
                <Typography variant="body1">
                  <strong>Dividendi</strong>
                </Typography>
                <Typography variant="caption">
                  I dividendi sono calcolati sul totale diviso 7
              </Typography>
                <hr style={{ height: 1 }} />
                <Typography variant="caption">
                  Dividendi del wallet IMPERADIVIDS
              </Typography>
                <Typography
                  component="p"
                  align="center"
                  style={{
                    color: "black",
                    topMargin: -10
                  }}
                >
                  TELOS:{" "}
                  <strong> {(this.state.totaldivbalance / 7).toFixed(4)} </strong>
                  <br />
                </Typography>
                <Typography variant="caption">
                  USD:{" "}
                  {(
                    (this.state.totaldivbalance / 7).toFixed(4) *
                    this.state.tlosEOS *
                    this.state.eosPriceUSD
                  ).toFixed(2)}
                  $ - EUR:{" "}
                  {(
                    (this.state.totaldivbalance / 7).toFixed(4) *
                    this.state.tlosEOS *
                    this.state.eosPriceEUR
                  ).toFixed(2)}
                  €
              </Typography>
                <hr style={{ height: 1 }} />
                <Typography variant="caption">
                  Dividendi su calcolo Totale esclusa la riserva per progetti
              </Typography>
                <Typography
                  component="p"
                  align="center"
                  style={{
                    color: "black",
                    topMargin: -10
                  }}
                >
                  TELOS:{" "}
                  <strong>
                    {" "}
                    {(
                      (this.state.totaldivbalance + this.state.totalbpbalance) /
                      7
                    ).toFixed(4)}{" "}
                  </strong>
                  <br />
                </Typography>
                <Typography variant="caption">
                  USD:{" "}
                  {(
                    (
                      (this.state.totaldivbalance + this.state.totalbpbalance) /
                      7
                    ).toFixed(4) *
                    this.state.tlosEOS *
                    this.state.eosPriceUSD
                  ).toFixed(2)}
                  $ - EUR:{" "}
                  {(
                    (
                      (this.state.totaldivbalance + this.state.totalbpbalance) /
                      7
                    ).toFixed(4) *
                    this.state.tlosEOS *
                    this.state.eosPriceEUR
                  ).toFixed(2)}
                  €
              </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={24} direction="row">
            <Grid item xs={12} sm={12}>
              <Paper
                style={{
                  ...style.Paper2,
                  topMargin: 10
                  //  height: 320
                }}
                elevation={10}
              >
                <Typography
                  variant="headline"
                  variant="caption"
                  style={{
                    color: "white",
                    topMargin: -10
                  }}
                >
                  Capitalizzazione Totale
              </Typography>
                <Typography
                  component="p"
                  align="left"
                  style={{
                    color: "white",
                    topMargin: -10
                  }}
                >
                  USD:{" "}
                  <strong>
                    {" "}
                    {(
                      this.state.eosPriceUSD *
                      this.state.tlosEOS *
                      (this.state.totalbpbalance +
                        this.state.totaldivbalance +
                        this.state.totalprobalance)
                    ).toFixed(2)}{" "}
                  </strong>
                  $<br />
                  EUR:{" "}
                  <strong>
                    {" "}
                    {(
                      this.state.eosPriceEUR *
                      this.state.tlosEOS *
                      (this.state.totalbpbalance +
                        this.state.totaldivbalance +
                        this.state.totalprobalance)
                    ).toFixed(2)}{" "}
                  </strong>
                  €<br />
                  TLOS:{" "}
                  <strong>
                    {" "}
                    {(
                      this.state.totalbpbalance +
                      this.state.totaldivbalance +
                      this.state.totalprobalance
                    ).toFixed(4)}{" "}
                  </strong>
                  <br />
                  EOS:{" "}
                  <strong>
                    {" "}
                    {(
                      (this.state.totalbpbalance +
                        this.state.totaldivbalance +
                        this.state.totalprobalance) *
                      this.state.tlosEOS
                    ).toFixed(4)}{" "}
                  </strong>
                  <br />
                  BTC:{" "}
                  <strong>
                    {" "}
                    {(
                      (this.state.totalbpbalance +
                        this.state.totaldivbalance +
                        this.state.totalprobalance) *
                      (this.state.tlosEOS * this.state.eosPriceBTC)
                    ).toFixed(10)}{" "}
                  </strong>
                  <br />
                  ETH:{" "}
                  <strong>
                    {" "}
                    {(
                      (this.state.totalbpbalance +
                        this.state.totaldivbalance +
                        this.state.totalprobalance) *
                      (this.state.tlosEOS * this.state.eosPriceETH)
                    ).toFixed(10)}{" "}
                  </strong>
                  <br />
                </Typography>
              </Paper>
            </Grid>
          </Grid>


          <Typography
            variant="headline"
            variant="caption"
            align="center"
            style={{
              color: "black",
              padding: 10
            }}
          >
            I prezzi di EOS/USD - BTC/USD - ETH/USD provengono da Cryptocompare
          <br />
            Il prezzo di TLOS/EOS proviene da Chainrift <br />
            <br />
            Version 1.11 -{" "}
            <a
              href="https://github.com/tarabaz/EOSIMPERA-traker"
              rel="noopener noreferrer"
              target="_blank"
            >
              <strong>Github</strong>
            </a>
          </Typography>



          </div>
    );
  }
}
export default App;



import Eos from "eosjs";


const config = {
  chainId: "4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11",
  // chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  //keyProvider: [wif],
  httpEndpoint: "https://telos.eos.barcelona",
  // httpEndpoint: 'http://jungle.cryptolions.io:18888',
  // TODO: changeable https://api.eosnewyork.io https://nodes.get-scatter.com https://api1.eosasia.one
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};


const eos = Eos(config);


export function CheckAccount(account) :Promise<any> {
  
  return new Promise ((resolve:any) => {

    eos.getAccount(account).then(AccInfo => {
      console.log(AccInfo)

    })
      .catch(error => {
        console.error(error);
      });
  })
}
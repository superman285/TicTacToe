import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameCost: "0.1ETH",
    activePlayer: "HostPlayer's Turn",

    contractABI: [
      {
        "constant": false,
        "inputs": [
          {
            "name": "row",
            "type": "uint8"
          },
          {
            "name": "column",
            "type": "uint8"
          }
        ],
        "name": "setChess",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getBonuspool",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "gameResult",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "activePlayer",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "hostPlayer",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "restartGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "victorPlayer",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "gameCost",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "joinGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getWholeBoard",
        "outputs": [
          {
            "name": "",
            "type": "string[3][3]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "guestPlayer",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "playerAddr",
            "type": "address"
          }
        ],
        "name": "PlayerJoined",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "playerAddr",
            "type": "address"
          }
        ],
        "name": "ActivePlayer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "gameResult",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "victor",
            "type": "address"
          }
        ],
        "name": "GameFinished",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "receiver",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "VictoryAward",
        "type": "event"
      }
    ],

    contractAddr: "0xb5bb50470b06db8e0edc8846effa5f670c93901a",
  },
  mutations: {},
  actions: {
    async canChess(){
      let contractObj = new web3.eth.Contract(this.state.contractABI,this.state.contractAddr);

      //let contractObj = web3.eth.contract(this.state.contractABI).at(this.state.contractAddr);


      console.log('obj',contractObj);
      let board = await contractObj.methods.getWholeBoard.call();

      //let board = contractObj.hostPlayer();
      console.log(board);

      /*contractObj.gameResult(function(err,result){
        console.log('bienall');
        console.log(err);
        console.log(String(result));

      })*/
      //console.log(board);
    }
  }
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameCost: "0.1ETH",
    activePlayer: "HostPlayer's Turn",
    web3: {},
    contractABI: [
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
        "type": "function",
        "signature": "0x7152f800"
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
        "type": "function",
        "signature": "0x7fdffd23"
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
        "type": "function",
        "signature": "0x8039ed53"
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
        "type": "function",
        "signature": "0xb6ff6a52"
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
        "type": "function",
        "signature": "0xcab896dc"
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
        "type": "function",
        "signature": "0xdfeada94"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "creatorAddr",
            "type": "address"
          }
        ],
        "name": "GameCreated",
        "type": "event",
        "signature": "0x4f0d1d413a983b9df8ab6ab954635b186a1e9a09ee6dc1b43263ddbf48412267"
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
        "type": "event",
        "signature": "0x31e760aa525306aba638a784082a013b6a1cc0a9a1789f3f22281c0453b10b1f"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "activePlayerAddr",
            "type": "address"
          }
        ],
        "name": "ActivePlayer",
        "type": "event",
        "signature": "0x95975a5cac9ad4b5953c1419a5f954acbb5ca210ae91a6f3e365cdd108e81740"
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
        "type": "event",
        "signature": "0x8faeeac76a6e18b7d45e0ec2ae51d949cc784f877b0c55bbc21157f141d61cc8"
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
        "type": "event",
        "signature": "0x6ae495f483891de86c9e2a648b5510f7db2f2dfc77617fedffb8de30765735cb"
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
        "type": "function",
        "signature": "0xd59d31ac"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "createGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0x7255d729"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "joinGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0xd4f77b1c"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "restartGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0x8d25af04"
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
        "type": "function",
        "signature": "0x6cc1e88e"
      },
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
        "type": "function",
        "signature": "0x5aff77a0"
      }
    ],
    //ganache privateNet deploy with truffle
    contractAddr: "0x2de5BDCbae3dcbB3dc12eA95A3357B9395A1551a",
    //rinkeby deploy with remix
    //contractAddr: "0xd9c1a3461f27a6a4cd255965024b343f3b72b214",
    //rinkeby deploy with truffle
    //contractAddr: "0xb0dcae7b8Cf389cD7020677a8B56B9351010991e",

    //can use
    //currentAccount: window.ethereum.selectedAddress

    hostPlayer: "",
    guestPlayer: ""
  },
  getters:{
    currentAccount: state=>{
      return window.ethereum.selectedAddress;
    }
  },
  mutations: {
    setHostPlayer(state,payload){
      state.hostPlayer = payload;
      console.log('host',state.hostPlayer);
    },
    setGuestPlayer(state,payload){
      this.state.guestPlayer = payload;
      console.log('guest',this.state.guestPlayer);
    },
  },
  actions: {
    getContractObj(){
      let web3 = this.state.web3;
      //web3 0.20.x old
      //let contractObj = web3.eth.contract(this.state.contractABI).at(this.state.contractAddr);
      let contractObj = new web3.eth.Contract(this.state.contractABI,this.state.contractAddr);
      console.log('get合约实例',contractObj);
      return contractObj;
    },
    async getWholeBoard(store){
      console.log('this means store',this);
      console.log('compare store.state==this.state',this.state==store.state);
      let contractObj = await store.dispatch('getContractObj');

      let currentAccount = await web3.eth.getAccounts();
      console.log('当前用户',currentAccount[0],window.ethereum.selectedAddress);

      let wholeboard = await contractObj.methods.getWholeBoard.call();
      console.log(wholeboard);
      return wholeboard;
    },
    async getBonuspool(store){
      let contractObj = await store.dispatch('getContractObj');
      let bonuspool = await contractObj.methods.getBonuspool.call();
      let fixedbonuspool = (bonuspool/(10 ** 18)).toFixed(2);
      console.log(bonuspool);
      console.log(fixedbonuspool);
      return fixedbonuspool;
    },
    async createGame(store,payload_creator){
      let contractObj = await store.dispatch('getContractObj');
      let createRes = await contractObj.methods.createGame.send({
        from: payload_creator,
        value: store.state.web3.utils.toWei("0.1", "ether"),
      });
      store.commit('setHostPlayer',payload_creator);
      return createRes;
    },
    //vue前端判断下参数 与 creator不同 再来调用方法
    async joinGame(store,payload_joiner){
      let contractObj = await store.dispatch('getContractObj');
      let joinRes = await contractObj.methods.createGame.send({
        from: payload_joiner,
        value: store.state.web3.utils.toWei("0.1", "ether"),
      });
      store.commit('setGuestPlayer',payload_joiner);
      return joinRes;
    },
    //第一次调用下，之后直接前端处理吧，就是轮流换而已
    async getActivePlayer(store){
      let contractObj = await store.dispatch('getContractObj');
      let activePlayer = await contractObj.methods.activePlayer.call();
      return activePlayer;
    },

    //前端判断下调用者 是hostPlayer再调 合约做二次判断更保险
    async restartGame(store,payload_restarter){
      let contractObj = await store.dispatch('getContractObj');
      let restartRes = await contractObj.methods.restartGame.send({
        from: payload_restarter,
        value: store.state.web3.utils.toWei("0.1", "ether"),
      });
      return restartRes;
    },

    //前端记录下 有棋子的位置



  }
});

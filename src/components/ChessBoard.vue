<template>
  <div class="board">
    <div class="column" v-for="column in size" >
      <div class="row" v-for="row in size" >
        <div class="piece" :data-pos="`${row - 1}-${column - 1}`" @click="setChess($event)">
          <span class="icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "ChessBoard",
  props: {
    size: {
      type: Number,
      default: 3
    }
  },
  data: () => ({

  }),
  methods:{
     async setChess(ev,chess){
      console.dir(ev.target);
      chess="o"
      let target = ev.target;
      if (target.tagName=="DIV") {
        target.classList.add(chess,'animated','flash');
      }
      /*setTimeout(() => {
        target.classList.remove('animated', 'pulse')
      }, 2000);*/

      let row = target.dataset.pos.substr(0,1),
          column = target.dataset.pos.substr(2,1);

      console.log(row,column);

      console.log(this.$store.state.web3);

      let contractABI = [
          {
            "constant": true,
            "inputs": [],
            "name": "chessboardSize",
            "outputs": [
              {
                "name": "",
                "type": "uint8"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x198c7023"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "name": "movesCount",
            "outputs": [
              {
                "name": "",
                "type": "uint8"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x41312312"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "name": "playerChess",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x6690fcf3"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "gameRunning",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x6e8c2caf"
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
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "uint256"
              },
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "chessboard",
            "outputs": [
              {
                "name": "",
                "type": "string"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0xf2a5c7e8"
          },
          {
            "inputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor",
            "signature": "constructor"
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
        ];
      let contractAddr = "0xA0Fb88B74B604b0e7328439DdC213DFFe3365BFC";

      /*//let contractObj = new web3.eth.Contract(contractABI,contractAddr);
      let contractObj = web3.contract(contractABI);
      console.log(contractObj);

      let canChess = await contractObj.getWholeBoard().call();
      console.log(canChess);

      console.log(contractObj);*/

      let gameboard = await this.$store.dispatch('canChess');
       console.log('gameboard',gameboard);

    }
  }
};
</script>

<style scoped lang="scss">


  :root {
  --bg-color: hsl(50, 100%, 75%);
  --cell-border-radius: 15%;
  --border-radius: 15%;
  --convex-radius: 0.5em;
  --x-bg-color: hsl(10, 100%, 50%);
  --o-bg-color: hsl(110, 100%, 50%);
    user-select:none;
}

.board {
  margin-top: 1rem;
  display: flex;
  background-color: hsl(200, 100%, 75%);
  border-radius: 4%;
  padding: 1em;
  box-shadow: inset -0.25em -0.25em 0.5em hsl(190, 100%, 15%),
    inset 0.25em 0.25em 0.5em hsl(190, 100%, 100%), 0 0.5em 5em black;
}
.column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 100%;
}
.row {
  display: flex;
  flex-grow: 1;
  flex-basis: 100%;
  border: 0.3em solid hsl(200, 100%, 75%);
  border-radius: 15%;

}
.piece {
  flex-grow: 1;
  border-radius: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0.5em 0.5em 0.5em hsla(200, 100%, 35%, 0.4),
    inset -0.5em -0.5em 0.5em hsla(200, 100%, 55%, 0.4);
  background: hsl(200, 100%, 75%);
  //animation: bounceIn 0.5s;
  color: white;
}

.o {
  box-shadow:inset 0.5em 0.5em 0.5em rgba(255, 255, 255, 0.5), inset -0.5em -0.5em 0.5em rgba(0, 0, 0, 0.35), 0 0 0.3em hsl(40, 100%, 25%);
  background: hsl(110, 100%, 50%) linear-gradient(-45deg, hsl(110, 100%, 50%) 50%, rgba(255, 255, 255, 0.6));
}
.o>.icon::after {
  content: '\0E836';
}

.x {
  box-shadow:inset 0.5em 0.5em 0.5em rgba(255, 255, 255, 0.5), inset -0.5em -0.5em 0.5em rgba(0, 0, 0, 0.35), 0 0 0.3em hsl(40, 100%, 25%);
  background:hsl(10, 100%, 50%) linear-gradient(-45deg, hsl(10, 100%, 50%) 50%, rgba(255, 255, 255, 0.6));
}
.x>.icon::after {
  content: '\0E5CD';
}
.icon {
  display: inline-block;
  text-align: center;
  font-family: 'icons';
  font-size: 3.2em;
  font-weight: bold;
  text-shadow: 0 0 0.4rem white;
}
</style>

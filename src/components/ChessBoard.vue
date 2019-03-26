<template>
  <div class="board">
    <div class="column" v-for="column in size">
      <div class="row" v-for="row in size">
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
    data: () => (
      {}),
    methods: {
      async setChess(ev, chess) {
        console.dir(ev.target);
        chess = "o"
        let target = ev.target;
        if (target.tagName == "DIV") {
          target.classList.add(chess, 'animated', 'flash');
        }
        /*setTimeout(() => {
          target.classList.remove('animated', 'pulse')
        }, 2000);*/

        let row = target.dataset.pos.substr(0, 1),
          column = target.dataset.pos.substr(2, 1);

        console.log(row, column);

        console.log(this.$store.state.web3);

        let contractObj = this.$store.getContractInstance;
        console.log('vue中拿obj', contractObj);

        let chessboard = await this.$store.dispatch('getWholeBoard');
        console.log('gameboard', chessboard);

        console.log('当前user从vue', this.$store.getters.currentAccount);

        let payload_creator = this.$store.getters.currentAccount;
        let createRes = await this.$store.dispatch('createGame',payload_creator);
        console.log('createGRes',createRes);

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
    user-select: none;
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
    box-shadow: inset 0.5em 0.5em 0.5em rgba(255, 255, 255, 0.5), inset -0.5em -0.5em 0.5em rgba(0, 0, 0, 0.35), 0 0 0.3em hsl(40, 100%, 25%);
    background: hsl(110, 100%, 50%) linear-gradient(-45deg, hsl(110, 100%, 50%) 50%, rgba(255, 255, 255, 0.6));
  }

  .o > .icon::after {
    content: '\0E836';
  }

  .x {
    box-shadow: inset 0.5em 0.5em 0.5em rgba(255, 255, 255, 0.5), inset -0.5em -0.5em 0.5em rgba(0, 0, 0, 0.35), 0 0 0.3em hsl(40, 100%, 25%);
    background: hsl(10, 100%, 50%) linear-gradient(-45deg, hsl(10, 100%, 50%) 50%, rgba(255, 255, 255, 0.6));
  }

  .x > .icon::after {
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

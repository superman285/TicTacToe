<template>
  <div id="app">
    <h1>Tic-Tac-Toe</h1>
    <i class="gameRules"></i>

    <section>
      <button class="createGame btnStyle" @click="createGame">CreateGame</button>
      <button class="joinGame btnStyle" @click="joinGame">JoinGame</button>
    </section>
    <section>
      <label class="gameCost">GameCost: {{ $store.state.gameCost }}</label>

      <!--奖池 tooltip 赢了的拿走-->
      <label class="bonuspool" @click="showbonuspool">💰</label>
      <p v-if="showpool">{{bonuspool}}</p>

    </section>
    <!--加tooltip显示地址-->
    <label class="actPlayer">
      {{$store.getters.activeTurn}}
      <br>
      {{$store.state.activePlayer}}
    </label>

    <Chess-board></Chess-board>

    <button class="restart btnStyle" @click="restartGame">Restart</button>
  </div>
</template>

<script>
import ChessBoard from "./components/ChessBoard";

export default {
  name: "app",
  components: {
    ChessBoard
  },
  mounted: function() {
    //绑web3报错https://cn.vuejs.org/v2/api/#data
    //vue和web3的冲突
    // 以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些属性。
    this.$store.state.web3 = window.web3;
    console.log("aftermounted", window.web3 == this.$store.state.web3);
  },
  data: () => ({
      showpool: false,
      bonuspool: 1
  }),
  computed: {

  },
  methods: {
    async showbonuspool(){
      console.log('click showbonus');
      this.bonuspool = await this.$store.dispatch("getBonuspool");
      this.showpool = true;
    },
    async getWholeBoard() {
      let wholeBoard = await this.$store.dispatch("getWholeBoard");
      console.log("wholeboard", wholeBoard);
    },
    async getBonuspool() {
      let bonuspool = await this.$store.dispatch("getBonuspool");
      console.log("bonuspool", bonuspool);
    },
    async getGameCost() {
      let gameCost = await this.$store.dispatch('getGameCost');
      console.log('gameCost',gameCost);
    },
    async getActivePlayer() {
      let activePlayer = await this.$store.dispatch("getActivePlayer");
      console.log('activePlayer',activePlayer);
    },
    async createGame() {
      let creator = this.$store.getters.currentAccount;
      console.log("creator", creator);
      let createRes = await this.$store.dispatch("createGame");
      console.log("createRes", createRes);
    },
    async joinGame() {
      let joiner = this.$store.getters.currentAccount;
      console.log("joiner", joiner);
      let joinRes = await this.$store.dispatch("joinGame", joiner);
      console.log("joinRes", joinRes);
      console.log('activePlayer',joinRes.events.ActivePlayer.returnValues.activePlayerAddr,this.$store.state.activePlayer);
    },

    async restartGame() {
      let restarter = this.$store.getters.currentAccount;
      console.log("restarter", restarter);
      let restartRes = await this.$store.dispatch("restartGame", restarter);
    },


  }
};
</script>

<style lang="scss">
@import "./assets/global.css";

:root {
  --back-color-light: hsl(50, 80%, 55%);
  --back-color-dark: hsl(50, 80%, 40%);
  --text-color: hsl(240, 100%, 72%);
  --text-border-color: hsl(100, 100%, 100%, 0.3);
  --text-font-family: sans-serif;
  --header-font-family: Modak, "Baloo Bhaina", sans-serif;
  --board-size: 18rem;
}

body {
  margin: 0;
  color: #2c3e50;
  background-attachment: fixed;
  background-color: var(--back-color-dark);
  background-position: center;
  background-size: auto, 1.5rem 1.5rem, 1.5rem 1.5rem;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0) 70%
    ),
    repeating-linear-gradient(
      45deg,
      rgba(79, 48, 232, 0.5),
      rgba(79, 48, 232, 0.5) 25%,
      rgba(48, 20, 184, 0.5) 25%,
      rgba(48, 20, 184, 0.5) 50%,
      rgba(48, 20, 184, 0.5) 50%
    ),
    repeating-linear-gradient(
      -45deg,
      var(--back-color-light),
      var(--back-color-light) 25%,
      var(--back-color-dark) 25%,
      var(--back-color-dark) 50%,
      var(--back-color-dark) 50%
    );
  //overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

h1 {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;
  color: var(--text-color);
  padding: 1rem;
  padding-bottom: 0.5rem;
  font-weight: 100;
  font-size: 3rem;
  font-family: var(--header-font-family);
  white-space: nowrap;
  text-shadow: 2px 2px 4px var(--text-border-color),
    -2px 2px 4px var(--text-border-color), 2px -2px 4px var(--text-border-color),
    -2px -2px 4px var(--text-border-color), 0 0.5rem 1.5rem black;
}

.board {
  height: var(--board-size);
  width: var(--board-size);
}

section {
  margin-top: 0.5rem;
}

.btnStyle {
  outline: none;
  padding: 0.3em 0.5em;
  border: 1px solid hsl(50, 100%, 75%);
  background: transparent;
  color: hsl(50, 100%, 75%);
  border-radius: 6px;
  cursor: pointer !important;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.5rem;
  &:hover {
    color: #715d77;
    background: hsl(50, 100%, 75%);
  }
}
.actPlayer,
.gameCost {
  padding: 0.3em 0.5em;
  border: 1px solid hsl(50, 100%, 75%);
  background: transparent;
  color: hsl(50, 100%, 75%);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.5rem;
  &:hover {
    color: #715d77;
    background: hsl(50, 100%, 75%);
  }
}

.gameRules {
  position: absolute;
}
</style>

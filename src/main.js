import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//const Web3 = require('web3');
import Web3 from "web3";

Vue.config.productionTip = false;

window.addEventListener("load", function() {
  //var web3ss;
  console.log("newweb3", Web3);
  window.Web3 = Web3;
  //老版狐狸web3套上最新版Web3的外壳 变成了新狐狸web3
  if (window.ethereum) {
    // use MetaMask's provider
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    alert("No web3 detected. Please go to download the metamask");
    window.location.href = "https://metamask.io/";
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7777")
    );
  }

var vm = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
  window.vm = vm;
});

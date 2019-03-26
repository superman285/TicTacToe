let TicTacToe = artifacts.require("TicTacToe");

contract("TicTacToe", accounts => {
  it("chessboard should be empty at the start", async () => {
    let instance = await TicTacToe.new();
    console.log('合约实例:\n', instance);
    let createRes = await instance.createGame({from: accounts[0], value: web3.utils.toWei("0.1", "ether")});
    console.log('创建游戏res:\n', createRes);
    assert.equal(createRes.logs[0].event, "GameCreated", "The game must be created successfully！");
    let chessboard = await instance.getWholeBoard.call();
    console.log('游戏棋盘:\n', chessboard);
    assert.equal(chessboard[0][0], "", "The first position must be empty!");
    console.log('test success!');
  })
});
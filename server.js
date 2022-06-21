const fs = require(`fs`);
const http = require(`http`);
const WebSocket = require(`ws`); // npm i ws

const board = [
  [
    "card back",
    "card rank-2 spades",
    "card rank-3 spades",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-10 diams",
    "card rank-q diams",
    "card rank-k diams",
    "card rank-a diams",
    "card back",
  ],

  [
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-3 clubs",
    "card rank-2 clubs",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-6 spades",
    "card rank-7 spades",
    "card rank-a clubs",
  ],

  [
    "card rank-7 clubs",
    "card rank-a spades",
    "card rank-2 diams",
    "card rank-3 diams",
    "card rank-4 diams",
    "card rank-k clubs",
    "card rank-q clubs",
    "card rank-10 clubs",
    "card rank-8 spades",
    "card rank-k clubs",
  ],

  [
    "card rank-8 clubs",
    "card rank-k spades",
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-9 hearts",
    "card rank-8 hearts",
    "card rank-9 clubs",
    "card rank-9 spades",
    "card rank-6 spades",
  ],

  [
    "card rank-9 clubs",
    "card rank-q spades",
    "card rank-7 clubs",
    "card rank-6 hearts",
    "card rank-5 hearts",
    "card rank-2 hearts",
    "card rank-7 hearts",
    "card rank-8 clubs",
    "card rank-10 spades",
    "card rank-10 clubs",
  ],

  [
    "card rank-a spades",
    "card rank-7 hearts",
    "card rank-9 diams",
    "card rank-a hearts",
    "card rank-4 hearts",
    "card rank-3 hearts",
    "card rank-k hearts",
    "card rank-10 diams",
    "card rank-6 hearts",
    "card rank-2 diams",
  ],

  [
    "card rank-k spades",
    "card rank-8 hearts",
    "card rank-8 diams",
    "card rank-2 clubs",
    "card rank-3 clubs",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-q diams",
    "card rank-5 hearts",
    "card rank-3 diams",
  ],

  [
    "card rank-q spades",
    "card rank-9 hearts",
    "card rank-7 diams",
    "card rank-6 diams",
    "card rank-5 diams",
    "card rank-a clubs",
    "card rank-a diams",
    "card rank-k diams",
    "card rank-4 hearts",
    "card rank-4 diams",
  ],

  [
    "card rank-10 spades",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-k hearts",
    "card rank-a hearts",
    "card rank-3 spades",
    "card rank-2 spades",
    "card rank-2 hearts",
    "card rank-3 hearts",
    "card rank-5 diams",
  ],

  [
    "card back",
    "card rank-9 spades",
    "card rank-8 spades",
    "card rank-7 spades",
    "card rank-6 spades",
    "card rank-9 diams",
    "card rank-8 diams",
    "card rank-7 diams",
    "card rank-6 diams",
    "card back",
  ],
];

//horizantal
// const positionBoard = [
//   ["-", "green", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "green", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "green", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "green", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
// ];

// //vertical
// const positionBoard = [
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["green", "green", "green", "green", "green", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
// ];

// const positionBoard = [
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
//   ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
// ];

const deck = [
  "card rank-a spades",
  "card rank-2 spades",
  "card rank-3 spades",
  "card rank-4 spades",
  "card rank-5 spades",
  "card rank-6 spades",
  "card rank-7 spades",
  "card rank-8 spades",
  "card rank-9 spades",
  "card rank-10 spades",
  "card rank-j spades",
  "card rank-q spades",
  "card rank-k spades",
  "card rank-a clubs",
  "card rank-2 clubs",
  "card rank-3 clubs",
  "card rank-4 clubs",
  "card rank-5 clubs",
  "card rank-6 clubs",
  "card rank-7 clubs",
  "card rank-8 clubs",
  "card rank-9 clubs",
  "card rank-10 clubs",
  "card rank-j clubs",
  "card rank-q clubs",
  "card rank-k clubs",
  "card rank-a diams",
  "card rank-2 diams",
  "card rank-3 diams",
  "card rank-4 diams",
  "card rank-5 diams",
  "card rank-6 diams",
  "card rank-7 diams",
  "card rank-8 diams",
  "card rank-9 diams",
  "card rank-10 diams",
  "card rank-j diams",
  "card rank-q diams",
  "card rank-k diams",
  "card rank-a hearts",
  "card rank-2 hearts",
  "card rank-3 hearts",
  "card rank-4 hearts",
  "card rank-5 hearts",
  "card rank-6 hearts",
  "card rank-7 hearts",
  "card rank-8 hearts",
  "card rank-9 hearts",
  "card rank-10 hearts",
  "card rank-j hearts",
  "card rank-q hearts",
  "card rank-k hearts",
];

const divideDeckIntoPieces = (deck) => {
  let shuffled = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const result = new Array(Math.ceil(shuffled.length / 6))
    .fill()
    .map((_) => shuffled.splice(0, 6));
  console.log(result);
  return result;
};



// code to read file
const readFile = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, `utf-8`, (readErr, fileContents) => {
      if (readErr) {
        reject(readErr);
      } else {
        resolve(fileContents);
      }
    });
  });

// code to create a server
const server = http.createServer(async (req, resp) => {
  console.log(`browser asked for ${req.url}`);
  if (req.url == `/mydoc`) {
    const clientHtml = await readFile(`client.html`);
    resp.end(clientHtml);
  } else if (req.url == `/myjs`) {
    const clientJs = await readFile(`client.js`);
    resp.end(clientJs);
  } else if (req.url == `/sequence.css`) {
    const sequenceCss = await readFile(`sequence.css`);
    resp.end(sequenceCss);
  } else {
    resp.end(`not found`);
  }
});

// to listen for clients
server.listen(8000);
console.log(`Server is listening at port 8000`)


const colors = [`green`, `blue`, `green`, `blue`];
const players = ["Player-1", "Player-2", "Player-3" , "Player-4"];
let playersJoined = 0;
let playerTurn = 0
let reSend = 0
let cardSets = divideDeckIntoPieces(deck)
let gameOver = false

// creating a web socket
const wss = new WebSocket.Server({ port: 8080 });


wss.on("connection", (ws) => {
  console.log(`Connection established: ${playersJoined}`)

  // waiting message to wait for all the players
  const msg1 = {
    type: "wait",
    message: "waiting for other players to join in",
    color: colors[playersJoined],
    name : players[playersJoined]
  }

  ws.send(JSON.stringify(msg1));
  playersJoined = playersJoined+1;

  if(wss.clients.size == 4) {

    let cardIndex = 0
    wss.clients.forEach((client) => {
      const msg2 = {
        type: "newboard",
        board: board,
        positionBoard: positionBoard,
        set: cardSets[cardIndex],
        message : `${players[playerTurn]} Turn`,
        turn: players[playerTurn]
      }
      client.send(JSON.stringify(msg2));
      cardIndex+=1
    })
  }


  ws.on("message", (msg) => {
    data = JSON.parse(msg)
    console.log("Data:", data)

    if(!gameOver) {
      positionBoard[data.rowId][data.colId] = data.color
    }
    else {
      const over = {
        type: "gameOver",
        message: "Game is Over!"
      }

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(over));
      })

      return
    }

    if(checkWinCondition(data.rowId, data.colId, data.color)) {
      gameOver = true
      let winner = ""
      if(data.color == "green") {
        winner = `${players[0]} and ${players[2]} (Team-1) has won the match `
      }
      else {
        winner = `${players[1]} and ${players[3]} (Team-2) has won the match `
      }

      let winMsg = {
        type: "won",
        positionBoard: positionBoard,
        message: winner
      }
      
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(winMsg));
      })

      return
    }
    
    // console.log(positionBoard)

    playerTurn+=1
    reSend+=1
    if (playerTurn >=4) {
      playerTurn = playerTurn%4
    }

    if(reSend == 24) {
      let temp = 4
      wss.clients.forEach((client) => {
        const newMsg = {
          type: "newCards",
          positionBoard: positionBoard,
          message : `${players[playerTurn]} Turn`,
          turn: players[playerTurn],
          set: cardSets[temp]
        }

        client.send(JSON.stringify(newMsg));
        temp+=1
      })
    }
    else if(reSend >=48) { //48
      gameOver = true
      let drawMsg = {
        type: "draw",
        positionBoard: positionBoard,
        message: "It's a DRAW!!"
      } 

      wss.clients.forEach((client) => {
        client.send(JSON.stringify(drawMsg));
      })
    }
    else {
      const msg3 = {
        type: "newPositonBoard",
        positionBoard: positionBoard,
        message : `${players[playerTurn]} Turn`,
        turn: players[playerTurn]
      }
  
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(msg3));
      })
    }


  })
});

const checkWinCondition = (row, col, color) => {
  let flag1 = checkVertical(col, color) // col will remain same
  let flag2 = checkHorizontal(row, color) // row will remain same

  return (flag1 || flag2)
}

function allAreEqual(array, color) {
  const result = array.every(element => {
      if (element === color) {
          return true;
      } else {
          return false
      }
  });

  return result
}


const checkVertical = (col, color) => {
  var checkArray = []
  let count = 5
  let win = false

  for (let i = 0; i < 6; i++) {
      for (let k = i; k < count; k++) {
          checkArray.push(positionBoard[k][col])
      }
      console.log(i, ":", checkArray)
      count+=1

      if(allAreEqual(checkArray, color)) {
      win = true
      return win
      }

      checkArray = []
  }

  return win
}

const checkHorizontal = (row, color) => {
  var checkArray = []
  let count = 5
  let win = false

  for (let i = 0; i < 6; i++) {
      for (let k = i; k < count; k++) {
          checkArray.push(positionBoard[row][k])
      }
      console.log(i, ":", checkArray)
      count+=1

      if(allAreEqual(checkArray, color)) {
      win = true
      return win
      }

      checkArray = []
  }

  return win
}



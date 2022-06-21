const ws = new WebSocket(`ws://localhost:8080`);

//takes a 1D array of client cards
const showClientCards = (cards) => {
  // console.log("showClientCards is Called", "Lenght of Client Cards:", cards.length)
  return (
    <div className="playingCards fourColours rotateHand">
      <ul className="table">
        {
          cards.map((card, index) => {
            let arr = card.split(" ")
            let len = arr[1].length <=6 ? 1 : 2
            let number = arr[1].substr(5,len)
            let symbol = arr[2]
          
            let cardType = "";
          
          
            if(symbol == "clubs"){
              cardType = "♣";
            }
            else if(symbol == "spades"){
              cardType = "♠";
            }
            else if(symbol == "hearts"){
              cardType = "♥";
            }
            else if(symbol == "diams"){
              cardType = "♦";
            }
          
            return (
              <li>
                <a className={card}><span className="rank">{number}</span><span className="suit">{cardType}</span></a>
              </li>
            )
          })
        }
      </ul>
    </div>

  )
}


const Sequence = (props) => {
  const [board, setBoard] = React.useState([[]]);
  const [positionBoard, setPositionBoard] = React.useState([[]]);
  const [cards, setCards] = React.useState([]);
  const [color,setColor] = React.useState([]);
  const [message,setMessage] = React.useState("");
  const [name,setName] = React.useState("");
  const [turn,setTurn] = React.useState("");



  let diamondSign = "♦";
  let heartSign = "♥";
  let spadesSign = "♠";
  let clubsSign = "♣";

  ws.onmessage = (event) => {
    var msg =  JSON.parse(event.data);

    if(msg.type == "wait") {
      setColor(msg.color);
      setMessage(msg.message);
      setName(msg.name);
    }

    if (msg.type == "newboard") {
      setBoard(msg.board)
      setPositionBoard(msg.positionBoard)
      setCards(msg.set)
      setMessage(msg.message)
      setTurn(msg.turn)
    }

    if(msg.type == "newPositonBoard") {
      setPositionBoard(msg.positionBoard)
      setTurn(msg.turn)
      setMessage(msg.message)
      console.log("position board changed")
    }

    if(msg.type == "newCards") {
      setPositionBoard(msg.positionBoard)
      setTurn(msg.turn)
      setMessage(msg.message)
      setCards(msg.set)
      console.log("New Cards Served")
    }

    if(msg.type == "draw") {
      setPositionBoard(msg.positionBoard)
      setMessage(msg.message)
      console.log("Game ended with a draw")
    }
    
    if(msg.type == "won") {
      setPositionBoard(msg.positionBoard)
      setMessage(msg.message)
    }

    if(msg.type == "over") {
      setMessage(msg.message)
    }
    console.log(msg)
  }

  const checkJackleCondition  =  (onCard, rowId, colId) =>  {
    let jackles = ["card rank-j spades", "card rank-j clubs", "card rank-j diams", "card rank-j hearts"]
    const contains = jackles.some(element => {
      return cards.includes(element);
    })

    let flag = positionBoard[rowId][colId] == "-"

    if(contains && flag) {
      for (let i = 0; i < cards.length; i++) {
        if(jackles.includes(cards[i])) {
          setCards(cards.filter((card) => {
            return card != cards[i]
          }))
          console.log("New Cards:", cards)
          break
        }
      }
    }
    
    return (contains && flag)
    
  }

  const handleClick = (onCard, rowId, colId) => {
    if (turn == name) {
      // console.log("Clicked Card:", onCard)
      if (cards.includes(onCard) || checkJackleCondition(onCard, rowId, colId) ) {
        // console.log("Cards:", cards)
  
        if(cards.includes(onCard)) {
          setCards(cards.filter((card) => {
            return card != onCard
          }))

        }
  
        // console.log("New Cards:", cards)
        const msg = {
          rowId: rowId,
          colId: colId,
          color: color
        }
        ws.send(JSON.stringify(msg))
      }
      else {
        console.log("Card not present")
        setMessage("You don't have a valid card. Please Try Again")
      }
    }
    else {
      console.log("Not your turn")
      setMessage("Not your turn. Please wait!")
    }
  
  }

  
  return (
    <div>
      <div className="container">
        {
          board.map((row,rowId) => {
            return (
              <div>
                <div className="playingCards fourColours rotateHand">
                  <ul className="table">
                    {
                      row.map((col, colId) => {
                        return(
                          <div onClick = {() => {
                              handleClick(col, rowId, colId)
                            } }>
                            <li>
                              {showCards(col, positionBoard, rowId, colId)}
                            </li>
                          </div>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            )

          })
        }
      </div>

      <div className="container">
        <div>
          <h1>Your Cards:</h1>
        </div>
        {showClientCards(cards)}
        {/* code for text box comes here */}
        {/* code for circle representing the players team color comes here */}
        <div className="text_box">{message}</div>
        <div className={`color ${color}`}></div>

      </div>
    </div>
  );
};

ReactDOM.render(<Sequence />, document.querySelector(`#root`));


// takes a 2D array of cards
const showCards = (content, board, row, col) => {
  // console.log("showCards is Called")
  if(content == "card back") {
    return (
      <div className="card back"><span className="rank"></span></div>
    )
  }
  else {
    let arr = content.split(" ")
    let len = arr[1].length <=6 ? 1 : 2
    let number = arr[1].substr(5,len)
    let symbol = arr[2]

    let cardType = "";
  
  
    if(symbol == "clubs"){
      cardType = "♣";
    }
    else if(symbol == "spades"){
      cardType = "♠";
    }
    else if(symbol == "hearts"){
      cardType = "♥";
    }
    else if(symbol == "diams"){
      cardType = "♦";
    }

    // return (
    //   <div className= {content}>
    //     <span className="rank">{number}</span><span className="suit">{cardType}</span>
    //   </div>
    // )

    try {
      if(board[row][col] == "green" || board[row][col] == "blue") {
        return (
          <div className="card"><div className={board[row][col]}></div></div>
        )
      }
      else {
        return (
          <div className= {content}>
            <span className="rank">{number}</span><span className="suit">{cardType}</span>
          </div>
        )
      }
    } catch (err) {
      // console.log(err)
    }

  }

}

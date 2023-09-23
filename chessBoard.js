let grid =  document.body.children[0];
let enpassentBoxArray = [];
let enpassentPiece = false;
let enpassentHolder = null;
let moves = 1 ;
let movesCount = 0 ;
let button = document.getElementsByClassName("buttonDiv");
backButton = button[0];
nextButton = button[1];
let reservedStoredDivChildren = [];
let reservedDivChildren = [];
let reservedStoredDiv = [];
let reservedDiv = [];

let reservedChildrenArray = [];
let reservedMovesArray = [];
let pawns = document.getElementsByClassName("pawn");
for (const pawn of pawns)  {pawn.setAttribute( "state" , "unmoved");
pawn.enpassent = false;
  }
  
let kings = document.getElementsByClassName("king");
for (const king of kings)  {king.setAttribute( "state" , "unmoved");
  }
let rooks = document.getElementsByClassName("rook");
for (const rook of rooks)  {rook.setAttribute( "state" , "unmoved");
  }
  pawns[0].copy = "yes";
  pawns[0].setAttribute("clone" , "yes");

  let node = pawns[0];
let cloneNode = pawns[0].cloneNode();
let deepCloneNode = pawns[0].cloneNode(true);

let turn = "whitePiece";   // whitePiece or blackPiece

let storedDiv ;
let storedArray;
let chessBoard = {};
let count = 0 ;

let i = 1 ; let j = 1 ;

for (const elem of grid.children) {
    
let k = `${i}` + `${j}`;
elem.row = i ;
elem.column = j ;
elem.id = k ;
elem.willReceive = false ;
chessBoard[k] = elem ; 
 j++ ;
 if (j > 8 ){  i ++ ;  j = 1 }
}


let arrayLoop = function(div,row,column,r,c,validMovesArray){
  
  
    for (let index = 1; index < 9; index++) {
      let i = row + r*index ;
      let j = column + c*index;
      let id = `${i}`+`${j}`;
      let invalidClass = div.children[0].classList[1];
      if(chessBoard[id]){
        if(chessBoard[id].children[0]){
          if(
            chessBoard[id].children[0].classList[1]=== invalidClass
            ){
              index = 10;
            }else
            {
              validMovesArray.push(id);
              index = 10;
            }
        }else
        {
          validMovesArray.push(id);
        }
      }
    }

  

}
 











let knightMoveArray = function (div ,row,column) { 
    
    
    let possibleMovesArray =  [  
        (`${row + 2}` +  `${column + 1}`),
        (`${row + 2}` +   `${column - 1}`),
        (`${row - 2}` + `${column + 1}`),
        (`${row - 2}` +  `${column - 1}`),
        (`${row + 1}` +   `${column + 2}`),
        (`${row + 1}` +  `${column - 2}`),
        (`${row - 1}` +  `${column + 2}`),
        (`${row - 1}` +  `${column - 2}`),
    ].filter((elm)=>chessBoard[elm]) ; 
    
    
    let validMovesArray = []

        let invalidClass = div.children[0].classList[1]
        possibleMovesArray.forEach((elem)=>{
          let parent =  chessBoard[elem];
          if( ! parent.children[0]){console.log(parent);
          validMovesArray.push(elem)}
          if(  parent.children[0]){
            if (parent.children[0].classList[1] != invalidClass)
          {validMovesArray.push(elem)}}
        });
        
        
        return validMovesArray;
};


   


let bishopMoveArray = function (div , row , column) {

    let validMovesArray = [];

    arrayLoop(div,row,column,-1,-1,validMovesArray);
    arrayLoop(div,row,column,-1,1,validMovesArray);
    arrayLoop(div,row,column,1,-1,validMovesArray);
    arrayLoop(div,row,column,1,1,validMovesArray);
            
    return validMovesArray;
    
    };


let rookMoveArray = function (div ,row,column) { 


  let validMovesArray = [];

    arrayLoop(div,row,column,0,-1,validMovesArray);
    arrayLoop(div,row,column,0, 1,validMovesArray);
    arrayLoop(div,row,column,-1,0,validMovesArray);
    arrayLoop(div,row,column, 1,0,validMovesArray);
    
     return validMovesArray;
        
    };


let queenMoveArray = function (div ,children,row,column) {

    let possibleMovesArray = [...rookMoveArray(div ,children,row,column),
    ...bishopMoveArray(div ,children,row,column)];

    return possibleMovesArray;
    
    };

 
let kingMoveArray = function (div,row,column) {
    
        let possibleMovesArray =  [  
            (`${row - 1 }` +  `${column }`),
            (`${row - 1 }` +  `${column - 1}`),
            (`${row - 1 }` +  `${column + 1}`),
            (`${row     }` +  `${column - 1}`),
            (`${row     }` +  `${column + 1}`),
            (`${row + 1}` +   `${column }`),
            (`${row + 1}` +   `${column - 1}`),
            (`${row + 1}` +   `${column + 1}`),
        ].filter( (elm)=>chessBoard[elm]) ;
        
        let validMovesArray = []

        let invalidClass = div.children[0].classList[1]
        possibleMovesArray.forEach((elem)=>{
          let parent =  chessBoard[elem];
          if( ! parent.children[0]){console.log(parent);
          validMovesArray.push(elem)}
          if(  parent.children[0]){
            if (parent.children[0].classList[1] != invalidClass)
          {validMovesArray.push(elem)}}
        });
        
        
        return validMovesArray;

    };


let pawnMoveArray = function (div,row,column) {
    let validMovesArray = [];
    if (div.children[0].classList[1]==="blackPiece") {
      
      let array = [
        `${row+2}` + `${column}`,`${row+1}`+`${column}`, 
        `${row+1}`+ `${column - 1}` ,`${row+1}`+ `${column + 1}`,
        `${row}`+ `${column - 1}` ,`${row}`+ `${column + 1}`
      ];

      if( chessBoard[array[1]] &&  
        chessBoard[array[1]].children[0] == undefined
        ) {
          validMovesArray.push(array[1]);
        }
      if( chessBoard[array[0]] &&  
        chessBoard[array[1]].children[0] == undefined &&
        chessBoard[array[0]].children[0] == undefined && 
        div.children[0].getAttribute("state") === "unmoved"
        ) {
          validMovesArray.push(array[0]);
         }
         if( chessBoard[array[2]] &&  
          chessBoard[array[2]].children[0] &&
          chessBoard[array[2]].children[0].classList[1] != "blackPiece"  
          ) {
            validMovesArray.push(array[2]);
          }
        if( chessBoard[array[3]] &&  
          chessBoard[array[3]].children[0]  &&
          chessBoard[array[3]].children[0].classList[1] != "blackPiece"
          ) {
            validMovesArray.push(array[3]);
          }
          if( chessBoard[array[2]] &&  
            chessBoard[array[2]].children[0] == undefined &&
            chessBoard[array[4]].children[0]  &&
            chessBoard[array[4]].children[0].classList[1] != "blackPiece" 
            && enpassent == true 
            ) {
              validMovesArray.push(array[2]);
            }
          if( chessBoard[array[3]] &&  
            chessBoard[array[3]].children[0] == undefined  &&
            chessBoard[array[5]].children[0]   &&
            chessBoard[array[5]].children[0].classList[1] != "blackPiece" 
            && enpassent == true
            ) {
              validMovesArray.push(array[3]);
            }

      
      
    } 
    if (div.children[0].classList[1]==="whitePiece") {
      
      let array = [
        `${row-2}` + `${column}`,`${row-1}`+`${column}`, 
        `${row-1}`+ `${column - 1}` ,`${row-1}`+ `${column + 1}`,
        `${row}`+ `${column - 1}` ,`${row}`+ `${column + 1}`
      ];

      if( chessBoard[array[1]] &&  
         chessBoard[array[1]].children[0] == undefined
        ) {
          validMovesArray.push(array[1]);
        }
      if( chessBoard[array[0]] &&  
        chessBoard[array[1]].children[0] == undefined &&
        chessBoard[array[0]].children[0] == undefined && 
        div.children[0].getAttribute("state") === "unmoved"
        ) {
          validMovesArray.push(array[0]);
        }
      if( chessBoard[array[2]] &&  
        chessBoard[array[2]].children[0] &&
        chessBoard[array[2]].children[0].classList[1] != "whitePiece"  
        ) {
          validMovesArray.push(array[2]);
        }
      if( chessBoard[array[3]] &&  
        chessBoard[array[3]].children[0]  &&
        chessBoard[array[3]].children[0].classList[1] != "whitePiece"
        ) {
          validMovesArray.push(array[3]);
        }
      if( chessBoard[array[2]] &&  
        chessBoard[array[2]].children[0] == undefined &&
        chessBoard[array[4]].children[0]  &&
        chessBoard[array[4]].children[0].classList[1] != "whitePiece" &&
        chessBoard[array[4]].children[0].enpassent == true
        ) {
          validMovesArray.push(array[2]);
        }
      if( chessBoard[array[3]] &&  
        chessBoard[array[3]].children[0] == undefined  &&
        chessBoard[array[5]].children[0]   &&
        chessBoard[array[5]].children[0].classList[1] != "whitePiece" &&
        chessBoard[array[5]].children[0].enpassent == true
        ) {
          validMovesArray.push(array[3]);
        }
      
    
    } 
    

    
    return  validMovesArray;
    
    
    };

let movesObj = {
    rook : rookMoveArray,
    knight : knightMoveArray,
    bishop : bishopMoveArray,
    king : kingMoveArray,
    queen : queenMoveArray,
    pawn : pawnMoveArray

}    


let pieceMoveArrayFunction = function (div,row,column,funcObj){

    let possibleMovesArray ;

    switch (div.children[0].classList[0]) {


        case "rook" : 
          possibleMovesArray = funcObj.rook(div ,row,column);  
            break;

        case "knight":
          possibleMovesArray = funcObj.knight(div, row,column);  
            break;

        case "bishop":
          possibleMovesArray = funcObj.bishop(div ,row,column);  
           break;


        case "king":
           possibleMovesArray = funcObj.king(div ,row,column); 
            break;


        case "queen":
            possibleMovesArray = funcObj.queen(div ,row,column);
            break;


        case "pawn":
            possibleMovesArray = funcObj.pawn(div,row,column);
             break;

       case undefined :
 
           break
    
        default:
            break;
    }

    return possibleMovesArray;

};

let showMoves = function(div){
   storedArray.forEach( (elem)=>{
   chessBoard[elem].style.backgroundColor = " greenyellow";
    chessBoard[elem].willReceive = true ;
    
   })
   

}

let hideMoves = function(storedArray,div){
    storedArray.forEach((elem)=>{
        if(chessBoard[elem].classList[0]==="whiteBox"){
            chessBoard[elem].style.backgroundColor = "wheat";
        }
        else{
             chessBoard[elem].style.backgroundColor = "skyblue";
        };
        if(div.classList[0]==="whiteBox"){
            div.style.backgroundColor = "wheat";
        }
        else{
             div.style.backgroundColor = "skyblue";
        };
        chessBoard[elem].willReceive = false;
        
    })
}

let executeMoves = function(div,storedDiv,turn){
  reservedStoredDiv.splice(count);
  reservedDiv.splice(count);
  reservedStoredDivChildren.splice(count);
  reservedDivChildren.splice(count);
  count++;
  reservedStoredDiv.push(storedDiv.id)
  reservedDiv.push(div.id)
    if (storedDiv.children[0]) {
      reservedStoredDivChildren.push(storedDiv.children[0].cloneNode(true))
    } else {reservedStoredDivChildren.push(storedDiv.children)
      }
    if (div.children[0]) {
      reservedDivChildren.push(div.children[0].cloneNode(true))
    } else {reservedDivChildren.push(div.children)
      }
      if (enpassentPiece) {reservedDivChildren[reservedDivChildren.length - 1] =
        
      enpassentPiece;
      enpassentPiece = false;
        
      }
      
    if (enpassentHolder && enpassentHolder.getAttribute("count")=== `${count-2}`){
      enpassentHolder.setAttribute("enpassentIsPossible","false")}
    if (storedDiv.children[0].classList[0]==="pawn" &&
    ((storedDiv.row - div.row) == (2))
     || ((storedDiv.row - div.row ) == (-2))){
      storedDiv.children[0].setAttribute("enpassentIsPossible", "true");
      storedDiv.children[0].setAttribute("count", `${count}`);
      enpassentHolder = storedDiv.children[0].cloneNode(true);
    }
  if(storedDiv.children[0].getAttribute("state") === "unmoved"){
    storedDiv.children[0].setAttribute("state" , "moved");
  }
  

    div.prepend( storedDiv.children[0]);
  
  
  if (turn == "whitePiece") {
      turn = "blackPiece";    
  } else {
    turn = "whitePiece";
  }
  movesCount++;
  console.log(movesCount);
  
}




grid.addEventListener("click" , (event)=>{
   let  div ;
   switch (event.target.classList[2]) {

    case "box":
      div = event.target ; 
        break;

    case "piece":
      div = event.target.parentElement ;  
        break ;

    case "block":
      div = event.target.parentElement.parentElement ;  
        break;
   
    default:
        break;
   }
   let row = div.row;
   let column = div.column;



if (div.children[0]) {
    if (div.children[0].classList[1]===turn) {
        if (storedArray==null&&storedDiv==null) {
            storedArray = pieceMoveArrayFunction(div,row,column,movesObj);
            storedDiv = div;
            showMoves(div);
        } 
        else {
        hideMoves(storedArray,storedDiv,div);
        
            storedArray = null;
            storedDiv = null;
            storedArray = pieceMoveArrayFunction(div,row,column,movesObj);
            storedDiv = div;
           showMoves(div);
        }
        
        
    } 
    else {
        if(div.willReceive){
          executeMoves(div,storedDiv);
          div.children[1].remove();
            hideMoves(storedArray,storedDiv,div);
        if (turn === "whitePiece") {
            turn = "blackPiece";    
        } else {
          turn = "whitePiece";
        }
       storedDiv = null;
       storedArray =null;
       enpassentBoxArray.push(false);
            
        }
        
    }
    let di = div;
    let children = div.children;
    let children0 = div.children[0];

   console.log(children); 
   console.log(children0); 
   console.log(di);
   console.log(div);
}
else {
    if (div.willReceive) {
      
      
      
      if(
        chessBoard[  `${storedDiv.row}` +`${div.column}`].children[0] &&
        div.children[0] == undefined && 
        storedDiv.children[0].classList[0] === "pawn"
        && 
        chessBoard[  `${storedDiv.row}` +`${div.column}`].children[0].classList[1] != 
        storedDiv.children[0].classList[1]
        ){
          enpassentPiece = chessBoard[  `${storedDiv.row}` +`${div.column}`].children[0];
          
          enpassentBoxArray.push(
            chessBoard[  `${storedDiv.row}` +`${div.column}`]
          )
          chessBoard[  `${storedDiv.row}` +`${div.column}`].children[0].remove();
        }
        else{
          enpassentBoxArray.push(false);
        }
        executeMoves(div,storedDiv,turn);


        
        hideMoves(storedArray,storedDiv,div);
        if (turn === "whitePiece") {
            turn = "blackPiece";    
        } else {
          turn = "whitePiece";
        }
       storedDiv = null;
       storedArray =null;
       
    }
console.log(div.children);
    
}
   
})

backButton.addEventListener("click" , (event)=>{
  if ( reservedDiv[count-1]) {
    let enpassentBox = enpassentBoxArray[count-1];
  let pickFromHere = reservedStoredDiv[count - 1];
  let putInHere = reservedDiv[count-1];
  let pickThis = reservedStoredDivChildren[count-1];
  if(pickThis.state){console.log(pickThis.state)}
  let putOnThis = reservedDivChildren[count-1];
  chessBoard[pickFromHere].prepend(pickThis);
  if (chessBoard[putInHere] && chessBoard[putInHere].children[0]) {
    chessBoard[putInHere].children[0].remove();
  }
  if( chessBoard[putInHere] && putOnThis.children && putOnThis.children[0]){
    if (enpassentBox) {
      enpassentBox.prepend( putOnThis);

    } else {
    chessBoard[putInHere].prepend( putOnThis);
      
    }

  }

  console.log(pickFromHere , 'pickFromHere');
  console.log(pickThis , "pickThis");
  console.log(putInHere , "putInHere");
  console.log(chessBoard[putInHere]);
  console.log(enpassentBox , "enpassentBox");
  console.log(putOnThis , "putOnThis");
  if (turn==="blackPiece") {
    turn = "whitePiece";
  } else {
    turn ="blackPiece";
  }

  count--;
  }
  
  
});
nextButton.addEventListener("click" , (event)=>{
  count++; 
  if ( reservedDiv[count-1]) {
    let enpassentBox = enpassentBoxArray[count-1];

  let pickFromHere = reservedStoredDiv[count - 1];
  let putInHere = reservedDiv[count-1];
  let pickThis = reservedStoredDivChildren[count-1];
  let putOnThis = reservedDivChildren[count-1];
  
  chessBoard[pickFromHere].children[0].remove();
  if(putOnThis.children && putOnThis.children[0]){
    if (enpassentBox && enpassentBox.children[0]) {
      enpassentBox.children[0].remove();
    } else {
    chessBoard[putInHere].children[0].remove();
      
    }

  }
  chessBoard[putInHere].prepend(pickThis);

  console.log(pickFromHere);
  console.log(pickThis);
  console.log(putInHere);
  console.log(chessBoard[putInHere]);
  console.log(putOnThis);
  if (turn==="blackPiece") {
    turn = "whitePiece";
  } else {
    turn ="blackPiece";
  }

  }
  
div.remove();
console.log(pawns[0]);
console.log(node);
console.log(cloneNode);
console.log(deepCloneNode);


  
})
console.log(pawns[0]);
console.log(pawns);
console.log(node);
console.log(cloneNode);
console.log(deepCloneNode);

 















             
            
       
        
        
       
        
            
                

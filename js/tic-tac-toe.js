const classNames ={
  cell: 'cell',
  cellContent: 'cell-content',
  populated: 'populated',
  winner: 'winner'
};

const user = {
  x: 'X',
  o: 'O'
}

let cellValues = ['','','','','','','','',''];
let oIsNext = true;
let winningUser;
let counter = 0;
let winningCombination = [];

const cells = document.querySelectorAll(`.${classNames.cell}`);
const modalOverlay = document.querySelector('#modal-overlay');
const winnerDetails = document.querySelector('#winner-container > span')
const newGameButton = document.querySelector('#new-game-button');

const winningMatrix = {
  0: [[1,2],[3,6],[4,8]],
  1: [[0,2],[4,7]],
  2: [[0,1],[5,8],[4,6]],
  3: [[0,6],[4,5]],
  4: [[3,5],[1,7],[0,8],[2,6]],
  5: [[3,4],[2,8]],
  6: [[7,8],[0,3],[2,4]],
  7: [[6,8],[1,4]],
  8: [[6,7],[2,5],[0,4]]
};

function calculateWinner(chosenIndex){

  const winningRanges = winningMatrix[chosenIndex];

  for(let i = 0; i<winningRanges.length; i++){

    let currentUser = cellValues[chosenIndex];

    let firstOption = cellValues[winningRanges[i][0]];
    let secondOption = cellValues[winningRanges[i][1]];

    if(currentUser === firstOption && currentUser ===secondOption){
      winningUser = currentUser;
      winningCombination = [chosenIndex, winningRanges[i][0], winningRanges[i][1]];
      return true;
    }
    else if(counter === 9){
      showModalDraw();
    }

  }


}

function showModal() {
  winnerDetails.innerHTML = `Winner is ${winningUser}!`;
  modalOverlay.style.display = 'flex';
  highlightWinners();
}

function showModalDraw() {
  winnerDetails.innerHTML = `It's a tie!`;
  modalOverlay.style.display = 'flex';
}

newGameButton.addEventListener('click', () =>{
  startGame();
});

cells.forEach((c, i) => {
  c.addEventListener('click',() =>{
    if(!cellValues[i]){
      cellValues[i] = oIsNext ? user.x : user.o;
      oIsNext = !oIsNext;
      counter++;
      // console.log(cellValues[i])

      const cellContent = c.querySelector(`.${classNames.cellContent}`)
      cellContent.innerHTML = cellValues[i];
      cellContent.classList.add('populated');

      calculateWinner(i);

      if(winningUser){
        showModal();
      }
    }

  })
});

function highlightWinners(){
  cells[winningCombination[0]].classList.add(classNames.winner);
  cells[winningCombination[1]].classList.add(classNames.winner);
  cells[winningCombination[2]].classList.add(classNames.winner);
}

function startGame(){

  console.log("startGame function has been reached");
  cellValues = ['','','','','','','','',''];
  oIsNext = true;
  winningUser = undefined;
  counter = 0;
  winningCombination = [];

  cells.forEach((c, i) => {

    c.classList.remove('winner');
    const cellContent = c.querySelector(`.${classNames.cellContent}`)
    cellContent.innerHTML = '';
    cellContent.classList.remove('populated');

  });


  modalOverlay.style.display = 'none';

}

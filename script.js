let cards = []
let sum = ''
let prize = JSON.parse(localStorage.getItem('prize'))
let message = ''

const messageEl = document.querySelector('#message')
const cardsEl = document.querySelector('#cards')
const sumEl = document.querySelector('#sum')
const startBtn = document.querySelector('#btn-start')
const restartBtn = document.querySelector('#btn-restart')
const PrizeEl = document.querySelector('#prize')
const containerEl = document.querySelector('.container')

PrizeEl.textContent = `Prize: ${prize}$ `

// --------- Start Button ----------- //
startBtn.addEventListener('click', () => {
  drawCards()
  updateLocalStorage()
})

// --------- Restart Button ----------- //
restartBtn.addEventListener('click', () => {
  restartGame()
})

// --------- Start Game --------------//
function drawCards() {
  firstCard = generateRandomNumber()
  secondCard = generateRandomNumber()
  cards = [firstCard, secondCard]
  sum = firstCard + secondCard

  cardsEl.textContent = `Cards: ${cards[0]}, ${cards[1]}`
  sumEl.textContent = `Sum: ${sum}`

  // --------- Conditional statement for card value --------------//
  if (sum < 21) {
    cardLess()
  } else if (sum === 21) {
    cardEqual()
  } else {
    cardGreater()
  }

  messageEl.textContent = message
  PrizeEl.textContent = `Prize: ${prize}$ `
}

// --------- Card less than 21 --------------//
function cardLess() {
  containerEl.style.background = ''
  message = `Oops! Draw new card.`
  prize -= 2
}

// --------- Card equal to 21 --------------//
function cardEqual() {
  containerEl.style.background = 'hotpink'
  message = `Woohoo! You've got backjack!`
  prize += 100
  startBtn.disabled = true
  setTimeout(() => {
    startBtn.disabled = false
    drawCards()
  }, 2000)
}

// --------- Card Greater than 21 --------------//
function cardGreater() {
  containerEl.style.background = 'red'
  prize = 0
  message = `You're out of the game!`
  setTimeout(() => {
    restartGame()
    startBtn.disabled = false
  }, 2000)
  startBtn.disabled = true
}

// --------- Restart Game --------------//
function restartGame() {
  firstCard = ''
  secondCard = ''
  prize = 0
  messageEl.textContent = 'Play Again!'
  PrizeEl.textContent = `Prize: ${prize}$`
  cardsEl.textContent = `Cards: ${firstCard}`
  sumEl.textContent = `Sum: ${secondCard}`
}

// --------- Generate Random Card Numbers ----------- //
function generateRandomNumber() {
  return Math.floor(Math.random() * 12) + 1
}

// --------- Save Prize To Local Sto rage ----------- //
function updateLocalStorage() {
  localStorage.setItem('prize', JSON.stringify(prize))
}

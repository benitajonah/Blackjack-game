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

startBtn.addEventListener('click', () => {
  drawCards()
  updateLocalStorage()
})

restartBtn.addEventListener('click', () => {
  restartGame()
})

function drawCards() {
  firstCard = generateRandomNumber()
  secondCard = generateRandomNumber()
  cards = [firstCard, secondCard]
  sum = firstCard + secondCard

  cardsEl.textContent = `Cards: ${cards[0]}, ${cards[1]}`
  sumEl.textContent = `Sum: ${sum}`

  if (sum < 21) {
    containerEl.style.background = ''
    message = `Oops! Draw new card.`
    prize -= 2
  } else if (sum === 21) {
    containerEl.style.background = 'hotpink'
    message = `Woohoo! You've got backjack!`
    prize += 100
  } else {
    containerEl.style.background = 'red'
    prize = 0
    message = `You're out of the game!`
    setTimeout(() => {
      restartGame()
      startBtn.disabled = false
    }, 3000)
    startBtn.disabled = true
  }

  messageEl.textContent = message
  PrizeEl.textContent = `Prize: ${prize}$ `
}

function restartGame() {
  firstCard = ''
  secondCard = ''
  prize = 0
  messageEl.textContent = 'Play Again!'
  PrizeEl.textContent = `Prize: ${prize}$`
  cardsEl.textContent = `Cards: ${firstCard}`
  sumEl.textContent = `Sum: ${secondCard}`
}

function endGame() {}

function generateRandomNumber() {
  return Math.floor(Math.random() * 13)
}

function updateLocalStorage() {
  localStorage.setItem('prize', JSON.stringify(prize))
}

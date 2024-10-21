import random
import math

cards = []
usedCards = []
for i in range(104):
    cards.append(i)

def check():
    if len(cards)+len(usedCards) != 104:
        print('BIG ERROR HELP')

def randomCard():
    card = cards[math.floor(random.random()*len(cards))]
    usedCards.append(card)
    cards.remove(card)


class player:
    def __init__(this, numberOfCards):
        this.hand = []
        for j in range(numberOfCards):
            this.hand.append(randomCard())
    def playRandom(this):
        card = this.hand[math.floor(random.random()*len(this.hand))]
        return card

players = []

#Inputs
myHand = []
print('Which cards do you have')
asking = True
while asking:
    card = input()
    try:
        if int(card) >=0 and int(card) < 105:
            myHand.append(int(card))
        else:
            asking = False
    except ValueError:
        asking = False
print('How many cards do your opponents have')
asking = True
while asking:
    number = input()
    try:
        if int(number) > 0 and int(number) < 11:
            players.append(player(int(number)))
        else:
            asking = False
    except ValueError:
        asking = False

#FOR EACH OF OUR CARDS
    #Assess how good it is
#Return best option
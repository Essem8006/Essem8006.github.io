#Cap at 5 per row
import random
import math
import copy
players = []#hand, pickupCount
deck = []
table = [[],[],[],[]]
#savePoint players, deck, table
def createPlayer():
    playType = input('Type ')
    score = input('Score ')
    thisHand = []
    if playType == 'me':
        for k in range(numCards):
            theIn = int(input('Card '))
            thisHand.append(theIn)
            deck.remove(theIn)
    else:
        for k in range(numCards):
            thisHand.append(drawCard())
    return [thisHand, int(score)]
def findPickupRow(theCard):
    thePickupRow = 999
    currentDiff = 999
    for j in range(4):
        if theCard > table[j][len(table[j])-1]:
            thisDiff = theCard - table[j][len(table[j])-1]
            if thisDiff < currentDiff:
                thePickupRow = j
                currentDiff = thisDiff
    if thePickupRow == 999:
        thePickupRow = math.floor(random.random()*4)
    return thePickupRow
def sumRow(row):
    mySum = 0
    for j in table[row]:
        mySum += 1
    return mySum
def canPlay(no):
    playables = []
    for j in range(4):
        if len(table[j])<5 and table[j][len(table[j])-1] < no:
            playables.append(j)
    return playables
def findMin(varList):
    minIndex = 0
    min = 999
    for j in range(len(varList)):
        if varList[j]<min:
            min = varList[j]
            minIndex = j
    return minIndex
def chooseCard(varHand):
    if len(varHand) == 0:
        print('Hand empty')
    j = math.floor(random.random()*len(varHand))
    card = varHand[j]
    return card
def drawCard():
    if len(deck) == 0:
        print('Deck empty')
    j = math.floor(random.random()*len(deck))
    card = deck[j]
    deck.remove(card)
    return card
def init():
    #create deck
    for i in range(104):
        deck.append(i+1)
    #create players
    global numCards
    numCards = int(input('How many cards '))
    for i in range(int(input('How many players '))):
        players.append(createPlayer())
    #create table
    for i in range(4):
        table[i].append(drawCard())
def debug():
    print(players)
    print(deck)
    print(table)
def playCards():
    roundCards = []
    for thisHand, thisPickup in players:
        roundCard = chooseCard(thisHand)
        thisHand.remove(roundCard)
        roundCards.append(roundCard)
    print(roundCards)
    for i in players:
        currentPlayer = findMin(roundCards)
        myPlayables = canPlay(roundCards[currentPlayer])
        if len(myPlayables) == 0:
            pickupRow = findPickupRow(roundCards[currentPlayer])
            players[currentPlayer][1] += sumRow(pickupRow)
            table[pickupRow] = [roundCards[currentPlayer]]
        else:
            playingOn = findPickupRow(roundCards[currentPlayer])
            table[playingOn].append(roundCards[currentPlayer])
        roundCards[currentPlayer] = 777
        print(table)
        print(roundCards)
def save():
    global savePoint
    savePoint = [copy.deepcopy(players), copy.deepcopy(deck), copy.deepcopy(table)]
def run():
    for l in range(numCards):
        playCards()
        input()

init()
save()
run()

print()
print()
print()
print(savePoint)
#Cap at 5 per row
import random
import math
import copy
players = [[[28,80,51,7,27,97,4,26,20,70],0]]#hand, pickupCount
deck = []
table = [[18],[56],[53],[71]]
def createPlayer():
    thisHand = []
    for k in range(numCards):
        thisHand.append(drawCard())
    return [thisHand, 0]
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
    for i in range(4):
        for j in table[i]:
            deck.remove(j)
    for i in players[0][0]:
        deck.remove(i)
    #create players
    global numCards
    numCards = len(players[0][0])
    for i in range(int(input('How many other players '))):
        players.append(createPlayer())
def findRow(card):
    thePickupRow = 999
    currentDiff = 999
    for j in range(4):
        if card > table[j][len(table[j])-1]:
            thisDiff = card - table[j][len(table[j])-1]
            if thisDiff < currentDiff:
                thePickupRow = j
                currentDiff = thisDiff
    if thePickupRow == 999:
        if len(table[3])<len(table[2]) and len(table[3])<len(table[1]) and len(table[3])<len(table[0]):
            thePickupRow = 3
        elif len(table[2])<len(table[3]) and len(table[2])<len(table[1]) and len(table[2])<len(table[0]):
            thePickupRow = 2
        elif len(table[1])<len(table[3]) and len(table[1])<len(table[2]) and len(table[1])<len(table[0]):
            thePickupRow = 1
        elif len(table[0])<len(table[3]) and len(table[0])<len(table[2]) and len(table[0])<len(table[1]):
            thePickupRow = 0
        else:
            thePickupRow = math.floor(random.random()*4)
    return thePickupRow
def playCards(l,m):
    roundCards = []
    first = True
    for thisHand, thisPickup in players:
        if l == 0 and first:
            roundCard = thisHand[m]
            first = False
        else:
            roundCard = chooseCard(thisHand)
        thisHand.remove(roundCard)
        roundCards.append(roundCard)
    for i in players:
        currentPlayer = findMin(roundCards)
        thisrow = findRow(roundCards[currentPlayer])
        if len(table[thisrow]) == 5:
            table[thisrow] = [roundCards[currentPlayer]]
            players[currentPlayer][1] +=5
        elif table[thisrow][len(table[thisrow])-1]>roundCards[currentPlayer]:
            players[currentPlayer][1] += len(table[thisrow])
            table[thisrow] = [roundCards[currentPlayer]]
        else:
            table[thisrow].append(roundCards[currentPlayer])
        roundCards[currentPlayer] = 777
def save():
    global savePoint
    savePoint = [copy.deepcopy(players), copy.deepcopy(deck), copy.deepcopy(table)]
def run(m):
    global players
    global deck
    global table
    players = copy.deepcopy(savePoint[0])
    deck = copy.deepcopy(savePoint[1])
    table = copy.deepcopy(savePoint[2])
    refreshHands()
    for l in range(numCards):
        playCards(l,m)
def refreshHands():
    for n in range(len(players)-1):
        for item in players[n+1][0]:
            deck.append(item)
            item = drawCard()

init()
save()
analysis = []
for m in range(numCards):
    run(m)
    analysis.append(players[0][1])
for lp in range(999):
    for m in range(numCards):
        run(m)
        analysis[m]+=players[0][1]
print('play ' + str(savePoint[0][0][0][findMin(analysis)]))
print(analysis)
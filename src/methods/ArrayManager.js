const ArrayManager = Object.create(null, {
    getRandomItem: {
        value: function (array) {
            // get length of the array
            const arrayLength = array.length
            // make random number from array length
            const randomNumber = Math.floor(Math.random() * arrayLength)
            // return the item at that index
            return array[randomNumber]
        }
    },
    getRandomUnownedGame: {
        value: function (games, userGamesIds) {
            while (games.length >= 0) {
                const randomIndex = Math.floor(Math.random() * games.length)
                const selectedGame = games.splice(randomIndex, 1)
                if (!userGamesIds.includes(selectedGame[0].id)) {
                    return selectedGame[0]
                }
                if (games.length === 0) {
                    return false
                }
            }
        }
    },
    removeItemByProperty: {
        value: function (array, property, propertyValue) {
            const index = array.findIndex(item => item[property] === propertyValue)
            const removedItem = array.splice(index, 1)
            return { newArray: array, item: removedItem[0] }
        }
    },
    addItem: {
        value: function (array, item) {
            array.push(item)
            return array
        }
    }
})

export default ArrayManager
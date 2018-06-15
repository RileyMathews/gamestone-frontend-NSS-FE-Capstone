/* 
    module to hold methods for pulling and adding information from arrays
    authors Riley Mathews
*/

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
            const gamesForFunction = games.map(game => Object.assign({}, game))
            while (gamesForFunction.length >= 0) {
                const randomIndex = Math.floor(Math.random() * gamesForFunction.length)
                const selectedGame = gamesForFunction.splice(randomIndex, 1)
                if (!userGamesIds.includes(selectedGame[0].id)) {
                    return selectedGame[0]
                }
                if (gamesForFunction.length === 0) {
                    return false
                }
            }
        }
    },
    getRandomFavoriteGame: {
        value: function (usersGames) {
            const array = usersGames.map(game => Object.assign({}, game))
            while (array.length >= 0) {
                const randomIndex = Math.floor(Math.random() * array.length)
                const selectedGame = array.splice(randomIndex, 1)[0]
                if (selectedGame.isFavorited === true) {
                    return selectedGame
                }
                if (array.length === 0) {
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
    },
    removeItem: {
        value: function (array, item) {
            const newArray = array.map(item => Object.assign({}, item))
            const index = newArray.findIndex(itemInArray => itemInArray === item)
            newArray.splice(index, 1)
            return newArray
        }
    },
    getRandomUserGame: {
        value: function (games, gamesStats, filters) {
            let selectedGame
            if (filters.isFavorited) {
                const gameStats = this.getRandomFavoriteGame(gamesStats)
                selectedGame = games.find(game => game.id === gameStats.id)
            } else {
                selectedGame = this.getRandomItem(games)
            }
            return selectedGame
        }
    }
})

export default ArrayManager
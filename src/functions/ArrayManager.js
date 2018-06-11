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
    }
})

export default ArrayManager
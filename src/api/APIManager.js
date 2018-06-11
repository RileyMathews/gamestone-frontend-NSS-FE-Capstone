/* 
    module to provide functionality for working with api
    Authors: Riley Mathews
*/

const APIManager = Object.create(null, {
    searchGames: {
        value: function (searchString) {
            return fetch(`http://localhost:8088/games?name_like=${encodeURI(searchString)}`)
        }
    },
    post: {
        value: function (collection, data) {
            return fetch(`http://localhost:8088/${collection}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    },
    put: {
        value: function (collection, data, id) {
            return fetch(`http://localhost:8088/${collection}/${id}`, {
                method: "put",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
    },
    delete: {
        value: function (collection, id) {
            return fetch(`http://localhost:8088/${collection}/${id}`, {
                method: "DELETE"
            })
        }
    }
})

export default APIManager
import APIManager from "../api/APIManager";

/* 
    module to manage active users information
    authors Riley Mathews
*/

const UserManager = Object.create(null, {
    // function to get user information from api and post it to state
    getUserInformation: {
        value: function () {
            // fetches the users account information
            APIManager.getUser(this.state.activeUser)
                .then(r => r.json())
                .then(response => {
                    const user = response
                    console.log(user)
                    // get users game information 

                    // push ids into promise array for getting giantbombs info

                    // get platforms out of nested array



                    // set information we have access to now. our users game info, and users owned platforms and ids for owned games and platforms
                    this.setState({
                        userId: user.id,
                        userFirstName: user.first_name,
                        userLastName: user.last_name,
                        userGamertag: user.gamertag
                    })
                })
                // then fire the call for giantbomb promises

                // and simulataneously fire the call to get all platforms and use logic to set all platforms array, and unowned platforms array

            // fetches the users games collection
            // APIManager.getUsersGames(this.state.activeUser)
            //     .then(r => r.json())
            //     .then(response => {
            //         // map the giant bomb ids of each of those games into a seperate array
            //         const arrayOfIds = response.map(game => game.gbId)
            //         this.setState({
            //             userGamesStats: response,
            //             userGamesIds: arrayOfIds,
            //         })
            //         // use that array to build an array of fetch requests for each game
            //         let promises = []
            //         arrayOfIds.forEach(id => {
            //             promises.push(APIManager.getGbGame(id))
            //         })

            //         // fire that array in a promise.all 
            //         Promise.all(promises)
            //             .then(response => {
            //                 // with the response of that array, setstate of app
            //                 const userGamesState = response.map(response => response.results)
            //                 this.setState({ userGames: userGamesState })
            //             })
            //     })

        }
    },
    // function to set the active user in state
    setActiveUser: {
        value: function (userId) {
            this.setState({ activeUser: userId })
        }
    },
    clearActiveUser: {
        value: function () {
            this.setState({
                activeUser: null,
                userFirstName: "",
                userLastName: "",
                userGamertag: "",
                userGamesIds: [],
                userGamesStats: [],
                userGames: [],
                userPlatforms: [],
                userPlatformsIds: [],
                allPlatforms: [],
                userUnownedPlatforms: []
            })
        }
    }
})

export default UserManager
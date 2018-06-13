/* 
    module to handle logic and filters for suggesting games to the user
*/

const SuggestionManager = Object.create(null, {
    getCurrentFilters: {
        value: function () {
            const filters = {
                favorite: this.state.filterByFavorites,
                console: this.state.filterByConsoles
            }
            return filters
        }
    },
    suggestGameBySimilarity: {
        value: function (filters) {
            
        }
    }
})
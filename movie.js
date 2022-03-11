let currentId = 0;
let movieList = [];

$(function(){
    console.log('All DOM contents have been loaded!');

    $('#movieForm').on('submit', function(e){
        e.preventDefault();
        let title = $('#title').val();
        let rating = $('#rating').val();
        
        
        let movieRating = {title, rating, currentId};
        const HtmlToAppend = createMovieDataHtml(movieRating);

        currentId++
        movieList.push(movieRating);
        //inserts data to function HtmlToAppend to push onto DOM
        $('#movie-table-body').append(HtmlToAppend);
        //clears form values for next entry
        $('#movieForm input').trigger('reset');
    });

    $('tbody').on('click', '.btn.btn-danger', function(e){
        //finds index of clicked on movie, returns integer ==> index of movie in movieList array
        let indexToRemove = movieList.findIndex(movie => movie.currentId === +$(e.target).data('deleteId'));
        //using returned index from indexToRemove, we splice out selected movie from array
        movieList.splice(indexToRemove, 1);
        //from current elemen t(movie) find parent element matching 'tr', and removing the table row from DOM
        $(e.target).closest('tr').remove();
    });

    $('.fas').on('click', function(e){
        //setting sort rules

        //if arrow has class set to sort down, ordering is sorted down, if not, sort up
        let direction = $(e.target).hasClass('fa-sort-down') ? 'down' : 'up';
        //pull movie id for sorting
        let keyToSortBy = $(e.target).attr('id');
        //sort
        let sortedMovies = sortBy(movieList, keyToSortBy, direction);

        //empty movie table to re-sort
        $('#movie-table-body').empty();

        //for loop to create and add new rows of movies to page
        for(let movie of sortedMovies){
            const HtmlToAppend = createMovieDataHtml(movie);
            $('#movie-table-body').append(HtmlToAppend);
        }

        //toggle property for clicked arrow
        //toggles on, if off, sort down
        $(e.target).toggleClass('fa-sort-down');
        $(e.target).toggleClass('fa-sort-up');
    });
});

//array is comprised of objects cotaining movie data
//keyToSortBy = index of movie
//direction -> down / up

function sortBy(array, keyToSortBy, direction){
    return array.sort(function(a,b){
        //converting string numbers to numbers to sort
        if(keyToSortBy === 'rating'){
            // + operator converts to a number data type
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
        }
        
        if(a[keyToSortBy] > b[keyToSortBy]){
            return direction === 'up' ? 1 : -1;
        } else if(b[keyToSortBy] > a[keyToSortBy]){
                return direction === 'up' ? -1 : 1;
            }
        return 0;
    });
};

//created html code to push into DOM, appearing on page
function createMovieDataHtml(data){
    return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
            <button class="btn btn-danger" data-delete-id="${data.currentId}">Remove</button>
        </td>
    </tr>
    `
}
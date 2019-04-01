const xhr = new XMLHttpRequest();

// Acquire required HTML tags
const addD = document.querySelector('.titleforjs');

xhr.onload = (() => {
    // Get data from JSON file
    let data = JSON.parse(xhr.responseText);

    if (data.length == 0) {
        addD.innerHTML = '<h5><p>NO DATA FOUND</p></h5>';
    } else {
        var temp = '';
        data.forEach(element => {
        temp += '<p>'
        for (var i = 0; i < Object.keys(element).length; ++i) {
            temp += `${Object.keys(element)[i]}: ${element[Object.keys(element)[i]]}<br>`
        }
        temp += '</p>';
        });
        temp += '<hr>';

        // Add record to page
        addD.innerHTML = temp;
    }
})

// We refresh the page so the recent correct data is shown on the screen
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
xhr.open('GET', 'http://localhost:5000/ajaxcall');
xhr.send();
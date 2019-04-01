const xhr = new XMLHttpRequest();
// count holdes count of number of times user left search bar blank
let count = 0;   

// Acquire required HTML tags
const typeddata = document.querySelector('.input');
const errmsg = document.querySelector('#errorMess');
const myForm = document.querySelector('#searchData');

// Form listener
myForm.addEventListener('submit', printdata);

// myForm function call
function printdata(data){
    // We prevent the default behavior which is caused by 'submit' method, i.e. it send the data to file and refresh.
    data.preventDefault();

    // console.log(document.querySelector('.header-overlay'));
    
    if (typeddata.value === '') {
        count += 1;
        if (count >= 2) {
            console.log(`Many empty searches, Count:${count}`);
        }
        errmsg.innerHTML = '<h3>Please provide a movie name</h3>';
        setTimeout(() => errmsg.lastChild.remove(), 2000);
    } else {
        let moviename = { name: typeddata.value};
        xhr.onload = () => {
            console.log("message received");
        }

        xhr.open('POST', 'http://localhost:5000/ajaxcall');
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Change current page to result page
        xhr.send(JSON.stringify(moviename));
        window.location = 'http://localhost:5000/results';
    }
}

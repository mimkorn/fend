/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

async function get() {

    try {
      let response = await fetch('/all');
      let data = await response.json();
    } catch(err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
  }
  
get();
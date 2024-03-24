document.addEventListener("DOMContentLoaded", function () {
    // Check if Geolocation is supported by the browser
    if ("geolocation" in navigator) {
        // Periodically fetch the user's location
        setInterval(getUserLocation, 5000); // Fetch every 5 seconds (adjust as needed)
    } else {
        console.log("Geolocation is not supported by your browser");
    }
});

function getUserLocation() {
    // Use the Geolocation API to get the user's current location
    navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        { enableHighAccuracy: true } // Options, you can adjust as needed
    );
}

function successCallback(position) {
    const { latitude, longitude } = position.coords;

    // Send the location data to the server (you can use AJAX or fetch)
    sendDataToServer(latitude, longitude);
}

function errorCallback(error) {
    console.log(`Error getting location: ${error.message}`);
}

function sendDataToServer(latitude, longitude) {
    // Send the location data to your server using AJAX, fetch, or any other method
    // You can emit a socket event or make an HTTP request to inform the server
    // about the user's current location.
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
}


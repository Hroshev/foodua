function calendar() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = date.getDate();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthString = months[month];

    document.getElementById('data').innerHTML = `<p>© Copyright All Rights Reserved ${year}</p>`;
}
calendar();
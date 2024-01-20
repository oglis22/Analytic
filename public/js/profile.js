const profile = document.getElementById('profile');
const dropdown = document.getElementById('dropdown');
const dropdownmenu = document.getElementById('dropdownmenu');


profile.addEventListener('mouseover', () => {
    dropdown.innerHTML = "<button onclick='window.location.href = `logout`' class='logoutbtn'>Logout</button> <br> <button onclick='' class='logoutbtn'>Settings</button>";
});

dropdownmenu.addEventListener('mouseleave', () => {
    dropdown.innerHTML = "";
});


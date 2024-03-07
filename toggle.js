function iconHover(){
    document.getElementById("mode-toggle").style.color = "#dedede";
}

function toggle(){
    theme = document.getElementById("style")
    toggleButton = document.getElementById("mode-toggle")
    if (theme.getAttribute("href") == "/style.css"){
        theme.setAttribute("href", "/light.css")
        toggleButton.setAttribute("class", "fa-regular fa-moon")
    } else {
        theme.setAttribute("href", "/style.css")
        toggleButton.setAttribute("class", "fa-regular fa-sun")
    }
    
}
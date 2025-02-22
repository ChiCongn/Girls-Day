
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("navigate-congrats");

    if (submitButton) {
        submitButton.addEventListener("click", () => {
            const username = document.getElementById("username").value.trim();

            if (username) {
                localStorage.setItem("username", username);
                window.location.href = "congrats.html";
                
            } else {
                alert("Please enter your name!");
            }
        });
    }
});

$(document).ready(() => {
  // Toggling Post Form
  let postButton = document.querySelector("#post_button");
  let postForm = document.querySelector(".post_form");
  let bool = 1;
  $(postButton).on("click", () => {
    postButton.classList.toggle("make_post");
    postButton.classList.toggle("new_post");
    $(postForm).slideToggle(400);

    if (bool == 1) {
      postButton.textContent = "Share Post";
      bool = 2;
    } else {
      postButton.textContent = "New Post";
      bool = 1;
    }
  });

  // Redirecting Notification Bar
  // debugger;
  let linkBar = document.querySelectorAll(".links_bar .link");
  $(linkBar).on("click", function () {
    linkBar.forEach((link) => {
      link.classList.remove("active");
    });
    $(this).addClass("active");
  });
});

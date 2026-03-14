const profilePhoto = document.querySelector(".profile-photo");
const photoCell = document.querySelector(".photo-cell");

if (profilePhoto && photoCell) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.classList.add("is-missing");
    photoCell.classList.add("is-missing");
  });
}

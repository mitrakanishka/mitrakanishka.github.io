const profilePhoto = document.querySelector(".profile-photo");
const photoCell = document.querySelector(".photo-cell");
const hoverPreviews = document.querySelectorAll("[data-hover-preview]");

document.querySelectorAll("a[href]").forEach((link) => {
  const href = (link.getAttribute("href") || "").trim();

  if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
    return;
  }

  link.setAttribute("target", "_blank");

  if (!href.startsWith("mailto:")) {
    link.setAttribute("rel", "noreferrer");
  }
});

if (profilePhoto && photoCell) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.classList.add("is-missing");
    photoCell.classList.add("is-missing");
  });
}

hoverPreviews.forEach((preview) => {
  const video = preview.querySelector(".entry-preview-video");
  const source = video?.querySelector("source");

  if (!video || !source || !source.getAttribute("src")) {
    return;
  }

  let wantsPlayback = false;
  let playbackToken = 0;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.loop = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("loop", "");

  try {
    video.load();
  } catch (error) {
    // Ignore browsers that do not allow an explicit load call here.
  }

  const attemptPlay = () => {
    if (!wantsPlayback) {
      return;
    }

    if (video.readyState < 2) {
      try {
        video.load();
      } catch (error) {
        // Ignore browsers that block explicit loads here.
      }
      return;
    }

    const token = ++playbackToken;
    const playPromise = video.play();

    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          if (wantsPlayback && token === playbackToken) {
            preview.classList.add("is-playing");
          }
        })
        .catch(() => {
          if (token === playbackToken) {
            preview.classList.remove("is-playing");
          }
        });
      return;
    }

    preview.classList.add("is-playing");
  };

  const playPreview = () => {
    wantsPlayback = true;

    try {
      video.currentTime = 0;
    } catch (error) {
      // Ignore browsers that do not allow rewinding before playback starts.
    }

    attemptPlay();
  };

  const stopPreview = () => {
    wantsPlayback = false;
    playbackToken += 1;
    preview.classList.remove("is-playing");
    video.pause();

    try {
      video.currentTime = 0;
    } catch (error) {
      // Ignore browsers that block resetting the video time here.
    }
  };

  video.addEventListener("playing", () => {
    if (wantsPlayback) {
      preview.classList.add("is-playing");
    }
  });
  video.addEventListener("pause", () => {
    if (!wantsPlayback) {
      preview.classList.remove("is-playing");
    }
  });
  video.addEventListener("error", () => {
    preview.classList.remove("is-playing");
  });
  video.addEventListener("loadeddata", attemptPlay);
  video.addEventListener("canplay", attemptPlay);
  preview.addEventListener("pointerenter", playPreview);
  preview.addEventListener("pointerleave", stopPreview);
  preview.addEventListener("focusin", playPreview);
  preview.addEventListener("focusout", stopPreview);
});

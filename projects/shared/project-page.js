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

window.copyBibTeX = function copyBibTeX() {
  const bibtexElement = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  const copyText = button?.querySelector(".copy-text");

  if (!bibtexElement || !button || !copyText) {
    return;
  }

  const showStatus = (label) => {
    copyText.textContent = label;
    window.setTimeout(() => {
      copyText.textContent = "Copy";
    }, 1800);
  };

  const copyWithFallback = () => {
    const textArea = document.createElement("textarea");
    textArea.value = bibtexElement.textContent.trim();
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      showStatus("Copied");
    } catch (error) {
      showStatus("Failed");
    } finally {
      document.body.removeChild(textArea);
    }
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(bibtexElement.textContent.trim())
      .then(() => {
        showStatus("Copied");
      })
      .catch(() => {
        copyWithFallback();
      });
    return;
  }

  copyWithFallback();
};

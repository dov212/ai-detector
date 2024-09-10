const getPages = function () {
    const pages = document.querySelectorAll(
        ".kix-canvas-tile-content:not(.kix-canvas-tile-selection) > svg"
    );
    
    if (!pages.length) throw new Error("No pages found");

    return pages;
};

const getTextRects = function () {
    const rects = document.querySelectorAll(
        ".kix-canvas-tile-content g[data-section-type='body'][role='paragraph'] > rect"
    );

    if (!rects.length) throw new Error("No text rects found");

    return rects;
};

const handleEdits = function (mutationsList, observer) {
    // if (document) {
        mutationsList.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const ariaLabel = node.getAttribute('aria-label');
                        
                        if (ariaLabel !== null) {
                            console.log("Added node with aria-label:", node);
                            console.log("aria-label:", ariaLabel);
                        }
                    }
                });
            }
        });
    // }
}

const init = function () {
    const parentElement = document.querySelectorAll(
        ".kix-rotatingtilemanager-content"
    );
    
    const observer = new MutationObserver((mutationsList, observer) => {
        handleEdits(mutationsList, observer);
      });
      
      const config = {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      };
      
      parentElement.forEach((node) => {
        observer.observe(node, config);
      });

    // handleEdits();
}


// document.addEventListener("DOMContentLoaded", function () {
//     console.log("banana");
//     init();
// });

window.onload = function () {
    console.log("potato");

    // const pages = getPages();
    const textRects = getTextRects();
    
    console.log("textRects", textRects);


    init();
};
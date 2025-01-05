{
    /** @type {HTMLDialogElement} */
    const dialog = document.getElementById("video-dialog");
    const dialog_loader = dialog.querySelector(".loader");
    let timeout_show_loader;

    /**
     * @param {string} video_id
     * @param {string?} video_start
     * @param {string?} clip_id
     * @param {string?} clipt
     */
    const open_video_dialog = (video_id, video_start, clip_id, clipt) => {
        let video_iframe = dialog.querySelector("iframe");
        if (video_start != null) {
            video_iframe.src = `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1&start=${video_start}`;
        } else if (clip_id != null && clipt != null) {
            video_iframe.src = `https://www.youtube.com/embed/${video_id}?autoplay=1&clip=${clip_id}&clipt=${clipt}`;
        } else {
            video_iframe.src = `https://www.youtube-nocookie.com/embed/${video_id}?autoplay=1`;
        }
        dialog.showModal();
        timeout_show_loader = setTimeout(() => dialog_loader.style.visibility = "visible", 500);
    }

    /**
     * @type EventListener
     */
    const handle_video_click = (ev) => {
        const video_id = ev.currentTarget.getAttribute("data-video_id");
        const video_start = ev.currentTarget.getAttribute("data-video_start");
        const clip_id = ev.currentTarget.getAttribute("data-clip_id");
        const clipt = ev.currentTarget.getAttribute("data-clipt");
        open_video_dialog(video_id, video_start, clip_id, clipt);
    }

    dialog.addEventListener("pointerdown", (e) => {
        if (e.target === dialog) {
            window.addEventListener("pointerup", (e) => {
                if (e.target === dialog) {
                    dialog.close();
                }
            }, { once: true });
        }
    });
    dialog.addEventListener("close", () => {
        const video_iframe = dialog.querySelector("iframe");
        video_iframe.src = "";
        clearTimeout(timeout_show_loader);
        dialog_loader.style.visibility = "hidden";
    });
    dialog.querySelector(".dialog-close-button").addEventListener("click", () => dialog.close());

    /** 
     * @type {HTMLTemplateElement} 
     * 
     * For the Messages page.
     * */
    const messages = document.getElementById("messages-template");
    if (messages != null && messages.content != null) {
        for (const el of messages.content.querySelectorAll('.video.placeholder')) {
            el.addEventListener('click', handle_video_click);
        }
    };

    /**
     * For the Timeline page.
     */
    for (const el of document.querySelectorAll('.video.placeholder')) {
        el.addEventListener('click', handle_video_click);
    }
}

{
    /** @type {HTMLDialogElement} */
    const dialog = document.getElementById("img-dialog");
    const dialog_loader = dialog.querySelector(".loader");
    let timeout_show_loader;

    /**
     * @param {string} img_src
     * @param {number} width
     * @param {number} height
     */
    const open_img_dialog = (img_src, width, height) => {
        const img_el = dialog.querySelector("img");
        img_el.src = img_src;
        img_el.width = width;
        img_el.height = height;
        const close_box = dialog.querySelector(".close-box");
        close_box.style.aspectRatio = `${width} / ${height}`;
        dialog.showModal();
        timeout_show_loader = setTimeout(() => dialog_loader.style.visibility = "visible", 500);
    }

    /**
     * @type EventListener
     */
    const handle_img_click = (ev) => {
        const img_src = ev.currentTarget.getAttribute("data-full-img");
        const img_width = ev.currentTarget.getAttribute("data-full-width");
        const img_height = ev.currentTarget.getAttribute("data-full-height");
        open_img_dialog(img_src, img_width, img_height);
    }

    dialog.addEventListener("pointerdown", (e) => {
        if (e.target === dialog) {
            window.addEventListener("pointerup", (e) => {
                if (e.target === dialog) {
                    dialog.close();
                }
            }, { once: true });
        }
    });
    dialog.addEventListener("close", () => {
        const img_el = dialog.querySelector("img");
        img_el.src = "";
        clearTimeout(timeout_show_loader);
        dialog_loader.style.visibility = "hidden";
    });
    dialog.querySelector(".dialog-close-button").addEventListener("click", () => dialog.close());

    /** 
     * @type {HTMLTemplateElement} 
     * 
     * For the Messages page.
     * */
    const messages = document.getElementById("messages-template");
    if (messages != null && messages.content != null) {
        for (const el of messages.content.querySelectorAll(".msg-img")) {
            el.addEventListener("click", handle_img_click);
        }
    };
}

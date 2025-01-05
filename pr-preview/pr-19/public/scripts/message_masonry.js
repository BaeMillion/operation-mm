{
    const msg_container = document.getElementById("msg-container");
    /** @type {HTMLTemplateElement} */
    const messages = document.getElementById("messages-template");
    document.fonts.load("1em Noto Sans");
    document.fonts.load("1em Edo SZ");
    const charset_sans_jp = messages.getAttribute("data-charset-sans-jp");
    const charset_sans_kr = messages.getAttribute("data-charset-sans-kr");
    if (charset_sans_jp) {
        document.fonts.load("1em Noto Sans JP", charset_sans_jp);
    }
    if (charset_sans_kr) {
        document.fonts.load("1em Noto Sans KR", charset_sans_kr);
    }
    document.fonts.ready.then(() => {
        // Normally template content is cloned before placing in the DOM, but in this case
        // the contents are only needed once
        msg_container.replaceChildren(messages.content);
        twemoji.parse(msg_container);
        const message_masonry = new Masonry(msg_container, {
            itemSelector: ".msg",
            gutter: 20,
            fitWidth: true,
            layoutInstant: true,
        });
        if (location.hash) {
            document.querySelector(location.hash).scrollIntoView();
        }
    });
}

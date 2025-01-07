{
    const type_filter = document.getElementById("timeline__typefilter");
    const timeline = document.getElementById("timeline");
    const num_visible_events = document.getElementById("num_visible");
    const timeline_events = Array.from(timeline.children);
    const hidden_types = new Set();

    type_filter.addEventListener("change", function(el) {
        if (el.target.checked) {
            hidden_types.delete(el.target.value);
            const visible_events = new DocumentFragment();
            for (const te of timeline_events) {
                if (!hidden_types.has(te.getAttribute("data-event-type"))) {
                    visible_events.append(te);
                };
            };
            timeline.append(visible_events);
        } else {
            // Hide this event type
            hidden_types.add(el.target.value);
            for (const e of timeline.querySelectorAll(`[data-event-type=${el.target.value}]`)) {
                e.remove();
            };
        };
        num_visible_events.innerText = timeline.children.length;
    });
}

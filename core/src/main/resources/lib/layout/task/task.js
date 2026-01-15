Behaviour.specify("a.task-link-no-confirm", "task-link", 0, function (el) {
  if (el.onclick !== null) {
    return;
  }

  let post = el.dataset.taskPost;
  let callback = el.dataset.callback;
  let success = el.dataset.taskSuccess;
  let failure = el.dataset.taskFailure;
  // Workaround so that `post` links don't have an href set till the click handler is registered
  // Read from data attribute if available, otherwise use the element's href
  let href = el.dataset.taskHref || el.href;

  if (callback !== undefined) {
    el.onclick = function (ev) {
      window[callback](el, ev);
    };
    return;
  }

  if (post === "true") {
    el.onclick = function (ev) {
      fetch(href, {
        method: "post",
        headers: crumb.wrap({}),
      }).then((rsp) => {
        if (rsp.ok) {
          notificationBar.show(success, notificationBar.SUCCESS);
        } else {
          notificationBar.show(failure, notificationBar.ERROR);
        }
      });
      ev.preventDefault();
    };
  }
});

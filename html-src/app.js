(function () {
  "use strict";

  var menuButton = document.getElementById("menuButton");
  var sidebar = document.getElementById("sidebar");
  if (menuButton && sidebar) {
    menuButton.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }

  var filter = document.getElementById("navFilter");
  var nav = document.getElementById("chapterNav");
  if (filter && nav) {
    filter.addEventListener("input", function () {
      var query = filter.value.trim().toLocaleLowerCase("zh-CN");
      nav.querySelectorAll("a").forEach(function (link) {
        link.hidden = Boolean(query) && !link.textContent.toLocaleLowerCase("zh-CN").includes(query);
      });
    });
  }

  document.querySelectorAll(".code-block pre").forEach(function (pre) {
    var button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.textContent = "复制";
    button.setAttribute("aria-label", "复制代码；不会执行");
    button.addEventListener("click", function () {
      var text = pre.textContent;
      var done = function () {
        button.textContent = "已复制";
        window.setTimeout(function () { button.textContent = "复制"; }, 1400);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        var area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
        done();
      }
    });
    pre.parentElement.appendChild(button);
  });
}());

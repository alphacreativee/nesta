export function onImagesReady(container, callback) {
  const images = container.querySelectorAll("img");
  let loaded = 0;

  if (!images.length) {
    callback();
    return;
  }

  images.forEach((img) => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === images.length) callback();
      });
    }
  });

  if (loaded === images.length) callback();
}

export function setOfferDescHeightAfterAjax(container) {
  const items = container.querySelectorAll(".offer-item");
  if (!items.length) return;

  // mobile → clear
  if (window.innerWidth < 992) {
    items.forEach((item) => item.style.removeProperty("--height-desc"));
    return;
  }

  items.forEach((item) => {
    const desc = item.querySelector(".content-desc");
    if (!desc) return;

    item.style.setProperty("--height-desc", `${desc.offsetHeight}px`);
  });
}

export function listPostFilter() {
  if ($(".list-post-filter").length < 1) return;

  let wrapper = $(".list-post-filter");
  let currentTerm = "all";
  let currentPage = 1;
  let isLoading = false;

  let functionFilter = "filter_offers";
  if (wrapper.hasClass("new")) {
    functionFilter = "filter_news";
  } else if (wrapper.hasClass("experience")) {
    functionFilter = "filter_experiences";
  }

  let fixedLocation =
    typeof window.EXPERIENCE_FILTER_LOCATION === "number"
      ? window.EXPERIENCE_FILTER_LOCATION
      : "all";

  function loadOffers(term, page = 1) {
    if (isLoading) return;
    isLoading = true;

    $.ajax({
      url: ajaxUrl,
      type: "POST",
      data: {
        action: functionFilter,
        term: term,
        page: page,
        location: fixedLocation
      },
      beforeSend() {
        $(".list-post-filter .list-post").addClass("is-loading");
      },
      success(res) {
        if (!res.success) return;

        const $wrapper = $(".list-post-filter");

        const $list = $(".list-post-filter .list-post");

        $list.html(res.data.posts);
        $wrapper.find(".pagination").remove();
        $list.after(res.data.pagination);

        if (wrapper.hasClass("offer")) {
          onImagesReady($list[0], () => {
            setOfferDescHeightAfterAjax($list[0]);
          });
        }

        currentPage = page;
      },
      complete() {
        $(".list-post-filter .list-post").removeClass("is-loading");
        isLoading = false;
      }
    });
  }

  // FILTER CLICK
  $(document).on(
    "click",
    ".list-post-filter .filter-button,.list-post-filter .dropdown-custom-item span",
    function () {
      const tab = $(this).data("tab");

      console.log(tab);

      if (!tab) return;

      currentTerm = tab === "all" ? "all" : tab.replace("post-category-", "");

      currentPage = 1;

      $(".list-post-filter .filter-button").removeClass("active");
      $('.list-post-filter .filter-button[data-tab="' + tab + '"]').addClass(
        "active"
      );

      loadOffers(currentTerm, 1);
    }
  );

  // PAGINATION CLICK
  $(document).on("click", ".list-post-filter .pagination a", function (e) {
    e.preventDefault();

    const page = $(this).text();
    if (!page) return;

    loadOffers(currentTerm, parseInt(page));
  });

  if (wrapper.hasClass("experience") && fixedLocation !== "all") {
    loadOffers("all", 1);
  }
}

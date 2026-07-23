export function createFilterTab() {
  document.querySelectorAll(".filter-section").forEach((section) => {
    const result = section.nextElementSibling;
    if (!result?.classList.contains("filter-section-result")) return;

    const buttons = section.querySelectorAll(".filter-button[data-type]");

    // Đảm bảo có ít nhất 1 button active khi load
    if (!section.querySelector(".filter-button.active")) {
      buttons[0]?.classList.add("active");

      // Filter ngay khi load nếu button đầu tiên không phải "all"
      const firstType = buttons[0]?.dataset.type;
      if (firstType && firstType !== "all") {
        result.querySelectorAll(".filter-item").forEach((item) => {
          item.style.display = item.dataset.filter === firstType ? "" : "none";
        });
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        section
          .querySelectorAll(".filter-button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const type = this.dataset.type;
        const items = result.querySelectorAll(".filter-item");

        ScrollTrigger.getAll().forEach((st) => st.disable());

        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 })
          .call(() => {
            items.forEach((item) => {
              // Hỗ trợ cả có và không có "all"
              if (type === "all") {
                item.style.display = "";
              } else {
                item.style.display = item.dataset.filter === type ? "" : "none";
              }
            });
          })
          .to(result, { autoAlpha: 1, duration: 0.3 })
          .call(() => {
            ScrollTrigger.getAll().forEach((st) => st.enable());
            ScrollTrigger.refresh();
          });
      });
    });
  });
}

export function createFilterTabMulti() {
  document
    .querySelectorAll(".filter-section-multi, .tab-section")
    .forEach((section) => {
      let result;

      // Tìm filter-section-result theo thứ tự ưu tiên
      const targetSelector = section.dataset.target;
      if (targetSelector) {
        result = document.querySelector(targetSelector);
      } else {
        result = section.querySelector(".filter-section-result");
        if (!result) {
          result = section.nextElementSibling;
          if (!result?.classList.contains("filter-section-result")) return;
        }
      }

      if (!result) return;

      const buttons = section.querySelectorAll(".filter-button[data-type]");

      // Chỉ cần check và filter lần đầu nếu có button active
      const activeBtn = section.querySelector(".filter-button.active");
      if (activeBtn) {
        const activeType = activeBtn.dataset.type;
        if (activeType !== "all") {
          result.querySelectorAll(".filter-item").forEach((item) => {
            item.style.display = item.classList.contains(activeType)
              ? ""
              : "none";
          });
        }
      }

      buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
          section
            .querySelectorAll(".filter-button")
            .forEach((b) => b.classList.remove("active"));
          this.classList.add("active");

          const type = this.dataset.type;
          const items = result.querySelectorAll(".filter-item");

          gsap
            .timeline()
            .to(result, { autoAlpha: 0, duration: 0.3 })
            .call(() => {
              items.forEach((item) => {
                if (type === "all") {
                  item.style.display = "";
                } else {
                  item.style.display = item.classList.contains(type)
                    ? ""
                    : "none";
                }
              });
            })
            .to(result, { autoAlpha: 1, duration: 0.3 });
        });
      });
    });
}

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

// export function listPostFilter() {
//   if ($(".list-post-filter").length < 1) return;

//   let wrapper = $(".list-post-filter");
//   let currentTerm = "all";
//   let currentPage = 1;
//   let isLoading = false;

//   let functionFilter = "filter_offers";
//   if (wrapper.hasClass("new")) {
//     functionFilter = "filter_news_new";
//   } else if (wrapper.hasClass("experience")) {
//     functionFilter = "filter_experiences";
//   } else if (wrapper.hasClass("event")) {
//     functionFilter = "filter_events";
//   } else if (wrapper.hasClass("destination")) {
//     functionFilter = "filter_destination";
//   }

//   // Lấy location cố định tùy theo loại wrapper
//   let fixedLocation = "all";
//   if (wrapper.hasClass("experience")) {
//     fixedLocation =
//       typeof window.EXPERIENCE_FILTER_LOCATION === "number"
//         ? window.EXPERIENCE_FILTER_LOCATION
//         : "all";
//   } else if (wrapper.hasClass("destination")) {
//     fixedLocation =
//       typeof window.DESTINATION_FILTER_LOCATION === "number"
//         ? window.DESTINATION_FILTER_LOCATION
//         : "all";
//   }

//   function loadOffers(term, page = 1) {
//     if (isLoading) return;
//     isLoading = true;

//     $.ajax({
//       url: ajaxUrl,
//       type: "POST",
//       data: {
//         action: functionFilter,
//         term: term,
//         page: page,
//         location: fixedLocation,
//       },
//       beforeSend() {
//         $(".list-post-filter .list-post").addClass("is-loading");
//       },
//       success(res) {
//         if (!res.success) return;

//         const $wrapper = $(".list-post-filter");
//         const $list = $(".list-post-filter .list-post");

//         $list.html(res.data.posts);
//         $wrapper.find(".pagination").remove();
//         $list.after(res.data.pagination);

//         if (wrapper.hasClass("offer")) {
//           onImagesReady($list[0], () => {
//             setOfferDescHeightAfterAjax($list[0]);
//           });
//         }

//         currentPage = page;
//       },
//       complete() {
//         $(".list-post-filter .list-post").removeClass("is-loading");
//         isLoading = false;
//       },
//     });
//   }

//   // FILTER CLICK
//   $(document).on(
//     "click",
//     ".list-post-filter .filter-button,.list-post-filter .dropdown-custom-item span",
//     function () {
//       const tab = $(this).data("tab");
//       if (!tab) return;

//       currentTerm = tab === "all" ? "all" : tab.replace("post-category-", "");
//       currentPage = 1;

//       $(".list-post-filter .filter-button").removeClass("active");
//       $('.list-post-filter .filter-button[data-tab="' + tab + '"]').addClass(
//         "active",
//       );

//       loadOffers(currentTerm, 1);
//     },
//   );

//   // PAGINATION CLICK
//   $(document).on("click", ".list-post-filter .pagination a", function (e) {
//     e.preventDefault();

//     const page = $(this).text();
//     if (!page) return;

//     loadOffers(currentTerm, parseInt(page));
//   });

//   // Auto-load lần đầu nếu có location cố định
//   if (
//     (wrapper.hasClass("experience") || wrapper.hasClass("destination")) &&
//     fixedLocation !== "all"
//   ) {
//     loadOffers("all", 1);
//   }
// }

export function listPostFilter() {
  if ($(".list-post-filter").length < 1) return;

  const wrapper = $(".list-post-filter");

  let currentTerm = "all";
  let currentPage = 1;
  let isLoading = false;

  let functionFilter = "filter_offers";

  if (wrapper.hasClass("new")) {
    functionFilter = "filter_news_new";
  } else if (wrapper.hasClass("experience")) {
    functionFilter = "filter_experiences";
  } else if (wrapper.hasClass("event")) {
    functionFilter = "filter_events";
  } else if (wrapper.hasClass("destination")) {
    functionFilter = "filter_destination";
  }

  /**
   * Location chỉ áp dụng cho experience và destination.
   */
  let fixedLocation = "all";

  if (wrapper.hasClass("experience")) {
    fixedLocation =
      typeof window.EXPERIENCE_FILTER_LOCATION === "number"
        ? window.EXPERIENCE_FILTER_LOCATION
        : "all";
  } else if (wrapper.hasClass("destination")) {
    fixedLocation =
      typeof window.DESTINATION_FILTER_LOCATION === "number"
        ? window.DESTINATION_FILTER_LOCATION
        : "all";
  }

  /**
   * Chỉ News mới lấy category được chọn từ ACF.
   *
   * Ví dụ:
   * data-category-ids="2,5,8"
   */
  const categoryIds = wrapper.hasClass("new")
    ? wrapper.attr("data-category-ids") || ""
    : "";

  function loadOffers(term, page = 1) {
    if (isLoading) return;

    isLoading = true;

    const $list = wrapper.find(".list-post");

    /**
     * Data chung cho tất cả trang.
     */
    const ajaxData = {
      action: functionFilter,
      term: term,
      page: page,
      location: fixedLocation
    };

    /**
     * Chỉ gửi category_ids cho trang News mới.
     * Các trang Offer, Experience, Event, Destination không bị ảnh hưởng.
     */
    if (wrapper.hasClass("new")) {
      ajaxData.category_ids = categoryIds;
    }

    $.ajax({
      url: ajaxUrl,
      type: "POST",
      dataType: "json",
      data: ajaxData,

      beforeSend() {
        $list.addClass("is-loading");
      },

      success(res) {
        if (!res || !res.success) return;

        $list.html(res.data.posts);

        wrapper.find(".pagination").remove();

        if (res.data.pagination) {
          $list.after(res.data.pagination);
        }

        if (wrapper.hasClass("offer")) {
          onImagesReady($list[0], () => {
            setOfferDescHeightAfterAjax($list[0]);
          });
        }

        currentPage = page;
      },

      error(xhr) {
        console.error("Filter AJAX error:", xhr.responseText);
      },

      complete() {
        $list.removeClass("is-loading");
        isLoading = false;
      }
    });
  }

  /**
   * Filter desktop và mobile.
   */
  $(document).on(
    "click",
    ".list-post-filter .filter-button, .list-post-filter .dropdown-custom-item span",
    function () {
      const $item = $(this);
      const tab = $item.data("tab");

      if (!tab) return;

      currentTerm =
        tab === "all" ? "all" : String(tab).replace("post-category-", "");

      currentPage = 1;

      wrapper.find(".filter-button").removeClass("active");

      wrapper.find('.filter-button[data-tab="' + tab + '"]').addClass("active");

      /**
       * Cập nhật nội dung dropdown mobile.
       */
      if ($item.closest(".dropdown-custom-item").length) {
        const label = $.trim($item.text());

        wrapper
          .find(".dropdown-custom .value-select span")
          .attr("data-tab", tab)
          .text(label);
      }

      loadOffers(currentTerm, 1);
    }
  );

  /**
   * Pagination.
   */
  $(document).on("click", ".list-post-filter .pagination a", function (e) {
    e.preventDefault();

    const $link = $(this);

    /**
     * Ưu tiên data-page.
     */
    let page = parseInt($link.data("page"), 10);

    /**
     * Nếu link số không có data-page.
     */
    if (!page) {
      page = parseInt($.trim($link.text()), 10);
    }

    /**
     * Hỗ trợ nút next/prev có href nhưng không có số trong text.
     */
    if (!page) {
      const href = $link.attr("href") || "";

      const pageMatch =
        href.match(/\/page\/(\d+)/) || href.match(/[?&](?:paged|page)=(\d+)/);

      if (pageMatch) {
        page = parseInt(pageMatch[1], 10);
      }
    }

    if (!page || Number.isNaN(page)) return;

    loadOffers(currentTerm, page);
  });

  /**
   * Auto-load chỉ áp dụng cho Experience và Destination.
   */
  if (
    (wrapper.hasClass("experience") || wrapper.hasClass("destination")) &&
    fixedLocation !== "all"
  ) {
    loadOffers("all", 1);
  }
}

export function filterDropdownBoostrapMobile() {
  if ($(".filter-dropdown").length < 1 || $(window).width() > 991) return;

  $(".filter-dropdown .dropdown-custom-item").on("click", function () {
    const span = $(this).find("span");
    if (!span.length) return;

    const tabId = span.data("tab");

    const trigger = $(`[data-bs-target="#${tabId}"]`);
    if (trigger.length) {
      const tab = new bootstrap.Tab(trigger[0]);
      tab.show();
    }
  });
}

export function filterDropdownMobile() {
  if ($(".filter-list-button").length < 1) return;

  const filterListButton = $(".filter-list-button");
  const dropdownMobile = filterListButton.siblings(".filter-dropdown");
  const dropdownItemsMobile = dropdownMobile.find(".dropdown-custom-item");

  const isPageAccommodations =
    $(".section-accommodation, .destination-location").length > 0;

  dropdownItemsMobile.on("click", function () {
    const thisDataTab = $(this).find("span").data("tab");

    if (isPageAccommodations) {
      filterListButton
        .find(`.filter-button[data-type="${thisDataTab}"]`)
        .trigger("click");
    } else {
      filterListButton
        .find(`.filter-button[data-tab="${thisDataTab}"]`)
        .trigger("click");
    }
  });
}

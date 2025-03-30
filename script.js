const sideBar = document.querySelector(".sidebar");
const page1 = document.querySelector(".personal-info-container");
const page2 = document.querySelector(".plan-container");
const allPlans = document.querySelector(".all-plans-container");
const page3 = document.querySelector(".add-ons-container");
const allAddOns = document.querySelectorAll(".add-ons");
const page4 = document.querySelector(".summary-container");
const page5 = document.querySelector(".message");
const allIcon = document.querySelectorAll(".icon");
const icon1 = document.querySelector(".icon1");
const icon2 = document.querySelector(".icon2");
const icon3 = document.querySelector(".icon3");
const icon4 = document.querySelector(".icon4");
const planchangerbox = document.querySelector(".switch");
const switchBallMonthly = document.querySelector(".switch-ball-monthly");
const switchBallyearly = document.querySelector(".switch-ball-yearly");
const arcadePrice = document.querySelector(".arcade-price");
const advancedPrice = document.querySelector(".advanced-price");
const proPrice = document.querySelector(".pro-price");
const extrabenefits = document.querySelectorAll(".extrabenefits");
const onlineAddOnsValue = document.querySelector(".online-addons-value");
const storageAddOnsValue = document.querySelector(".storage-addons-value");
const CustomProfileAddOnsValue = document.querySelector(".cuatom-Profile-addons-value");
const pageOneNextBtn = document.querySelector(".page-1-btn");
const pageTwoNextBtn = document.querySelector(".page-2-btn");
const pageThreeNextBtn = document.querySelector(".page-3-btn");
const pageFourNextBtn = document.querySelector(".page-4-btn");
const page2BackBtn = document.querySelector(".page-2-back");
const page3BackBtn = document.querySelector(".page-3-back");
const page4BackBtn = document.querySelector(".page-4-back");
const planBox = document.querySelectorAll(".plan");
const loading = document.querySelector(".loading-container");
const personalInfoPageInputBox = document.querySelectorAll(".personal-info-container input");


personalInfoPageInputBox.forEach((curr) => {
  curr.addEventListener("focus", () => {
    curr.style.border = "";
  });
});

function showingLoading() {
  loading.classList.remove('d-none')
  page1.classList.add("d-none");
  page2.classList.add("d-none");
  page3.classList.add("d-none");
  page4.classList.add("d-none");
  page5.classList.add("d-none");
}

pageOneNextBtn.addEventListener("click", () => {
  const emailBox = document.querySelector(".email");
  const nameBox = document.querySelector(".name");
  const numberBox = document.querySelector(".number");
  showingLoading()
  setTimeout(() => {
    const isAllInputFilled = Array.from(personalInfoPageInputBox).every(
      (input) => {
        return input.value.trim() !== "";
      }
    );
  
    if (isAllInputFilled) {
      let isValid = true;
  
      if (/\d/.test(nameBox.value)) {
        nameBox.style.border = "2px solid red";
        isValid = false;
      }
      if (!emailBox.checkValidity()) {
        emailBox.style.border = "2px solid red";
        isValid = false;
      }
      if (numberBox.value.length !== 10) {
        numberBox.style.border = "2px solid red";
        isValid = false;
      }
  
      if (isValid) {
        switchingPage("formpage-2");
      }
    } else {
      personalInfoPageInputBox.forEach((curr) => {
        if (curr.value.trim() === "") {
          curr.style.border = "2px solid red";
        }
        if (curr.value.trim() !== "") {
          curr.removeAttribute("style");
        }
      });
    }
  }, 1000);
});

pageTwoNextBtn.addEventListener("click", () => {
  showingLoading()
  setTimeout(() => {
    const isSelected = Array.from(planBox).some((curr) => {
      return curr.classList.contains("selected-plan");
    });
    if (isSelected) {
      switchingPage("formpage-3");
    } else {
      planBox.forEach((curr) => {
        curr.style.border = '2px solid red'
      })
    }
  }, 1000);
});
pageThreeNextBtn.addEventListener("click", () => {
  showingLoading()
  setTimeout(() => {
    switchingPage("formpage-4");
    generatingBill();
  }, 1000);
});
pageFourNextBtn.addEventListener("click", () => {
  showingLoading()
  setTimeout(() => {
    switchingPage("formpage-5");
  }, 1000);
});

//back btn use
page2BackBtn.addEventListener("click", () => {
  switchingPage("formpage-1");
});
page3BackBtn.addEventListener("click", () => {
  switchingPage("formpage-2");
});
page4BackBtn.addEventListener("click", () => {
  switchingPage("formpage-3");
});

function switchingPage(page) {
  loading.classList.add('d-none')
  page1.classList.add("d-none");
  page2.classList.add("d-none");
  page3.classList.add("d-none");
  page4.classList.add("d-none");
  page5.classList.add("d-none");
  allIcon.forEach((curr) => {
    curr.style.backgroundColor = "transparent";
    curr.style.color = "white";
  });

  if (page === "formpage-1") {
    page1.classList.remove("d-none");
    icon1.style.backgroundColor = "hsl(206, 94%, 87%)";
    icon1.style.color = "black";
  } else if (page === "formpage-2") {
    page2.classList.remove("d-none");
    icon2.style.backgroundColor = "hsl(206, 94%, 87%)";
    icon2.style.color = "black";
  } else if (page === "formpage-3") {
    page3.classList.remove("d-none");
    icon3.style.backgroundColor = "hsl(206, 94%, 87%)";
    icon3.style.color = "black";

    if (sessionStorage.getItem("plan") === "Yearly") {
      onlineAddOnsValue.textContent = "+$10/yr";
      storageAddOnsValue.textContent = "+$20/yr";
      CustomProfileAddOnsValue.textContent = "+$30/yr";
    } else if (sessionStorage.getItem("plan") === "Monthly") {
      onlineAddOnsValue.textContent = "+$1/mo";
      storageAddOnsValue.textContent = "+$2/mo";
      CustomProfileAddOnsValue.textContent = "+$3/mo";
    }
  } else if (page === "formpage-4") {
    page4.classList.remove("d-none");
    icon4.style.backgroundColor = "hsl(206, 94%, 87%)";
    icon4.style.color = "black";
  }
  else if(page === 'formpage-5') {
    page5.classList.remove('d-none')
  }
}

switchingPage("formpage-1");

// switch use in switching plan
sessionStorage.clear();
sessionStorage.setItem("plan", "Monthly");
function switchingPlan() {
  if (switchBallMonthly.classList.contains("hide-using-opacity")) {
    planBox.forEach((curr) => {
      curr.style.paddingBlock = "10px";
    });

    arcadePrice.textContent = "$90/yr";
    advancedPrice.textContent = "$120/yr";
    proPrice.textContent = "$150/yr";

    extrabenefits.forEach((curr) => {
      curr.classList.toggle("hide");
    });

    sessionStorage.setItem("plan", "Yearly");
  } else if (switchBallyearly.classList.contains("hide-using-opacity")) {
    planBox.forEach((curr) => {
      curr.style.paddingBlock = "20px";
    });

    arcadePrice.textContent = "$9/mo";
    advancedPrice.textContent = "$12/mo";
    proPrice.textContent = "$15/mo";

    extrabenefits.forEach((curr) => {
      curr.classList.toggle("hide");
    });

    sessionStorage.setItem("plan", "Monthly");
  }
}

planchangerbox.addEventListener("click", () => {
  switchBallMonthly.classList.toggle("hide-using-opacity");
  switchBallyearly.classList.toggle("hide-using-opacity");
  switchingPlan();
});

function deselectingPlan() {
  planBox.forEach((curr) => {
    curr.style.border = "1px solid hsl(231, 11%, 63%)";
    curr.style.backgroundColor = "transparent";
    curr.classList.remove("selected-plan");
    curr.children[1].children[1].classList.remove("selected-plan-price");
  });
}

planBox.forEach((curr) => {
  curr.addEventListener("click", (e) => {
    deselectingPlan();
    curr.style.backgroundColor = "hsl(217, 100%, 97%)";
    curr.style.border = "2px solid hsl(243, 100%, 62%)";
    curr.classList.add("selected-plan");
    curr.children[1].children[1].classList.add("selected-plan-price");
    sessionStorage.setItem(
      "planName",
      curr.children[1].children[0].textContent
    );
  });
});

allAddOns.forEach((curr, index) => {
  curr.addEventListener("click", (e) => {
    if (e.target.closest(".selected-add-ons")) {
      curr.style.backgroundColor = "transparent";
      curr.style.border = "1px solid hsl(231, 11%, 63%)";
      curr.children[1].classList.add("hide");
      curr.children[0].classList.remove("hide");
      curr.classList.remove("selected-add-ons");
      if(index === 0) {
        document.querySelector(".total-online-addOns").children[0].textContent = ''
      }
      else if(index === 1) {
        document.querySelector(".total-storage-addOns").children[0].textContent = ''
      }
      else if(index === 2) {
        document.querySelector(".total-custom-addOns").children[0].textContent = ''
      }
    } else {
      curr.style.backgroundColor = "hsl(217, 100%, 97%)";
      curr.style.border = "2px solid hsl(243, 100%, 62%)";
      curr.children[1].classList.remove("hide");
      curr.children[0].classList.add("hide");
      curr.classList.add("selected-add-ons");
    }
  });
});

function generatingBill() {
  const planName = document.querySelector(".plan-name");
  planName.textContent = sessionStorage.getItem("planName");

  const planDuration = document.createElement("span");
  planDuration.textContent = sessionStorage.getItem("plan");
  planName.append(" ", "(", planDuration, ")");

  const totalPlanPrice = document.querySelector(".total-plan-price");
  const selectedPlanPrice = document.querySelector(".selected-plan-price");
  totalPlanPrice.textContent = selectedPlanPrice.textContent;

  if (onlineAddOnsValue.parentElement.classList.contains("selected-add-ons")) {
    document.querySelector(".total-online-addOns").children[0].textContent =
      onlineAddOnsValue.textContent;
    document
      .querySelector(".total-online-addOns")
      .parentElement.classList.remove("d-none");
  } else {
    document
      .querySelector(".total-online-addOns")
      .parentElement.classList.add("d-none");
  }

  if (storageAddOnsValue.parentElement.classList.contains("selected-add-ons")) {
    document.querySelector(".total-storage-addOns").children[0].textContent =
      storageAddOnsValue.textContent;
    document
      .querySelector(".total-storage-addOns")
      .parentElement.classList.remove("d-none");
  } else {
    document
      .querySelector(".total-storage-addOns")
      .parentElement.classList.add("d-none");
  }

  if (
    CustomProfileAddOnsValue.parentElement.classList.contains(
      "selected-add-ons"
    )
  ) {
    document.querySelector(".total-custom-addOns").children[0].textContent =
      CustomProfileAddOnsValue.textContent;
    document
      .querySelector(".total-custom-addOns")
      .parentElement.classList.remove("d-none");
  } else {
    document
      .querySelector(".total-custom-addOns")
      .parentElement.classList.add("d-none");
  }

  const grandTotal = document.querySelector(".total-value");
  let planDurationShort = "";
  let planDurationLong = "";
  if (sessionStorage.getItem("plan") === "Yearly") {
    planDurationShort = "yr";
    planDurationLong = "(per year)";
  } else {
    planDurationShort = "mo";
    planDurationLong = "(per month)";
  }
  const totalCartValue = document.querySelector(".total-cart-value");
  grandTotal.textContent = `
        $${
          parseFloat(totalPlanPrice.textContent.replace(/[^0-9.]/g, "")) +
          getNumericValue(".total-storage-addOns") +
          getNumericValue(".total-online-addOns") +
          getNumericValue(".total-custom-addOns")
        }/${planDurationShort}
  `;
  totalCartValue.children[0].textContent = planDurationLong;
}

function getNumericValue(selector) {
  const element = document.querySelector(selector);
  if (!element.textContent) {
    return 0;
  }
  return parseFloat(element.textContent.replace(/[^0-9.]/g, ""));
}

// change link
const planChangeLink = document.querySelector('.change-plan-link')
planChangeLink.addEventListener('click', (e) => {
  e.preventDefault()
  switchingPage('formpage-2')
})


// for accessing click on sidebar
// sideBar.addEventListener("click", (e) => {
//   if (e.target.closest(".formpage-1")) {
//     switchingPage("formpage-1");
//   } else if (e.target.closest(".formpage-2")) {
//     switchingPage("formpage-2");
//   } else if (e.target.closest(".formpage-3")) {
//     switchingPage("formpage-3");
//   } else if (e.target.closest(".formpage-4")) {
//     switchingPage("formpage-4");
//   }
// });
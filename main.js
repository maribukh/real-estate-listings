let useUsd = true;

function renderProducts(a) {
  document.getElementById("products").innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    document.getElementById("products").innerHTML += `
    <div class="card">
  <div class="top relative">
    <img class="productImg" src="${a[i].img}" alt="" />
    <div class="icons-container">
      <div class="left-side">
        <img src="./asset/icon/rocket.svg" alt="" />
        <p>S-VIP</p>
      </div>
      <div class="right-side">
        <span onclick="deletCard(this)" class="material-symbols-outlined">
          close
        </span>
      </div>
    </div>
  </div>
  <div class="bottom-container">
    <div class="price-container">
      <h3>
        ${a[i].priceGel}<span>${a[i].currency}</span>
      </h3>
      <div class="currency">
        <button class="GEO">₾</button>
        <button class="USD">$</button>
      </div>
    </div>
    <p class="description">${a[i].description}</p>
    <div class="location">
      <img src="./asset/icon/location.png" alt="" />
      <p>${a[i].location}</p>
    </div>
    <ul>
      <li id="step">
        <img src="./asset/icon/state.png" alt="" />
        <span id="steps">${a[i].step}</span>
      </li>
      <li id="room">
        <span class="material-symbols-outlined">door_front</span>
        ${a[i].room}
      </li>
      <li id="bed">
        <span class="material-symbols-outlined">king_bed</span>
        ${a[i].bed}
      </li>
      <li id="area">
        <span class="material-symbols-outlined">fullscreen</span>
        <p>${a[i].area}/მ</p>
        <sup>2</sup>
      </li>
    </ul>
    <div class="bottom">
      <div class="place">${a[i].place}</div>
      <div class="time">
        <img src="./asset/icon/time.png" alt="" />
        <span>${a[i].time}</span>
      </div>
    </div>
  </div>
</div>
    `;
  }
}

function inc() {
  let sortPricing;
  if (useUsd) {
    sortPricing = products.sort(
      (a, b) => a.numberOfPriceUsd - b.numberOfPriceUsd
    );
  } else {
    sortPricing = products.sort(
      (a, b) => a.numberOfPriceGel - b.numberOfPriceGel
    );
  }
  renderProducts(sortPricing);
  init();
}

function dec() {
  let sortPricing;
  if (useUsd) {
    sortPricing = products.sort(
      (a, b) => b.numberOfPriceUsd - a.numberOfPriceUsd
    );
  } else {
    sortPricing = products.sort(
      (a, b) => b.numberOfPriceGel - a.numberOfPriceGel
    );
  }
  renderProducts(sortPricing);
  init();
}
// fillter products

function fillter() {
  let mn = parseInt(document.querySelector("#minPrice").value);
  let mx = parseInt(document.querySelector("#maxPrice").value);
  let search = document.querySelector("input[type='search']").value;

  let filtered_products;

  if (useUsd) {
    if (search && mn && mx) {
      filtered_products = products.filter(
        (x) =>
          x.numberOfPriceUsd >= mn &&
          x.numberOfPriceUsd <= mx &&
          x.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    } else if (mn && mx) {
      filtered_products = products.filter(
        (x) => x.numberOfPriceUsd >= mn && x.numberOfPriceUsd <= mx
      );
    } else if (search) {
      filtered_products = products.filter((x) =>
        x.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }
  } else {
    if (search && mn && mx) {
      filtered_products = products.filter(
        (x) =>
          x.numberOfPriceGel >= mn &&
          x.numberOfPriceGel <= mx &&
          x.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    } else if (mn && mx) {
      filtered_products = products.filter(
        (x) => x.numberOfPriceGel >= mn && x.numberOfPriceGel <= mx
      );
    } else if (search) {
      filtered_products = products.filter((x) =>
        x.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }
  }

  renderProducts(filtered_products);
}

// search function

function search(value) {
  let filltered_products = products.filter((x) =>
    x.description.toLowerCase().includes(value.toLowerCase())
  );

  renderProducts(filltered_products);
}

// delete function

function deletCard(element) {
  let card = element.parentElement.parentElement.parentElement.parentElement;
  let img = card.querySelector("img").src;
  let description = card.querySelector(".description").innerText;
  let time = card.querySelector(".time").innerText;
  let product = products.filter(
    (x) => x.img == img && x.description == description && x.time == time
  );

  products.pop(product);
  card.remove();
}

// change currency

function usdToGel(element) {
  let card = element.closest(".card");
  let index = Array.from(document.querySelectorAll(".card")).indexOf(card);

  card.querySelector(
    "h3"
  ).innerHTML = `${products[index].priceGel} <span>₾</span>`;

  useUsd = false;
}

function GelToUsd(element) {
  let card = element.closest(".card");
  let index = Array.from(document.querySelectorAll(".card")).indexOf(card);

  card.querySelector(
    "h3"
  ).innerHTML = `${products[index].priceUsd} <span>$</span>`;

  useUsd = true;
}

function init() {
  let text = document.querySelectorAll(".GEO");
  let text2 = document.querySelectorAll(".USD");

  text.forEach((element) => {
    element.addEventListener("click", function () {
      usdToGel(element);
    });
  });

  text2.forEach((element) => {
    element.addEventListener("click", function () {
      GelToUsd(element);
    });
  });

  let buttons = document.querySelectorAll(".currency button");

  let gelButtons = document.querySelectorAll(".GEO");

  gelButtons.forEach(function (gelButtons) {
    gelButtons.classList.add("active-button");
  });

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      let card = this.closest(".card");

      let cardButtons = card.querySelectorAll(".currency button");
      cardButtons.forEach(function (cardButton) {
        cardButton.classList.remove("active-button");
      });

      this.classList.add("active-button");
    });
  });
}

document.getElementById("changeCurrently").addEventListener("change", function() {

  useUsd = this.value === "$";
  
  renderProducts(products); 
});


let products = [
  {
    img: "https://api-auction.livo.ge/uploads/auction/images/UbFbbi367e11fd813e77.jpg",
    priceUsd: "26,000",
    priceGel: "71,500",
    numberOfPriceUsd: 26000,
    numberOfPriceGel: 226000,
    currency: "₾",
    description:
      "იყიდება სასოფლო-სამეურნეო მიწის ნაკვეთი მცხეთის მუნიციპალიტეტში",
    location: "მისაქციელის ქუჩა",
    step: "0",
    room: "0",
    bed: "0",
    area: "35",
    areaNumber: 35,
    place: "მისაქციელი",
    time: "25 მარ 15:05",
  },
  {
    img: "https://api-statements.tnet.ge/uploads/202501/20250119/statements/alN1EoT678d30f474b0a.webp",
    priceUsd: "43",
    priceGel: "118.25",
    numberOfPriceUsd: 43,
    numberOfPriceGel: 118.25,
    currency: "₾",
    description: "ქირავდება დღიურად 2 ოთახიანი ბინა საბურთალოზე",
    location: "თამარაშვილის 6",
    step: "9/16",
    room: 2,
    bed: 1,
    area: "60",
    areaNumber: 120,
    place: "საბურთალო",
    time: "25 მარ 15:36",
  },
  {
    img: "https://api-statements.tnet.ge/uploads/202503/20250315/statements/MEbu39u67d591d125ccd.webp",
    priceUsd: "98,900",
    priceGel: "276,300",
    numberOfPriceUsd: 98900,
    numberOfPriceGel: 276300,
    currency: "₾",
    description: "იყიდება 3 ოთახიანი ბინა დიდ დიღომში",
    location: "დემეტრე თავდადებულის ქუჩა 40",
    step: "9/15",
    room: 3,
    bed: 2,
    area: "1,115",
    areaNumber: 1115,
    place: "დიდი დიღომი",
    time: "25 მარ 15:00",
  },
  {
    img: "https://api-statements.tnet.ge/uploads/statements/evczp09664f63c81b0e0.webp",
    priceUsd: "216",
    priceGel: "600",
    numberOfPriceUsd: 216,
    numberOfPriceGel: 600,
    currency: "₾",
    description: "ქირავდება დღიურად 7 ოთახიანი კერძო სახლი დიდ დიღომში",
    location: "დემეტრე თავდადებულის ქუჩა 40",
    step: "3",
    room: 3,
    bed: 2,
    area: "120",
    areaNumber: 120,
    place: "დიდი დიღომი",
    time: "25 მარ 15:00",
  },
  {
    img: "https://api-statements.tnet.ge/uploads/202503/20250322/statements/THE5tm567de80dc2be6e.webp",
    priceUsd: "18",
    priceGel: "50",
    numberOfPriceUsd: 18,
    numberOfPriceGel: 50,
    currency: "₾",
    description: "ქირავდება დღიურად 2 ოთახიანი ბინა საბურთალოზე",
    location: "დემეტრე თავდადებულის ქუჩა 40",
    step: "7",
    room: 7,
    bed: 2,
    area: "60",
    areaNumber: 60,
    place: "საბურთალო",
    time: "25 მარ 16:06",
  },
  {
    img: "https://static.my.ge/myhome/photos/7/7/1/6/0/large/11806177_1.jpg",
    priceUsd: "36",
    priceGel: "100",
    numberOfPriceUsd: 36,
    numberOfPriceGel: 100,
    currency: "₾",
    description: "ქირავდება დღიურად 2 ოთახიანი ბინა საბურთალოზე",
    location: "დემეტრე თავდადებულის ქუჩა 40",
    step: "4",
    room: 2,
    bed: 2,
    area: "35",
    areaNumber: 35,
    place: "საბურთალო",
    time: "25 მარ 16:06",
  },
  {
    img: "https://api-statements.tnet.ge/uploads/202503/20250322/statements/aZjvAbL67de8afe4ce0d.webp",
    priceUsd: "1100",
    priceGel: "3,000",
    numberOfPriceUsd: 1100,
    numberOfPriceGel: 3000,
    currency: "₾",
    description: "ქირავდება დღიურად 7 ოთახიანი კერძო სახლი დიდ დიღომში",
    location: "დემეტრე თავდადებულის ქუჩა 40",
    step: "8",
    room: 3,
    bed: 2,
    area: "95",
    areaNumber: 95,
    place: "ვაკე",
    time: "25 მარ 16:06",
  },
  {
    img: "https://api-statements.tnet.ge/uploads/202409/20240921/statements/YueZcKv66eebe860aebf.webp",
    priceUsd: "26,000",
    priceGel: "71,500",
    numberOfPriceUsd: 26000,
    numberOfPriceGel: 226000,
    currency: "₾",
    description:
      "იყიდება სასოფლო-სამეურნეო მიწის ნაკვეთი მცხეთის მუნიციპალიტეტში",
    location: " N/A",
    step: "8",
    room: 3,
    bed: 2,
    area: "750",
    areaNumber: 750,
    place: "მისაქციელი",
    time: "25 მარ 15:06",
  },
  {
    img: "https://api-statements.tnet.ge/uploads/202410/20241028/statements/N9SBmIZ671f799dc3106.webp",
    priceUsd: "11",
    priceGel: "30,25",
    numberOfPriceUsd: 11,
    numberOfPriceGel: 30.25,
    currency: "₾",
    description: "ქირავდება დღიურად 1 ოთახიანი ბინა ისანში",
    location: "ლეხ კაჩინსკის ქ. 1",
    step: "10",
    room: 1,
    bed: 1,
    area: "30",
    areaNumber: 30,
    place: "ისანი",
    time: "27 მარ 15:08",
  },
  {
    img: "https://api-statements.tnet.ge/uploads/202503/20250318/statements/RCbXpnU67d96ee51efa3.webp",
    priceUsd: "650",
    priceGel: "1,787",
    numberOfPriceUsd: 650,
    numberOfPriceGel: 1787,
    currency: "₾",
    description: "ქირავდება დღიურად 1 ოთახიანი ბინა ისანში",
    location: "შ. ნუცუბიძის ქ.",
    step: "4/15",
    room: 2,
    bed: 1,
    area: "65",
    areaNumber: 65,
    place: "საბურთალო",
    time: "27 მარ 15:08",
  },
  {
    img: "https://static.my.ge/myhome/photos/7/4/1/0/8/large/11180147_2.jpg",
    priceUsd: "14",
    priceGel: "38,5",
    numberOfPriceUsd: 14,
    numberOfPriceGel: 38.5,
    currency: "₾",
    description: "ქირავდება დღიურად 1 ოთახიანი ბინა ბათუმში",
    location: "ხიმშიაშვილის 7ბ",
    step: "34/50",
    room: 2,
    bed: 1,
    area: "33",
    areaNumber: 33,
    place: "ხიმშიაშვილის უბანი",
    time: "27 მარ 11:08",
  },
];

renderProducts(products);
init();

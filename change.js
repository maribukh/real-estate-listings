function test() {
  cnt++;
  if (!changeText) {
    firstText = text.innerHTML;
    text.innerHTML = "changed test !!";
    changeText = true;
  } else {
    text.innerHTML = firstText;
    changeText = false;
  }
  console.log(cnt);

  if (cnt > 3) {
    text.removeEventListener("click", test);
  }
}

let text = document.querySelector(".container p");
let changeText = false;
let firstText = "";
let cnt = 0;

text.addEventListener("click", test);

// text.addEventListener("click", function test() {
//   cnt++;
//   if (!changeText) {
//     firstText = text.innerHTML;
//     text.innerHTML = "changed test !!";
//     changeText = true;
//   } else {
//     text.innerHTML = firstText;
//     changeText = false;
//   }
//   console.log(cnt);

//   if (cnt > 3) {
//     text.removeEventListener("click", test);
//   }
// });

// text.addEventListener("click", () => {
//   cnt++;
//   if (!changeText) {
//     firstText = text.innerHTML;
//     text.innerHTML = "changed test !!";
//     changeText = true;
//   } else {
//     text.innerHTML = firstText;
//     changeText = false;
//   }
//   console.log(cnt);

//   if (cnt > 3) {
//     text.removeEventListener("click", test);
//   }
// });

let input = document.querySelector(".test");

// input.addEventListener("input", () => {
//   console.log(input.value);
// });

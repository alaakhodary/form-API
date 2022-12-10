let displayForm = document.querySelector(".add-icon .icon-plus");
let form = document.querySelector(".form-all");
displayForm.addEventListener("click", function () {
  form.style.display = "block";
});

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // console.log(JSON.parse(xhr.response));
    let data = JSON.parse(xhr.response);
    data.forEach((user) => {
      const markup = `<div class="box">
                        <h1 class="heading">${user.name}</h1>
                        <p class="paragraph">${user.email}</P>
                      </div>`;
      document.querySelector(".box").insertAdjacentHTML("afterend", markup);
    });
  } else if (xhr.readyState === 4 && xhr.status !== 200) {
    throw Error("sth went wrong");
  }
};
xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
xhr.send();

const myForm = document.querySelector(".All-1");
myForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(myForm).entries();
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const result = await response.json();
  console.log(result);
});

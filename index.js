let displayForm = document.querySelector(".add-icon .icon-plus");
let form = document.querySelector(".form-all");
const myForm = document.querySelector(".All-1");
const todoName = document.querySelector(".input-1");
const todoEmail = document.querySelector(".input-2");
const todoList = document.querySelector(".list");
const cancel = document.querySelector(".cancel");

cancel.addEventListener("click", function (e) {
  e.preventDefault();
  form.style.display = "none";
});

displayForm.addEventListener("click", function () {
  form.style.display = "block";
});

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // console.log(JSON.parse(xhr.response));
    let data = JSON.parse(xhr.response);
    data.map(function (user) {
      handelTodo(user);
    });
  } else if (xhr.readyState === 4 && xhr.status !== 200) {
    throw Error("sth went wrong");
  }
};
xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
xhr.send();

myForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: todoName.value,
      email: todoEmail.value,
    }),
  });
  const result = await response.json();
  handelTodo(result);
});

function handelTodo(todo) {
  let h1 = document.createElement("h1");
  let p = document.createElement("p");
  let li = document.createElement("li");
  li.classList.value = "list-item";
  h1.classList.value = "heading";
  p.classList.value = "paragraph";
  h1.textContent = `${todo.name}`;
  p.textContent = `${todo.email}`;
  li.appendChild(h1);
  li.appendChild(p);
  todoList.append(li);
}

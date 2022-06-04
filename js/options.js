const MDN_KEYS = ["mozilla", "mdn1", "mdn3"];
const MDN_INSTANCES = ["developer.mozilla.org", "mdn3.moz.one", "mdn1.moz.one"];

const storage = localStorage;

const template = document.getElementById("template");
const main = document.getElementById("main");

for (let i = 0; i < MDN_INSTANCES.length; i++) {
  const section = template.content.cloneNode(true);

  const current = section.getElementById("current");
  const select = section.getElementById("redirect");
  const submit = section.getElementById("submit");

  current.textContent = MDN_INSTANCES[i];

  const key = MDN_KEYS[i];
  let dbValue = storage.getItem(key);
  select.setAttribute("data-key", key);
  MDN_INSTANCES.filter((j) => j !== MDN_INSTANCES[i]).forEach((k) => {
    const option = document.createElement("option");

    option.textContent = k;
    option.value = k;
    option.selected = dbValue === k;

    select.appendChild(option);
  });

  submit.addEventListener("click", onSubmitClick);
  main.appendChild(section);

  if (i < MDN_INSTANCES.length - 1) {
    const hr = document.createElement("hr");
    main.appendChild(hr);
  }
}

async function onSubmitClick(e) {
  e.preventDefault();
  let key = e.target.previousElementSibling.getAttribute("data-key");
  let value = e.target.previousElementSibling.value;

  storage.setItem(key, value);
  console.log(key, value);
}

const cnt = document.querySelector("#countpeople");
const dt = document.querySelector("#datetime");

apiRequest();

async function apiRequest() {
  console.log("in the function");
  try {
    const response = await fetch(`http://localhost:3001/api/info`);
    const data = await response.json();

    console.log(data);
    //document.querySelector("h2").innerText = `Retrieved data for: ${data.name}`;
    cnt.innerText = data.people;
    dt.innerText = data.time;
  } catch (error) {
    console.log(error);
  }
}

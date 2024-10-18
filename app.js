function getAndUpdate() {
  // e.preventDefault();
  console.log("Updating List....");

  const title = document.getElementById("title");
  const desc = document.getElementById("description");
  const titleValue = title.value.trim();
  const descValue = desc.value.trim();

  if (!titleValue || !descValue) {
    if (!titleValue) {
      title.style.border = "1px solid red";
      title.placeholder = "Fill The Details";
    }
    if (!descValue) {
      desc.style.border = "1px solid red";
      desc.placeholder = "Fill The Details";
    }

    // Add event listeners to input elements
    // Function to handle focus event on title input
    title.addEventListener("focus", () => {
      title.placeholder = "Add Title ";
      document.getElementById("title").style.border = "";
    });
    desc.addEventListener("focus", () => {
      desc.placeholder = "Add Description";
      document.getElementById("description").style.border = "";
    });
  } else {
    if (localStorage.getItem("itemsJson") == null) {
      itemJsonArray = [];
      itemJsonArray.push([titleValue, descValue]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
      itemJsonArrayStr = localStorage.getItem("itemsJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
      itemJsonArray.push([titleValue, descValue]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    // Clear input fields after adding to the list
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  }
  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  // populate the table
  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `<tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-sm btn-danger" onclick="deleteItem(${index})" >Delete</button></td>
          </tr>`;
  });
  tableBody.innerHTML = str;
}
function deleteItem(itemIndex) {
  if (confirm("Are you sure you want to delete this item?")) {
    console.log("Deleted", itemIndex);
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    //Delete ItemIndex elemets from the Array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
  }
}


function clearList() {
  if (confirm("Are you sure you want to clear the entire list?")) {
    localStorage.clear();
    update();
  }
}

let addBtn = document.getElementById("add");
addBtn.addEventListener("click", getAndUpdate);
update();

function getAndUpdate() {
    console.log("Updating List....");

    title = document.getElementById("title").value;
    desc = document.getElementById("description").value;

    if (title == "" || desc == "") {
      document.getElementById("title").style.border = "1px solid red";
      document.getElementById("description").style.border = "1px solid red";
      document.getElementById("title").value = "Fill The Details";
      document.getElementById("description").value = "Fill The Details";
      // Function to handle click event on title input
      function clearTitlePlaceholder() {
        let titleInput = document.getElementById("title");
        if (titleInput.value === "Fill The Details") {
          titleInput.value = "";
          document.getElementById("title").style.border = "";
        }
      }

      // Function to handle click event on description input
      function clearDescPlaceholder() {
        let descInput = document.getElementById("description");
        if (descInput.value === "Fill The Details") {
          descInput.value = "";
          document.getElementById("description").style.border = "";
        }
      }

      // Add event listeners to input elements
      document
        .getElementById("title")
        .addEventListener("click", clearTitlePlaceholder);
      document
        .getElementById("description")
        .addEventListener("click", clearDescPlaceholder);
    } else {
      document.getElementById("title").style.border = "";
      document.getElementById("description").style.border = "";
      if (localStorage.getItem("itemsJson") == null) {
        itemJsonArray = [];
        itemJsonArray.push([title, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
      } else {
        itemJsonArrayStr = localStorage.getItem("itemsJson");
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([title, desc]);
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
    console.log("Deleted", itemIndex);
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    //Delete ItemIndex elemets from the Array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
  }

  function clearList() {
    localStorage.clear();
    update();
  }

  let addBtn = document.getElementById("add");
  addBtn.addEventListener("click", getAndUpdate);
  update();
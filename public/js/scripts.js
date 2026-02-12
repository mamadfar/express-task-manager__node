const tasksList = document.getElementById("tasks-list");

tasksList.addEventListener("click", async (event) => {
  const target = event.target;
  const id = Number(target.dataset.id);

  if (target.classList.contains("toggle-btn")) {
    try {
      const res = await axios.post("/toggle-task", { id });
      if (res.data.success) {
        // location.reload();
        const span = target.parentElement.querySelector(".badge");
        if (span.textContent === "Completed") {
          span.textContent = "In progress";
          span.classList.remove("bg-success");
          span.classList.add("bg-secondary");
        } else {
          span.textContent = "Completed";
          span.classList.remove("bg-secondary");
          span.classList.add("bg-success");
        }
        const toggleBtn = target.parentElement.querySelector(".toggle-btn");
        if (toggleBtn.classList.contains("btn-success")) {
          toggleBtn.classList.remove("btn-success");
          toggleBtn.classList.add("btn-secondary");
        } else {
          toggleBtn.classList.remove("btn-secondary");
          toggleBtn.classList.add("btn-success");
        }
      } else {
        alert(res.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  } else if (target.classList.contains("edit-btn")) {
    const text = target.parentElement.querySelector("label").textContent;
    const title = prompt("Please enter the new title", text);

    if (title && title.trim() !== "" && title.length >= 3 && title !== text) {
      try {
        const res = await axios.put("/edit-task", { id, title });
        if (res.data.success) {
          //   location.reload();
          target.parentElement.querySelector("label").textContent = title;
        } else {
          alert(res.data);
        }
      } catch (error) {
        alert(error.response.data);
      }
    } else if (title.length < 3) {
      alert("Title must be at least 3 characters long");
    }
  } else if (target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await axios.delete("/delete-task", { data: { id } });
        if (res.data.success) {
          //   location.reload();
          target.parentElement.remove();
        } else {
          alert(res.data);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }
});

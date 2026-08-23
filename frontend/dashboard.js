
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

console.log("JWT token ==> ", token);
console.log("Login user ==> ", user);


if (!token) {
    window.location.href = "login.html";
}


// ========================================
// USER PROFILE
// ========================================

function loadUserProfile() {

    if (!user) {
        return;
    }

    const fullName =
        `${user.firstname} ${user.lastname}`;

    const userName =
        document.getElementById("desktopUserName");

    const welcomeUserName =
        document.getElementById("welcomeUserName");

    const avatar =
        document.querySelector(".avatar");


    // Desktop complete name
    if (userName) {
        userName.innerText = fullName;
    }


    // Welcome message
    if (welcomeUserName) {
        welcomeUserName.innerText = fullName;
    }


    // Desktop avatar
    if (avatar) {
        avatar.innerText =
            user.firstname.charAt(0).toUpperCase();
    }
}

loadUserProfile();


// ========================================
// MOBILE SIDEBAR
// ========================================

const sidebar =
    document.getElementById("sidebar");

const openSidebar =
    document.getElementById("openSidebar");

const closeSidebar =
    document.getElementById("closeSidebar");


// Open sidebar
openSidebar.addEventListener("click", function () {

    sidebar.classList.add("open");

});


// Close sidebar
closeSidebar.addEventListener("click", function () {

    sidebar.classList.remove("open");

});


// ========================================
// CLOSE MOBILE SIDEBAR FUNCTION
// ========================================

function closeMobileSidebar() {

    if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
    }

}


// ========================================
// GET TASKS
// ========================================

async function getTasks(filter = "all") {

    try {

        const response = await fetch(
         "https://todo-full-stack-application-production.up.railway.app/get-task",
            {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        const data = await response.json();

        console.log("Tasks data ==> ", data);


        // Invalid token
        if (response.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "login.html";

            return;
        }


        if (!data || data.status === false) {

            const message =
                document.getElementById("message");

            message.innerText =
                data?.message || "Unable to load tasks";

            return;
        }


        const tasksContainer =
            document.getElementById("tasks");

        tasksContainer.innerHTML = "";


        // ========================================
        // FILTER
        // ========================================

        let filteredTasks = data.data;


        if (filter === "completed") {

            filteredTasks =
                data.data.filter(
                    task => task.status === "completed"
                );

        }


        // ========================================
        // EMPTY
        // ========================================

        if (filteredTasks.length === 0) {

            tasksContainer.innerHTML = `
                <div class="empty-tasks">
                    No tasks found.
                </div>
            `;

        }


        // ========================================
        // DISPLAY TASKS
        // ========================================

        filteredTasks.forEach(task => {

            const taskCard =
                document.createElement("div");

            taskCard.className = "task-card";


            taskCard.innerHTML = `

                <div class="task-content">

                    <h3>
                        ${task.title}
                    </h3>

                    <p>
                        ${task.description}
                    </p>

                    <div class="task-meta">

                        <span class="task-date">
                            📅 ${task.duedate}
                        </span>

                        <span class="priority-badge ${task.priority}">
                            ${task.priority}
                        </span>

                        <span class="status-badge ${task.status}">
                            ${task.status}
                        </span>

                    </div>

                </div>


                <div class="task-actions">

                    <button
                        class="edit-btn"
                        onclick="editTask('${task._id}')">

                        Edit

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteTask('${task._id}')">

                        Delete

                    </button>

                </div>
            `;


            tasksContainer.appendChild(taskCard);

        });


        // ========================================
        // STATISTICS
        // ========================================

        const totalTasks =
            data.data.length;

        document.getElementById(
            "totalTasks"
        ).innerText = totalTasks;


        const pendingCount =
            data.data.filter(
                task => task.status !== "completed"
            ).length;

        document.getElementById(
            "pendingTasks"
        ).innerText = pendingCount;


        const completedCount =
            data.data.filter(
                task => task.status === "completed"
            ).length;

        document.getElementById(
            "completedTasks"
        ).innerText = completedCount;


    } catch (error) {

        console.log(
            "Get Tasks Error ==> ",
            error
        );

    }

}


getTasks();


// ========================================
// OPEN TASK FORM
// ========================================

function openTaskForm() {

    const formContainer =
        document.getElementById(
            "taskFormContainer"
        );

    formContainer.style.display = "block";
}


// ========================================
// CLOSE TASK FORM
// ========================================

function closeTaskForm() {

    const formContainer =
        document.getElementById(
            "taskFormContainer"
        );

    formContainer.style.display = "none";
}


// ========================================
// CREATE TASK
// ========================================

async function createTask(event) {

    event.preventDefault();


    const title =
        document.getElementById("title");

    const description =
        document.getElementById("description");

    const duedate =
        document.getElementById("duedate");

    const priority =
        document.getElementById("priority");

    const status =
        document.getElementById("status");


    const taskData = {

        title: title.value,

        description: description.value,

        duedate: duedate.value,

        priority: priority.value,

        status: status.value

    };


    try {

        const response = await fetch(
            "https://todo-full-stack-application-production.up.railway.app/create-task",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(taskData)
            }
        );


        const data =
            await response.json();

        console.log(
            "Create task data ==> ",
            data
        );


        const message =
            document.getElementById("message");


        if (data.status === true) {

            message.innerText =
                data.message;


            title.value = "";
            description.value = "";
            duedate.value = "";
            priority.value = "";
            status.value = "";


            closeTaskForm();

            getTasks();

        } else {

            message.innerText =
                data.message;

        }


    } catch (error) {

        console.log(
            "Create Task Error ==> ",
            error
        );

    }

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href =
        "login.html";
}


// ========================================
// EDIT TASK
// ========================================

async function editTask(taskId) {

    console.log(
        "Edit task id ==> ",
        taskId
    );


    const newTitle =
        prompt("Enter New Task Title");

    if (!newTitle) {
        return;
    }


    const newDescription =
        prompt("Enter New Description");

    if (!newDescription) {
        return;
    }


    const newStatus =
        prompt(
            "Enter Status: pending or completed"
        );


    if (!newStatus) {
        return;
    }


    const statusValue =
        newStatus.toLowerCase();


    if (
        statusValue !== "pending" &&
        statusValue !== "completed"
    ) {

        alert(
            "Status must be pending or completed"
        );

        return;
    }


    const updateTask = {

        title: newTitle,

        description: newDescription,

        status: statusValue

    };


    try {

        const response = await fetch(
            `https://todo-full-stack-application-production.up.railway.app/update-task/${taskId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify(updateTask)
            }
        );


        const data =
            await response.json();


        if (response.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href =
                "login.html";

            return;
        }


        console.log(
            "Update data ==> ",
            data
        );


        const message =
            document.getElementById("message");


        if (data.status === true) {

            message.innerText =
                data.message;

            getTasks();

        } else {

            message.innerText =
                data.message;

        }


    } catch (error) {

        console.log(
            "Update Task Error ==> ",
            error
        );

    }

}


// ========================================
// DELETE TASK
// ========================================

async function deleteTask(taskId) {

    console.log(
        "Delete task id ==> ",
        taskId
    );


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `https://todo-full-stack-application-production.up.railway.app/delete-task/${taskId}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        console.log(
            "Delete data ==> ",
            data
        );


        const message =
            document.getElementById("message");


        if (data.status === true) {

            message.innerText =
                data.message;

            getTasks();

        } else {

            message.innerText =
                data.message;

        }


    } catch (error) {

        console.log(
            "Delete Task Error ==> ",
            error
        );

    }

}


// ========================================
// DASHBOARD NAVIGATION
// ========================================

document
    .getElementById("dashboardNav")
    .addEventListener("click", function (event) {

        event.preventDefault();


        document
            .querySelectorAll(".nav-item")
            .forEach(item => {

                item.classList.remove("active");

            });


        this.classList.add("active");


        getTasks("all");

        closeMobileSidebar();

    });


// ========================================
// MY TASKS
// ========================================

document
    .getElementById("myTasksNav")
    .addEventListener("click", function (event) {

        event.preventDefault();


        document
            .querySelectorAll(".nav-item")
            .forEach(item => {

                item.classList.remove("active");

            });


        this.classList.add("active");


        getTasks("all");

        closeMobileSidebar();

    });


// ========================================
// COMPLETED
// ========================================

document
    .getElementById("completedNav")
    .addEventListener("click", function (event) {

        event.preventDefault();


        document
            .querySelectorAll(".nav-item")
            .forEach(item => {

                item.classList.remove("active");

            });


        this.classList.add("active");


        getTasks("completed");

        closeMobileSidebar();

    });

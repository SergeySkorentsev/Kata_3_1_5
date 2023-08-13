const urlAllUsers = "/api/admin/users";
const urlRoles = "/api/admin/roles";
const urlUser = "/api/admin/user/";
const urlUpdate = "/api/admin/update";
const urlAdd = "/api/admin/add/";
const urlDelete = "/api/admin/delete/";
const usersTable = document.getElementById("adminTab");
const idEditUser = document.querySelector("#idEditUser");
const editName = document.querySelector("#editName");
const editLastname = document.querySelector("#editLastname");
const editAge = document.querySelector("#editAge");
const editEmail = document.querySelector("#editEmail");
const pass = document.querySelector("#pass");
const editUserRoles = document.querySelector("#editUserRoles");
const editForm = document.getElementById('formEdit');
const newUserForm = document.getElementById('newUserForm');
const delId = document.getElementById('delId')
const delFirstName = document.getElementById('delFirstName')
const delLastName = document.getElementById('delLastName')
const delAge = document.getElementById('delAge')
const delEmail = document.getElementById('delEmail')
const delRoles = document.getElementById('delRoles')
const deleteForm = document.getElementById('deleteForm')
let newRoles = document.querySelector("#newRoles");
let res = '';
let option = "";
getCurrentUser();
getAllUsers();
fillRoles();
async function getAllRoles() {
    const res = await fetch(urlRoles);
    const roles = await res.json();
    return roles;
}
async function fillRoles() {
    const allRoles = await getAllRoles();
    newRoles.innerHTML = '';
    allRoles.forEach(role => {
        const option = document.createElement('option');
        option.text = role.cutRoleName;
        option.value = role.id;
        newRoles.add(option);
    });
}
async function getAllUsers() {
    await fetch (urlAllUsers, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                res +=
                    `<tr>
                        <th scope="col">${user.id}</th>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.cutRoles}</td>
                        <td><a id="btnEdit" class='btnEdit btn btn-info text-white' data-bs-toggle='modal' onclick="editModal(${user.id})">Edit</a></td>
                        <td><a id="btnDelete" class='btnDelete btn btn-danger' data-bs-toggle='modal' onclick="deleteModal(${user.id})">Delete</a></td>
                    </tr>`;
            })
            usersTable.innerHTML = res;
        })
        .catch(error => console.error("Error:", error));
}
//NEW USER
newUserForm.addEventListener('submit', newUser)
async function newUser(e) {
    e.preventDefault();
    let roles = [];
    for (let option of newRoles.options) {
        if (option.selected) {
            roles.push({
                id: option.value
            });
        }
    }
    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "firstName": document.getElementById('newFirstName').value,
            "lastName": document.getElementById('newLastName').value,
            "age": document.getElementById('newAge').value,
            "email": document.getElementById('newEmail').value,
            "password": document.getElementById('newPass').value,
            "roles": roles
        })
    }
    fetch(urlAdd, method)
        .then(res => res.json())
        .then(() => {
            newUserForm.reset();
            res = "";
            getAllUsers();
            document.getElementById('nav-users-tab').click();
        })
        .catch(error => console.error("Error:", error));
}
//END NEW USER
//EDIT
async function editModal(id){
    $('#modalEdit').modal('show')
    let temp = await fetch(urlUser + id)
    if (temp.ok) {
        await temp.json().then(async user => {
            idEditUser.value = user.id
            editName.value = user.firstName
            editLastname.value = user.lastName
            editAge.value = user.age
            editEmail.value = user.email
            pass.value = user.password
            const editRoles = await getAllRoles();
            editUserRoles.innerHTML = '';
            editRoles.forEach(role => {
                const editOption = document.createElement('option');
                editOption.text = role.cutRoleName;
                editOption.value = role.id;
                editUserRoles.add(editOption);
            });
        })
    } else {
        alert('error')
    }
    option = 'edit';
}
editForm.addEventListener('submit', e => {
    e.preventDefault()
    if (option === "edit") {
        let editRoles = []
        for (let option of editUserRoles.options) {
            if (option.selected) {
                editRoles.push({
                    id: option.value
                });
            }
        }
        let method = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": document.getElementById('idEditUser').value,
                "firstName": document.getElementById('editName').value,
                "lastName": document.getElementById('editLastname').value,
                "age": document.getElementById('editAge').value,
                "email": document.getElementById('editEmail').value,
                "password": document.getElementById('pass').value,
                "roles": editRoles
            })
        }
        fetch(urlUpdate, method)
            .then(res => res.json())
            .then(() => {
                $('#footered').click();
                res = "";
                getAllUsers()
            })
            .catch(error => console.error("Error:", error));
    option = '';
    }
})
//END EDIT
//DELETE
async function deleteModal(id) {
    $('#modalDelete').modal('show')
    let del_url2 = urlUser + id
    let temp = await fetch(del_url2)
    if(temp.ok) {
        await temp.json().then(async user => {
            delId.value = user.id
            delFirstName.value = user.firstName
            delLastName.value = user.lastName
            delAge.value = user.age
            delEmail.value = user.email
            delRoles.value = user.cutRoles
        })
    } else {
        alert('delete error')
    }
    option = 'delete';
}
deleteForm.addEventListener('submit', e => {
    e.preventDefault()
    if (option === 'delete') {
        let method = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(urlDelete + delId.value, method)
            .then(res => res.json())
            .then(() => {
                $('#deleted').click();
                res = "";
                getAllUsers()
            })
            .catch(error => console.log(error));
        option = '';
    }
})
//END DELETE
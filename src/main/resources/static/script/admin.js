const urlAllUsers = "/api/users";
const urlRoles = "/api/roles";
const urlUser = "/api/user/";
const urlUpdate = "/api/update";
const urlAdd = "api/add/";
const urlDelete = "api/delete/";
const usersTable = document.getElementById("adminTab");
const idEditUser = document.querySelector("#idEditUser");
const editName = document.querySelector("#editName");
const editLastname = document.querySelector("#editLastname");
const editAge = document.querySelector("#editAge");
const editEmail = document.querySelector("#editEmail");
const pass = document.querySelector("#pass");
const editForm = document.getElementById('formEdit');
const newUserForm = document.getElementById('newUserForm');
const delId = document.getElementById('delId')
const delFirstName = document.getElementById('delFirstName')
const delLastName = document.getElementById('delLastName')
const delAge = document.getElementById('delAge')
const delEmail = document.getElementById('delEmail')
const delRoles = document.getElementById('delRoles')
const deleteForm = document.getElementById('deleteForm')
let res = '';
getCurrentUser();
getAllUsers();
async function getAllRoles() {
    const res = await fetch(urlRoles);
    const roles = await res.json();
    return roles.map(role => role.roleName);
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
                        <td><a id="btnDelete" class='btnDelete btn btn-danger' data-bs-toggle='modal'>Delete</a></td>
                    </tr>`;
            })
            usersTable.innerHTML = res;
        })
        .catch(error => console.log(error));
}
//NEW USER
newUserForm.addEventListener('submit', newUser)
async function newUser(ev) {
    ev.preventDefault()
    let newRoles = []
    for(let i = 0; i < newRoles.length; i++){
        newRoles.push({
            id:newRoles[i].value
        })
    }

    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: document.getElementById('newFirstName').value,
            lastName: document.getElementById('newLastName').value,
            age: document.getElementById('newAge').value,
            email: document.getElementById('newEmail').value,
            password: document.getElementById('newPass').value,
            roles: newRoles
        })
    }
    fetch(urlAdd, method).then(() => {
        document.getElementById('v-pills-admin').click()
        newUserForm.reset();
        getAllUsers()
    })
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
        })
    } else {
        alert('error')
    }
}
editForm.addEventListener('submit', e => {
    e.preventDefault()
    let editRoles = []

    for (let i = 0; i < editForm.roles.options.length; i++) {
        if (editForm.roles.options[i].selected) {
            let tmp = {}
            tmp["id"] = editForm.roles.options[i].value
            editRoles.push(tmp)
        }
    }
    let method = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById('idEditUser').value,
            firstName: document.getElementById('editName').value,
            lastName: document.getElementById('editLastname').value,
            age: document.getElementById('editAge').value,
            email: document.getElementById('editEmail').value,
            password: document.getElementById('pass').value,
            roles: editRoles
        })
    }
    fetch(urlUpdate, method)
        .then(res => res.json())
        .then(() => {
            $('#footered').click();
            getAllUsers()
        }).catch(error => console.log(error))
})
//END EDIT
//DELETE
window.contentDeleteModal = contentDeleteModal
async function contentDeleteModal(id) {
    $('#deleteModal').modal('show')
    let del_url2 = urlUser + id
    let temp = await fetch(del_url2)
    if(temp.ok) {
        await temp.json().then(user => {
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
}
deleteForm.addEventListener('submit', e => {
    e.preventDefault()
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(urlDelete + delId.value, method)
        .then(res => res.json())
        .then(() => {
            getAllUsers()
        }).catch(error => console.log(error))
})
//END DELETE
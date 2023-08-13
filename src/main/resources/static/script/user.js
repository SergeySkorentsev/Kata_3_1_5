const urlCurrentUser = "/api/user/current";
const header = document.getElementById("hdr");
const userTable = document.getElementById("usertab");
let result = '';
getCurrentUser();
async function getCurrentUser() {
    await fetch (urlCurrentUser, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(user => {
            header.innerText = user.email + " with roles: " + user.cutRoles;
            result =
                `<tr">
                    <th scope="col">${user.id}</th>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.cutRoles}</td>
                </tr>`
            userTable.innerHTML = result;
        })
        .catch(error => console.log(error));
}
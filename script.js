const usersList = document.querySelector('.users-list')
const search = document.getElementById('search')
const ifUsersFound = document.querySelector('.no-users')
let index = 0;

async function getData() {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()
    return data.results[0]
}

async function createUser() {
    const userData = await getData()
    const { name, picture, location } = userData
    const userItem = document.createElement('div')
    userItem.classList.add('user-item')
    userItem.innerHTML = `<div class="avatar"><img
        src="${picture.thumbnail}"
        alt=""></div>
    <div class="user-info">
    <span class="user-fullname">${name.first} ${name.last}</span>
    <span class="location">${location.city}, ${location.country}</span>`
    usersList.append(userItem)
}

for (let i = 0; i < 20; i++) {
    createUser()
}

function filterData(searchTerm) {
    const allUsers = document.querySelectorAll('.user-item')
    if (allUsers.length < 20) {
        return
    }
    else {
        allUsers.forEach(item => {
            if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
                item.classList.remove('hide')
            }
            else {
                item.classList.add('hide')
            }
        })

        let numberOfResults = 0
        allUsers.forEach(user => {
            if (!user.classList.contains('hide'))
                numberOfResults++
        })
        if (numberOfResults === 0) {
            ifUsersFound.classList.add('show')
            usersList.style.overflowY = 'hidden'
        }
        else {
            ifUsersFound.classList.remove('show')
            usersList.style.overflowY = 'scroll'
        }
    }

}

search.addEventListener('input', (e) => filterData(e.target.value))

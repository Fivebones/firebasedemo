const pharmacyList = document.getElementById('list');
const form = document.getElementById('add-pharmacy');
const attributeSuffix = 'ph';

function displayPharmacies(doc) {

    let li = document.createElement('li');
    let name = document.createElement('span');
    let address = document.createElement('span');
    let city = document.createElement('span');
    let deleteBtn = document.createElement('div');
    let updateBtn = document.createElement('button');

    li.setAttribute('data-id', attributeSuffix + doc.id);
    li.classList.add('col', 's6', 'teal', 'lighten-2', 'card-panel');
    name.textContent = doc.data().name;
    address.textContent = doc.data().address;
    city.textContent = doc.data().city;
    deleteBtn.textContent = 'X';

    li.appendChild(name);
    li.appendChild(address);
    li.appendChild(city);
    li.appendChild(deleteBtn);


    pharmacyList.appendChild(li);

    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let idString = e.target.parentElement.getAttribute('data-id');
        let id = idString.slice(2, idString.length);
        db.collection('Pharmacies').doc(id).delete();
    });


}

// Dodavanje u bazu
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Pharmacies').add({
        name: form.name.value,
        address: form.city.value,
        city: form.address.value,
    });
    form.reset();
});



db.collection("Pharmacies").orderBy('city', 'asc').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === 'added') {
            displayPharmacies(change.doc);
        } else if (change.type === 'removed') {
            let li = pharmacyList.querySelector('[data-id=' + attributeSuffix + change.doc.id + ']');
            pharmacyList.removeChild(li);
        }
    });
})






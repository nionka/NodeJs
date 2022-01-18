document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            event.target.closest('li').remove();
        })
    };

    if (event.target.dataset.type === 'edit') {
        const title = event.target.closest('li').querySelector('p').textContent
        const result = prompt('Введите новое название', title)

        if (result.trim()) {
            const id = event.target.dataset.id;
            edit(id, result).then(() => {
                event.target.closest('li').querySelector('p').textContent = result;
            });
        }
    }
})

async function remove (id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
};

async function edit (id, title) {
    const note = {
        id,
        title
    };

    await fetch('/', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(note)
    })
}
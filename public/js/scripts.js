
const tasksList = document.getElementById('tasks-list');

tasksList.addEventListener('click', async (event) => {
    const target = event.target;
    const id = Number(target.dataset.id);

    if(target.classList.contains('toggle-btn')) {
        try {
            const res = await axios.post('/toggle-task', {id})
            if(res.data.success) {
                location.reload();
            } else {
                alert(res.data);
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
})
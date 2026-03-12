const btnAdd = document.querySelector('.btn--add');
const nameInput = document.getElementById('nameInput');
const scoreInput = document.getElementById('scoreInput');
const tableBody = document.getElementById('studentTable');
const stats = document.getElementById('stats');

let students = [];

function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable() {

    tableBody.innerHTML = "";

    students.forEach((sv, index) => {

        const tr = document.createElement("tr");

        if (sv.score < 5) {
            tr.style.backgroundColor = "yellow";
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score}</td>
            <td>${getRank(sv.score)}</td>
            <th><button class="delete-btn" data-index="${index}">Xóa</button></th>
        `;

        tableBody.appendChild(tr);
    });

    updateStats();
}

function updateStats() {

    let total = students.length;

    let avg = 0;

    if (total > 0) {
        let sum = students.reduce((s, sv) => s + sv.score, 0);
        avg = (sum / total).toFixed(2);
    }

    stats.innerText = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;
}

function addStudent() {

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Dữ liệu không hợp lệ");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    renderTable();

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

btnAdd.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addStudent();
    }
});

tableBody.addEventListener("click", function(e) {

    if (e.target.classList.contains("delete-btn")) {

        let index = e.target.dataset.index;

        students.splice(index, 1);

        renderTable();
    }
});
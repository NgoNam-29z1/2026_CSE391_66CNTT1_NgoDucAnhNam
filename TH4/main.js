// Mảng gốc lưu trữ toàn bộ dữ liệu sinh viên
let students = [];
let currentSort = 'none'; // Trạng thái sắp xếp: 'none', 'asc', 'desc'

// Lấy các phần tử DOM
const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const studentBody = document.getElementById('studentBody');
const statsDiv = document.getElementById('statistics');
const searchInput = document.getElementById('searchName');
const rankFilter = document.getElementById('filterRank');

// --- CHỨC NĂNG BÀI 1.1 ---

// Hàm xác định xếp loại
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// Chức năng thêm sinh viên
function addStudent() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    // Kiểm tra dữ liệu hợp lệ
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập tên và điểm từ 0 đến 10!");
        return;
    }

    // Thêm vào mảng với một ID duy nhất để dễ quản lý khi lọc/xóa
    students.push({
        id: Date.now(),
        name: name,
        score: score
    });

    // Reset form và focus
    txtName.value = '';
    txtScore.value = '';
    txtName.focus();

    applyFilters(); // Cập nhật lại giao diện
}

// Xử lý sự kiện nhấn nút hoặc phím Enter
btnAdd.onclick = addStudent;
txtScore.onkeyup = (e) => { if (e.key === 'Enter') addStudent(); };

// Xử lý Xóa bằng Event Delegation
studentBody.onclick = (e) => {
    if (e.target.classList.contains('btnDelete')) {
        const idToDelete = parseInt(e.target.getAttribute('data-id'));
        students = students.filter(s => s.id !== idToDelete);
        applyFilters();
    }
};

// --- CHỨC NĂNG BÀI 1.2 (BỘ LỌC & SẮP XẾP) ---

// Hàm tổng hợp để lọc, sắp xếp và vẽ bảng
function applyFilters() {
    const keyword = searchInput.value.toLowerCase();
    const selectedRank = rankFilter.value;

    // 1. Lọc theo tên và xếp loại
    let result = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(keyword);
        const matchRank = selectedRank === "All" || getRank(s.score) === selectedRank;
        return matchName && matchRank;
    });

    // 2. Sắp xếp theo điểm
    if (currentSort === 'asc') {
        result.sort((a, b) => a.score - b.score);
    } else if (currentSort === 'desc') {
        result.sort((a, b) => b.score - a.score);
    }

    renderTable(result);
}

// Hàm vẽ bảng và tính thống kê
function renderTable(dataList) {
    studentBody.innerHTML = '';
    let totalScore = 0;

    if (dataList.length === 0) {
        studentBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Không có kết quả phù hợp</td></tr>';
    } else {
        dataList.forEach((s, index) => {
            const row = document.createElement('tr');
            if (s.score < 5.0) row.classList.add('low-score'); // Tô màu vàng

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${s.name}</td>
                <td>${s.score}</td>
                <td>${getRank(s.score)}</td>
                <td><button class="btnDelete" data-id="${s.id}">Xóa</button></td>
            `;
            studentBody.appendChild(row);
            totalScore += s.score;
        });
    }

    // Cập nhật thống kê trên toàn bộ danh sách hiện thị
    const avg = dataList.length > 0 ? (totalScore / dataList.length).toFixed(2) : 0;
    statsDiv.textContent = `Tổng số sinh viên: ${dataList.length} | Điểm trung bình: ${avg}`;
}

// Sự kiện sắp xếp khi click tiêu đề cột Điểm
document.getElementById('sortScore').onclick = () => {
    const icon = document.getElementById('sortIcon');
    if (currentSort === 'none' || currentSort === 'desc') {
        currentSort = 'asc';
        icon.textContent = '▲';
    } else {
        currentSort = 'desc';
        icon.textContent = '▼';
    }
    applyFilters();
};

// Sự kiện lọc realtime
searchInput.oninput = applyFilters;
rankFilter.onchange = applyFilters;

// Khởi tạo bảng trống
applyFilters();
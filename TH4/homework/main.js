const ôHoTen = document.getElementById('hoTen');
ôHoTen.addEventListener('input', function() {
    const doDai = ôHoTen.value.length;
    document.getElementById('demKyTu').innerText = doDai + '/50';
});

const btnHienMatKhau = document.getElementById('btnHienMatKhau');
const ôMatKhau = document.getElementById('matKhau');

btnHienMatKhau.addEventListener('click', function() {
    if (ôMatKhau.type === 'password') {
        ôMatKhau.type = 'text';
        btnHienMatKhau.innerText = '👁 Ẩn';
    } else {
        ôMatKhau.type = 'password';
        btnHienMatKhau.innerText = '👁 Hiện';
    }
});

ôMatKhau.addEventListener('input', function() {
    const mk = ôMatKhau.value;
    const thanh = document.getElementById('thanhSucManh');
    const chu = document.getElementById('chuSucManh');

    if (mk.length === 0) {
        thanh.style.width = '0%';
        chu.innerText = '';
    } 
    else if (mk.length < 6) {
        thanh.style.width = '33%';
        thanh.style.backgroundColor = 'red';
        chu.innerText = 'Yếu';
        chu.style.color = 'red';
    } 
    else if (mk.length >= 6 && /[A-Za-z]/.test(mk) && /[0-9]/.test(mk)) {
        thanh.style.width = '100%';
        thanh.style.backgroundColor = 'green';
        chu.innerText = 'Mạnh';
        chu.style.color = 'green';
    } 
    else {
        thanh.style.width = '66%';
        thanh.style.backgroundColor = 'orange';
        chu.innerText = 'Trung bình';
        chu.style.color = 'orange';
    }
});

const buoc1 = document.getElementById('buoc1');
const buoc2 = document.getElementById('buoc2');
const buoc3 = document.getElementById('buoc3');
const btnTiepTheo = document.getElementById('btnTiepTheo');
const btnQuayLai = document.getElementById('btnQuayLai');
const tieuDeBuoc = document.getElementById('tieuDeBuoc');

let buocHienTai = 1;

btnTiepTheo.addEventListener('click', function() {
    if (buocHienTai === 1) {
        let hopLe = true;

        if (document.getElementById('hoTen').value === '') {
            document.getElementById('loiHoTen').innerText = 'Vui lòng nhập họ tên';
            hopLe = false;
        } else {
            document.getElementById('loiHoTen').innerText = '';
        }

        if (document.getElementById('ngaySinh').value === '') {
            document.getElementById('loiNgaySinh').innerText = 'Vui lòng chọn ngày sinh';
            hopLe = false;
        } else {
            document.getElementById('loiNgaySinh').innerText = '';
        }

        if (document.getElementById('gioiTinh').value === '') {
            document.getElementById('loiGioiTinh').innerText = 'Vui lòng chọn giới tính';
            hopLe = false;
        } else {
            document.getElementById('loiGioiTinh').innerText = '';
        }

        if (hopLe) {
            buocHienTai = 2;
            buoc1.style.display = 'none';
            buoc2.style.display = 'block';
            btnQuayLai.style.display = 'inline-block';
            tieuDeBuoc.innerText = 'Bước 2 / 3: Thông tin tài khoản';
        }
    }
    
    else if (buocHienTai === 2) {
        let hopLe = true;
        const email = document.getElementById('email').value;
        const mk = document.getElementById('matKhau').value;
        const nhapLai = document.getElementById('nhapLaiMatKhau').value;

        if (email === '') {
            document.getElementById('loiEmail').innerText = 'Vui lòng nhập email';
            hopLe = false;
        } else {
            document.getElementById('loiEmail').innerText = '';
        }

        if (mk.length < 6) {
            document.getElementById('loiMatKhau').innerText = 'Mật khẩu phải từ 6 ký tự';
            hopLe = false;
        } else {
            document.getElementById('loiMatKhau').innerText = '';
        }

        if (nhapLai === '' || nhapLai !== mk) {
            document.getElementById('loiNhapLai').innerText = 'Mật khẩu không khớp';
            hopLe = false;
        } else {
            document.getElementById('loiNhapLai').innerText = '';
        }

        if (hopLe) {
            buocHienTai = 3;
            buoc2.style.display = 'none';
            buoc3.style.display = 'block';
            tieuDeBuoc.innerText = 'Bước 3 / 3: Hoàn tất';
            btnTiepTheo.innerText = 'Đăng ký ngay';
            
            document.getElementById('xacNhanHoTen').innerText = document.getElementById('hoTen').value;
            document.getElementById('xacNhanNgaySinh').innerText = document.getElementById('ngaySinh').value;
            document.getElementById('xacNhanGioiTinh').innerText = document.getElementById('gioiTinh').value;
            document.getElementById('xacNhanEmail').innerText = email;
        }
    }
    
    else if (buocHienTai === 3) {
        alert('Chúc mừng! Bạn đã đăng ký thành công!');
        window.location.reload(); 
    }
});

btnQuayLai.addEventListener('click', function() {
    if (buocHienTai === 2) {
        buocHienTai = 1;
        buoc2.style.display = 'none';
        buoc1.style.display = 'block';
        btnQuayLai.style.display = 'none';
        tieuDeBuoc.innerText = 'Bước 1 / 3: Thông tin cá nhân';
    } 
    else if (buocHienTai === 3) {
        buocHienTai = 2;
        buoc3.style.display = 'none';
        buoc2.style.display = 'block';
        btnTiepTheo.innerText = 'Tiếp theo'; 
        tieuDeBuoc.innerText = 'Bước 2 / 3: Thông tin tài khoản';
    }
});
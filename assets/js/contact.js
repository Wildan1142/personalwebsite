function getdata(event) {
  event.preventDefault();

  // Mengambil nilai dari input dengan ID yang sudah ditentukan
  const inputname = document.getElementById("name").value;
  const inputemail = document.getElementById("email").value;
  const inputphone = document.getElementById("phone").value;
  const inputrole = document.getElementById("role").value;
  const inputmessage = document.getElementById("message").value;

  // Memeriksa apakah semua field sudah diisi
  if (!inputname || !inputemail || !inputphone || !inputrole || !inputmessage) {
    // Menampilkan peringatan jika ada field yang kosong
    alert("Please fill out all required fields");
    return;
  }

  // Menampilkan informasi yang diisi oleh pengguna dalam bentuk alert
  alert(
    `Name: ${inputname}\nEmail: ${inputemail}\nPhone: ${inputphone}\nRole: ${inputrole}\nMessage: ${inputmessage}`
  );

  // Membuat elemen <a> untuk mengirim email
  const link = document.createElement("a");
  link.href = `mailto:${inputemail}?subject=${inputrole}&body=Name: ${inputname}%0D%0AEmail: ${inputemail}%0D%0APhone: ${inputphone}%0D%0AMessage: ${inputmessage}`;

  // Membuka aplikasi email default
  link.click();
}

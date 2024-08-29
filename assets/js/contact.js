function getdata(event) {
  event.preventDefault();
  const inputname = document.getElementById("name").value;
  const inputemail = document.getElementById("email").value;
  const inputphone = document.getElementById("phone").value;
  const inputrole = document.getElementById("role").value;
  const inputmessage = document.getElementById("message").value;

  if (!inputname || !inputemail || !inputphone || !inputrole || !inputmessage) {
    alert("Please fill out all required fields");
    return;
  }

  alert(
    `Name: ${inputname}\nEmail: ${inputemail}\nPhone: ${inputphone}\nRole: ${inputrole}\nMessage: ${inputmessage}`
  );

  const link = document.createElement("a");
  link.href = `mailto: ${inputemail}?subject= ${inputrole} &body=Name: ${inputname}%0D%0AEmail: ${inputemail}%0D%0APhone: ${inputphone}%0D%0AMessage: ${inputmessage}`;

  link.click();
}

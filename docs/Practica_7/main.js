const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");

const $mensajeCompra = d.querySelector("#mensaje-compra");
const $loader = d.querySelector("#loader");
const $exitloader = d.querySelector(".float-bg");

// Función de Validación del Formulario
function validateForm(e) {
  // Reiniciar mensajes de error y éxito
  $errorsMessages.forEach((el) => {
    el.innerText = "";
  });
  $successMessage.innerText = "";

  let isValid = true;

  //Validar Nombre
  const namePattern = /^[A-Za-z\s]+$/;
  if ($nameInput.value.trim() === "") {
    $nameError.innerText = "El nombre es obligatorio";
    isValid = false;
  }else if (!namePattern.test($nameInput.value.trim())) {
    $emailError.innerText = "Favor de usar solo Letras y Espacio";
    isValid = false;
  }


  //Validar Email
  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.innerText = "El email es obligatorio";
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.innerText = "El formato del correo no es válido";
    isValid = false;
  }

  //Validar Password
  let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if ($passwordInput.value.trim() === "") {
    $passwordError.innerText = "La contraseña es obligatorio";
    isValid = false;
  } else if (!passwordPattern.test($passwordInput.value.trim())) {
    $passwordError.innerText = "La contraseña debe tener al menos 8 caracteres, 1 Mayuscula, 1 Signo (!#$%) y 1 Numero";
    isValid = false;
  }

  //Validar Confirmar Password
  if ($confirmPasswordInput.value.trim() !== $passwordInput.value.trim()) {
    $confirmPasswordError.innerText = "Las contraseñas no coinciden";
    isValid = false;
  }

  if (!isValid) {
    //Prevenir el envío del formulario si hay errores
    e.preventDefault();
  } else {
    e.preventDefault();
    $mensajeCompra.classList.remove("hidden");
  let i = 5;
  let countdownTimer = setInterval(function() {
    i = i - 1;
    if(i <= 0) {
      clearInterval(countdownTimer);
      $loader.classList.remove("loader")
      $loader.textContent = "Formulario enviado exitosamente."
      $exitloader.classList.add("exit")
    }
    }, 1000); 
    
  $exitloader.addEventListener("click",function (e) {
    if ($exitloader.classList.contains("exit")){
      $mensajeCompra.classList.add("hidden");
      $exitloader.classList.remove("exit");
    }
  });
    $successMessage.textContent = "Formulario enviado exitosamente."
    $form.reset();
    // Aquí puedes manejar el envío real de datos a un servidor, por ejemplo, usando fetch.
  }
}

$form.addEventListener("submit", validateForm)
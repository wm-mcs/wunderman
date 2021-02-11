import swal from "sweetalert";
import validatorCedula from "./cedulaValidator";

const validationState = new Set();
const loginForm = document.forms[0];

// Function manipulates validation messages by toggling them
function manipulateValidationMsg(validationData) {
  const { inputProps, valido } = validationData;

  if (inputProps.nodeName != "INPUT") {
    if (valido) {
      inputProps.parentNode.classList.remove("border-top-error");
      inputProps.parentNode.classList.add("border-top-success");
    } else {
      inputProps.parentNode.classList.add("border-top-error");
      inputProps.parentNode.classList.remove("border-top-success");
    }

    return "";
  }

  const elementValidationMsg = inputProps.nextElementSibling.getElementsByClassName(
    "message"
  )[0];

  const validationMsgClasses = elementValidationMsg.classList;

  if (valido) {
    validationMsgClasses.add("text-success");
    validationMsgClasses.remove("text-error");
    elementValidationMsg.innerHTML = inputProps.getAttribute("data-success");

    inputProps.parentNode.classList.remove("border-top-error");
    inputProps.parentNode.classList.add("border-top-success");
  } else {
    validationMsgClasses.remove("hide");
    validationMsgClasses.add("text-error");
    validationMsgClasses.remove("text-success");
    elementValidationMsg.innerHTML = inputProps.getAttribute("data-error");

    inputProps.parentNode.classList.add("border-top-error");
    inputProps.parentNode.classList.remove("border-top-success");
  }
}

// Validation rules for each field in our form.
function validationRules() {
  return {
    nombre: (inputProps) => {
      const validationRule = /[A-Za-z0-9]{6,}/;
      const inputValue = inputProps.value;
      const inputName = inputProps.name;
      const isInputValid = validationRule.test(inputValue);

      isInputValid
        ? manageState().removeFromState({ inputProps, inputName })
        : manageState().addToState({ inputProps, inputName });

      console.log(isInputValid);

      return true;
    },

    apellido: (inputProps) => {
      const validationRule = /[A-Za-z0-9]{6,}/;
      const inputValue = inputProps.value;
      const inputName = inputProps.name;
      const isInputValid = validationRule.test(inputValue);

      isInputValid
        ? manageState().removeFromState({ inputProps, inputName })
        : manageState().addToState({ inputProps, inputName });

      return true;
    },
    email: (inputProps) => {
      const validationRule = /[A-Za-z0-9]{6,}/;
      const inputValue = inputProps.value;
      const inputName = inputProps.name;
      const isInputValid = validationRule.test(inputValue);

      isInputValid
        ? manageState().removeFromState({ inputProps, inputName })
        : manageState().addToState({ inputProps, inputName });

      return true;
    },
    cedula: (inputProps) => {
      const validationRule = /[0-9]{6,7}/;
      const inputValue = inputProps.value;
      const inputName = inputProps.name;
      const isInputValid = validationRule.test(inputValue);

      isInputValid
        ? manageState().removeFromState({ inputProps, inputName })
        : manageState().addToState({ inputProps, inputName });

      return true;
    },
    departamento: (inputProps) => {
      const validationRule = /[A-Za-z]{2,}/;
      const inputValue = inputProps.value;
      const inputName = inputProps.name;
      const isInputValid = validationRule.test(inputValue);

      isInputValid
        ? manageState().removeFromState({ inputProps, inputName })
        : manageState().addToState({ inputProps, inputName });

      return true;
    },
    localidad: (inputProps) => {
      const validationRule = /[A-Za-z]{3,}/;
      const inputValue = inputProps.value;
      const inputName = inputProps.name;
      const isInputValid = validationRule.test(inputValue);

      isInputValid
        ? manageState().removeFromState({ inputProps, inputName })
        : manageState().addToState({ inputProps, inputName });

      return true;
    },

    emptyFields: () => {
      const formInputElems = [...loginForm.elements].filter(
        (item) => item.nodeName === "INPUT"
      );
      for (const inputProps of formInputElems) {
        const inputName = inputProps.name;
        const inputValue = inputProps.value;
        console.log(inputProps.name);
        if (!inputValue) {
          manageState().addToState({ inputProps, inputName });
        }
      }
    }
  };
}

// Function receives an input with its properties
function validateForm() {
  const verifyInputName = {
    nombre: validationRules().nombre,
    apellido: validationRules().apellido,
    email: validationRules().email,
    cedula: validationRules().cedula,
    departamento: validationRules().departamento,
    localidad: validationRules().localidad
  };

  const formInputElems = [...loginForm.elements].filter(
    (item) => item.nodeName === "INPUT" || item.nodeName === "SELECT"
  );

  for (const inputProps of formInputElems) {
    const inputName = inputProps.name;

    console.log(inputName);

    verifyInputName[inputName](inputProps);

    inputProps.addEventListener("focus", (e) => {
      console.log(e);

      if (e.target.nodeName == "INPUT") {
        e.target.nextElementSibling
          .getElementsByClassName("message")[0]
          .classList.add("hide");
      }

      e.target.parentNode.classList.remove("border-top-error");
    });
  }

  return validationState.size === 0 ? true : false;
}

// Collection of functions for managing state
function manageState() {
  return {
    addToState: (inputData) => {
      const { inputProps, inputName } = inputData;

      validationState.add(inputName);
      manipulateValidationMsg({ inputProps });
    },
    removeFromState: (inputData) => {
      const valido = true;
      const { inputProps, inputName } = inputData;

      validationState.delete(inputName);
      manipulateValidationMsg({ inputProps, valido });
    },
    validateState: () => {
      if (validationState.size > 0) {
        return false;
      }

      if (validationState.size === 0) {
        validationRules().emptyFields();
        return true;
      }
    }
  };
}

// The function submits the form
function submitForm() {
  const submitButton = document.getElementsByClassName("js-submit-user")[0];
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let validation = validateForm();

    validation ? swal("Good job!", "You clicked the button!", "success") : "";
  });
}

const init = () => {
  console.log("validator");
};

export default submitForm;

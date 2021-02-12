import "./../css/index.scss";
import departamentos from "./dataDepartamentoLocalidad";
import slider from "./slider";

document.getElementById("comprar").addEventListener("click", async function() {
  const { comprar } = await import("./comprar");
  comprar();
});

document
  .getElementsByClassName("js-submit-user")[0]
  .addEventListener("click", async function(event) {
    event.preventDefault();
    const { validateForm } = await import("./validator");
    validateForm();
  });

departamentos();
slider();

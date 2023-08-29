const addEvents = () => {
    const addToCartButtons = document.querySelectorAll(".addToCart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", addToCart);
    });
};
const addToCart = async (e) => {
    const productID = e.target.dataset.id;
    let cartID = localStorage.getItem("cartId");
    console.log("soy el guardado del ls", cartID, " y el id del producto es: ", productID);
    if (!cartID) {
        fetch("/api/carts", {
            method: "POST",
        })
            .then((response) => response.json())
            .then((data) => {
                cartID = data._id;
                console.log("soy cart id", cartID);
                localStorage.setItem("cartId", cartID);
            })
            .catch((error) => {
                console.error("Error al crear un nuevo carrito:", error);
                return;
            });
    }
    const response = await fetch(`/api/carts/${cartID}/product/${productID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: "quantity: quantity" ,
    });
    const result = await response.json();
    console.log(result);
};

window.addEventListener("load", addEvents);

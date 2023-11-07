import React, { useState,useRef, useEffect } from "react"
import { useCart,useDispatchCart } from './ContextReducer';

export default function Card(props) {
  
  let data = useCart();
  let dispatch = useDispatchCart();
  let options = props.options;
  const priceRef = useRef();
  let priceOptions = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;

        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, quantity: quantity })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, quantity: quantity, size: size, img: props.img })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({type:"ADD",
                    id: props.foodItems._id,
                    name: props.foodItems.name,
                    price: finalPrice,
                    quantity: quantity,
                    size : size
                    });
    console.log(data)
  }

  let finalPrice = quantity * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div className="card mt-3 mx-auto" style={{ width: "18rem", maxHeight: "360px" }}>
        <img className="card-img-top" src={props.foodItems.img} style={{height:"150px", objectFit:"fill"}}  alt="Food card" />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQuantity(e.target.value)} >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)} >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data} > {data} </option>
                )
              })}
            </select>

            <div className="d-inline h-100 fst-bold">Rs {finalPrice}/-</div>
          </div>
          <hr/>
          <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart} >Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

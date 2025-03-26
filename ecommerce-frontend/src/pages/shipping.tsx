import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {BiArrowBack} from "../components/Icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState,server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {

    const { cartItems, coupon } = useSelector(
      (state: RootState) => state.cartReducer);
      const { user } = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [shippingInfo,setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const changeHandler = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      dispatch(saveShippingInfo(shippingInfo));

      try {
        const { data } = await axios.post(
          `${server}/api/v1/payment/create?id=${user?._id}`, 
          {
            items: cartItems,
            shippingInfo,
            coupon,
          },
          {
          headers:{
            "Content-Type": "application/json",
          },
        }
      );
        navigate("/pay", {
          state: data.clientSecret,
        });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    useEffect(() => {
      const checkCartItems = async () => {
        if (cartItems.length <= 0) {
          // Use navigate inside an async function
          await navigate("/cart");
        }
      };
      
      checkCartItems();
    }, [cartItems, navigate]);  // Add navigate to the dependency array to avoid closure issues
    

  return (
    <div className="shipping">
    <button className="back-btn" onClick={() => navigate("/cart")}>
      <BiArrowBack />
    </button>
    <form action="" onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <input 
        required
        type="text"
        placeholder="Address"
        name="address"
        value={shippingInfo.address}
        onChange={changeHandler} 
        />
        <input 
        required
        type="text"
        placeholder="City"
        name="city"
        value={shippingInfo.city}
        onChange={changeHandler} 
        />
        <input 
        required
        type="text"
        placeholder="State"
        name="state"
        value={shippingInfo.state}
        onChange={changeHandler} 
        />
        <select
         name="country"
         required
         value={shippingInfo.country}
         onChange={changeHandler}
         >
            <option value="">Choose Country</option>
            <option value="india">India</option>
         </select>
        <input 
        required
        type="number"
        placeholder="Pin Code"
        name="pinCode"
        value={shippingInfo.pinCode}
        onChange={changeHandler} 
        />
        <button type="submit">Pay Now</button>
    </form>
    </div>
  );
};

export default Shipping;
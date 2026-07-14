/*
menu: name, descripiron, createdat, id, price, quantity(user req), is_publish(false), catId(refernce=> category)
*/

import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    is_publish: {
      type: Boolean,
      default: true,
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamp: true,
  },
);
const Menu = mongoose.model("Menu", menuSchema);
export default Menu;

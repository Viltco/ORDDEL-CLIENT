import React,{useState} from 'react';
import { ADD_TO_CART, REMOVE_FROM_CART, ALL_CLEAR,DELETE_PRODUCT,ADD_TO_QTTY,REORDER ,RESEND,UPDATE_QTTY} from '../actions/OrderBox';
import ProductItem from '../../Models/Product';


const initialState = {
  items: {},
  totalPackages: 0,
  count:0,
  totalAmount:0
};

export default (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_QTTY:
      console.log("UPDATE_QTTY id ",action.id);
      console.log("UPDATE_QTTY Qty ",action.qtty);
      console.log("UPDATE_QTTY items ",state.items);
     
      console.log("UPDATE_QTTY  ",state.count);
      // const [qtyCheck,setQtyCheck]=useState(false);
      // const [newQty,setNewQty]=useState("");
      var qtyCheck=false;
      var Qty=0;
      var newQuantity=action.qtty;
      for(var i=0;i<state.count;i++){
        if(state.items[action.id]){
          
          
          
          
         
          state.totalPackages=parseInt(state.totalPackages) - parseInt(state.items[action.id]["quantity"]);
          state.totalPackages=parseInt(state.totalPackages) + parseInt(action.qtty);
          

          



          state.items[action.id]["quantity"]=newQuantity;
          // console.log("state.totalAmount 3 ",state.totalAmount)
          console.log("if worksssssssss",state.items[action.id]["quantity"]);
        }
      }
      if(state.totalAmount>state.items[action.id]["total_amount"]){
        console.log("state.totalAmount 1 ",state.totalAmount);
        state.totalAmount=parseFloat(state.totalAmount)- parseFloat(state.items[action.id]["total_amount"]);
      }
      else{
        console.log("state.totalAmount 2 ",state.totalAmount);
        state.totalAmount=parseFloat(state.items[action.id]["total_amount"])-parseFloat(state.totalAmount);
      }
      state.totalAmount=parseFloat(state.totalAmount)+ parseInt(newQuantity)*parseFloat(state.items[action.id]["price"]);
          console.log("state.totalAmount 3 ",state.totalAmount)


      
        
      return {
        ...state,
        items: state.items,
        totalPackages:state.totalPackages,
        count: state.count,
        totalAmount:state.totalAmount
      };

    case RESEND:
      const Data =action.response;
      console.log("dataaaaaaaaaaa",Data);
      for(var i=0;i<Data.length;i++){
        console.log("gggggggggggggggggg",Data[i]["product_id"])
        console.log("gggggggggggggggggg1",Data[i]["quantity"])
        console.log("gggggggggggggggggg2",Data[i]["unit_sales_price"])
        console.log("gggggggggggggggggg3",Data[i]["product_name"])
        console.log("gggggggggggggggggg4",Data[i]["product_unit"])
        

        let updatedOrListCartItem1;

     
        updatedOrListCartItem1 = new ProductItem(Data[i]["quantity"],Data[i]["quantity"]*Data[i]["unit_sales_price"],Data[i]["product_name"],Data[i]["product_unit"],Data[i]["unit_sales_price"] );
        state.items={ ...state.items, [Data[i]["product_id"]]: updatedOrListCartItem1 }
        state.totalPackages= parseInt(state.totalPackages) + parseInt(Data[i]["quantity"]);
        state.count= state.count+1;
        state.totalAmount=parseFloat(state.totalAmount)+ parseFloat(Data[i]["quantity"]*Data[i]["unit_sales_price"]);
      }
      return state;

    case REORDER:
      const data =action.response;
      console.log("dataaaaaaaaaaa",data);
      for(var i=0;i<data.length;i++){
        console.log("gggggggggggggggggg",data[i]["product_id"])
        console.log("gggggggggggggggggg1",data[i]["quantity"])
        console.log("gggggggggggggggggg2",data[i]["unit_sales_price"])
        console.log("gggggggggggggggggg3",data[i]["product_name"])
        console.log("gggggggggggggggggg4",data[i]["product_unit"])
        

        let updatedOrListCartItem;

     
        updatedOrListCartItem = new ProductItem(data[i]["purchased_quantity"],data[i]["purchased_quantity"]*data[i]["unit_sales_price"],data[i]["product_name"],data[i]["product_unit"],data[i]["unit_sales_price"] );
        state.items={ ...state.items, [data[i]["product_id"]]: updatedOrListCartItem }
        state.totalPackages= parseInt(state.totalPackages) + parseInt(data[i]["purchased_quantity"]);
        state.count= state.count+1;
        state.totalAmount=parseFloat(state.totalAmount)+ parseFloat(data[i]["purchased_quantity"]*data[i]["unit_sales_price"]);
      }
      return state;
      // return {
      //   ...state,
      //   items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
      //   totalPackages: parseInt(state.totalPackages) + parseInt(qtty),
      //   count: state.count+1,
      //   totalAmount:parseFloat(state.totalAmount)+ parseFloat(qtty*prodPrice)
      // };
      // return state;
    
    case ADD_TO_CART:
      const addedProduct = action.product;
      const qtty=action.qtty;
      const id=addedProduct.id;
      const prodPrice = addedProduct.avg_price;
      const prodName = addedProduct.name;
      const prodUnit = addedProduct.unit;
      console.log("addedProduct",addedProduct.id);
      let updatedOrNewCartItem;

     
        updatedOrNewCartItem = new ProductItem(qtty,qtty*prodPrice,prodName,prodUnit,prodPrice );
        
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalPackages: parseInt(state.totalPackages) + parseInt(qtty),
        count: state.count+1,
        totalAmount:parseFloat(state.totalAmount)+ parseFloat(qtty*prodPrice)
      };
      
    case REMOVE_FROM_CART:
      var selectedCartItem = state.items[action.pid];
      var currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new ProductItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.totalPackages - selectedCartItem.price,
          selectedCartItem.name,
          selectedCartItem.unit,
          selectedCartItem.price,
          
          
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalPackages: state.totalPackages - selectedCartItem.price,
        count: state.count-1,
      };
    // case ADD_ORDER:
    //   return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemQty = state.items[action.pid].quantity;
      const itemTotal=state.items[action.pid].price;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalPackages: state.totalPackages - itemQty,
        count:state.count-1,
        totalAmount:parseFloat(state.totalAmount)- parseFloat(itemQty*itemTotal)
        
      };
      
    case ALL_CLEAR:
      if(action.pid ==1){
        state.items={};
        state.totalPackages= 0;
        state.count=0;
        state.totalAmount=0;

      }
      

  }

  return state;
};

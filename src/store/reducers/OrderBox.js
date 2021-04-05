import { ADD_TO_CART, REMOVE_FROM_CART, ALL_CLEAR,DELETE_PRODUCT,ADD_TO_QTTY } from '../actions/OrderBox';
import ProductItem from '../../Models/Product';


const initialState = {
  items: {},
  totalPackages: 0,
  count:0,
  totalAmount:0
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_TO_CART:
      const addedProduct = action.product;
      const qtty=action.qtty;
      const id=addedProduct.id;
      const prodPrice = addedProduct.avg_price;
      const prodName = addedProduct.name;
      const prodUnit = addedProduct.unit;

      let updatedOrNewCartItem;

      // if (state.items[addedProduct.id]) {
        
      //   // alert("This Product is already in Added");
      // //   // already have the item in the cart
      // //   updatedOrNewCartItem = new ProductItem(
      // //     // state.items[addedProduct.id].id,
      // //     state.items[addedProduct.id].quantity + 1,
      // //     state.items[addedProduct.id].total_amount + prodPrice,
      // //     prodName,prodUnit,prodPrice
      // //   // alert("This Product is already in Added");
      // //   );
        
      // } else {
        updatedOrNewCartItem = new ProductItem(qtty,qtty*prodPrice,prodName,prodUnit,prodPrice );
        // state.totalAmount="";
      // }
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

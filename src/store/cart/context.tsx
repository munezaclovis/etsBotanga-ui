import { createContext, FC, useState } from "react";
import ICart from "../../models/cart/ICart";
import IPageProps from "../../models/shared/IPageProps";
import useApi from "../../services/api/useApi";
import { cartInitState } from "./reducer";

type IContext = {
    cart: ICart;
    cartLoading: boolean;
    loadCart: () => void;
    addToCart: (e: { product_id: string }) => void;
    editQuantity: (e: {
        cart_item_id: string;
        product_id: string;
        quantity: number;
    }) => void;
    removeFromCart: (e: { cart_item_id: string; product_id: string }) => void;
};

export const CartContext = createContext<IContext>({} as IContext);

const CartProvider: FC<IPageProps> = ({ children }) => {
    const [cart, setCart] = useState<ICart>(cartInitState);
    const [cartLoading, setCartLoading] =
        useState<IContext["cartLoading"]>(false);
    const api = useApi();

    const loadCart = () => {
        api.get<ICart>("shopping-cart").then((response) => {
            setCart({
                ...cart,
                items: response.data.items,
                id: response.data.id,
            });
            setCartLoading(false);
        });
    };

    const addToCart: IContext["addToCart"] = ({ product_id }) => {
        setCartLoading(true);
        api.post<ICart>("shopping-cart", { product_id: product_id }).then(
            (response) => {
                loadCart();
            }
        );
    };

    const editQuantity: IContext["editQuantity"] = ({
        cart_item_id,
        product_id,
        quantity,
    }) => {
        console.log(quantity);
        if (
            quantity < 0 &&
            cart.items.find((x) => x.product.id.includes(product_id))
                ?.quantity! +
                quantity <
                1
        ) {
            removeFromCart({
                cart_item_id: cart_item_id,
                product_id: product_id,
            });
        } else {
            setCartLoading(true);
            api.patch(`shopping-cart/${cart_item_id}`, {
                quantity: quantity,
                product_id: product_id,
            }).then((response) => {
                loadCart();
            });
        }
    };

    const removeFromCart: IContext["removeFromCart"] = ({
        cart_item_id,
        product_id,
    }) => {
        setCartLoading(true);
        api.delete(`shopping-cart/${cart_item_id}`).then((response) => {
            loadCart();
        });
    };

    let value = {
        cart,
        cartLoading,
        loadCart,
        addToCart,
        editQuantity,
        removeFromCart,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export default CartProvider;

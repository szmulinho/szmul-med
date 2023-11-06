import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ShoppingCart } from "../compontents/Store/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Drug } from "../data/drugstore";
import axios from "axios";

type ShoppingCartProviderProps = {
    children: ReactNode;
    drugs: Drug[];
};

type DrugItem = {
    drug: Drug;
    quantity: number;
};

type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (drug_id: number) => number;
    increaseCartQuantity: (drug_id: number) => void;
    decreaseCartQuantity: (drug_id: number) => void;
    removeFromCart: (drug_id: number) => void;
    cartQuantity: number;
    drugItems: DrugItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [drugs, setDrugs] = useState<Drug[]>([]); // State to store the fetched drugs
    const [drugItems, setDrugItems] = useLocalStorage<DrugItem[]>("shopping-cart", []);
    const cartQuantity = drugItems.reduce((quantity, item) => item.quantity + quantity, 0);

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const response = await axios.get<Drug[]>('https://szmul-med-drugstore.onrender.com/drugs');
                setDrugs(response.data);
            } catch (error) {
                console.error('Error fetching drugs:', error);
            }
        };

        fetchDrugs();
    }, []);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(drug_id: number) {
        return drugItems.find((item) => item.drug.drug_id === drug_id)?.quantity || 0;
    }

    function increaseCartQuantity(drug_id: number) {
        setDrugItems((currItems) => {
            const existingItem = currItems.find((item) => item.drug.drug_id === drug_id);

            if (existingItem) {
                return currItems.map((item) =>
                    item.drug.drug_id === drug_id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                console.log(drugs, "add leks")
                const drugToAdd = drugs.find((drug) => drug.drug_id === drug_id);
                if (drugToAdd) {
                    return [...currItems, { drug: drugToAdd, quantity: 1 }];
                } else {
                    return currItems; // Handle the case where the drug with the specified ID is not found
                }
            }
        });
    }


    function decreaseCartQuantity(drug_id: number) {
        setDrugItems((currItems) => {
            const updatedItems = currItems.map((item) => {
                if (item.drug.drug_id === drug_id) {
                    return { ...item, quantity: Math.max(item.quantity - 1, 0) }; // Ensure quantity doesn't go below 0
                }
                return item;
            });

            return updatedItems.filter((item) => item.quantity > 0); // Remove items with quantity 0
        });
    }


    function removeFromCart(drug_id: number) {
        setDrugItems((currItems) => {
            return currItems.filter((item) => item.drug.drug_id !== drug_id);
        });
    }


    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                drugItems,
                cartQuantity,
                openCart,
                closeCart,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} onSubmitOrder={() => {
                throw new Error("Function not implemented.");
            }} drugs={drugs} />
        </ShoppingCartContext.Provider>
    );
}

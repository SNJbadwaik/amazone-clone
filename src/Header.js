import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { Drawer } from "@material-ui/core";
import Checkout from './Checkout';
import { useStateValue } from "./StateProvider";

function Header() {
    const [{ basket, user, drawer }, dispatch] = useStateValue();

    const handleAuthentication = () => {
      if (user) {
        auth.signOut();
      }
    };


    return (
        <div className="header">
            <Link to='/'>
                <img
                    className="header__logo"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG11.png">
                </img>
            </Link>
            <div className="header__search">
                <input className="header__searchInput" type="text"></input>
                <SearchIcon className="header__searchIcon" />
                <div className="header__nav">
                    <div className="header__option">
                        <span className="header__optionLineOne">Hello Guest</span>
                        <span className="header__optionLineTwo">Sign In</span>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineOne">Returns</span>
                        <span className="header__optionLineTwo">& Orders</span>
                    </div>
                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>

                    <Link
                        onClick={() => {
                            dispatch({
                                type: "SET_DRAWER",
                                toggle: true,
                            });
                        }}
                    >
                        <div className="header__optionBasket">
                            <ShoppingBasketIcon />
                            <span
                                className="header__basketCount header__optionLineTwo"
                                style={{ marginLeft: "5px" }}
                            >
                                {basket?.length}
                            </span>
                        </div>
                    </Link>
                    <Drawer open={drawer} style={{ width: "50%" }}>
                        <Checkout />
                    </Drawer>
                </div>
            </div>
        </div>
    );
}

export default Header;

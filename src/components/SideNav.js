import React, { useState } from "react";
import { NavList, NavElement } from "./SideNav.styles";
import ChatIcon from "@material-ui/icons/Chat";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { SvgIcon } from "@material-ui/core";

export const SideNav = () => {
    const [getSelected, setSelected] = useState(0);
    const pages = ["feed", "mail"];

    const getIcon = (page) => {
        switch (page) {
            case "feed":
                return <ChatIcon />;
            case "mail":
                return <MailOutlineIcon />;
            default:
                return <ChatIcon />;
        }
    };

    return (
        <NavList>
            {pages.map((page, i) => {
                return (
                    <NavElement
                        first={i === 0 ? true : false}
                        selected={i === getSelected ? true : false}
                        onClick={() => setSelected(i)}
                    >
                        <SvgIcon
                            htmlColor={
                                i === getSelected ? `#FFFFFF` : `#B78989`
                            }
                        >
                            {getIcon(page)}
                        </SvgIcon>
                    </NavElement>
                );
            })}
        </NavList>
    );
};

import React, { useState } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { SvgIcon } from "@material-ui/core";
import { NavList, NavElement } from "./SideNav.styles";

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
                        key={btoa(page)}
                        first={i === 0}
                        selected={i === getSelected}
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

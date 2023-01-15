import React, { useState } from "react";
import styles from "./dropdown.module.css";

type option = {
    id: number | string | undefined | null,
    name: string | undefined | null;
};

interface Props {
    options: Array<option>;
    label: string | undefined,
    value: option | any,
    handleChange: Function;
}

function Dropdown({ options, label, value, handleChange }: Props) {
    const [open, setOpen] = useState(false);

    function handleClick(value: option | any) {
        handleChange(value);
        setOpen(false);
    };

    function handleOnBlurClose(e: React.SyntheticEvent) {
        const target = e.currentTarget;

        if (!target.contains(document.activeElement)) {
            setOpen(false);
        }
    }

    return (
        <div className={styles.dropdown_ctn} tabIndex={0} onBlur={handleOnBlurClose}>
            <label onClick={() => setOpen(!open)}>
                {
                    value ? value.name : label
                }
            </label>

            <div className={[styles.dropdown_ctn__list, open && styles.dropdown_ctn__list_open].join(" ")}>
                {
                    options.map(option => <span key={option.id} onClick={() => handleClick(option)}>{option.name}</span>)
                }
            </div>
            {/* <select
                name={label}
                value={value}
                onChange={e => handleChange(options.find(opt => opt.id == e.target.value))}
            // onChange={e => handleChange(options.find(opt => opt.id === e.target.value) || null)}
            >
                {
                    options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)
                }
            </select> */}
        </div>
    );
}

export default Dropdown;
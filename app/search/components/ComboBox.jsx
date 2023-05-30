import { ArrayProvinces } from "@/app/constants";
import { InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import styles from "./combobox.module.css";

export function ComboBox({ parameter, arrayItems, title }) {
  const items = arrayItems.find((item) => item.key === parameter);
  const [item, setItem] = useState(items?.value);
  const handleChange = (event) => {
    setItem(event.target.value);
  };
  //console.log(provinces);
  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 170 }} size="small">
      <InputLabel
        className={styles.comboboxLabel}
        id="demo-simple-select-filled-label"
      >
        {title}
      </InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-standard"
        value={item}
        label="Provincia"
        onChange={handleChange}
        defaultValue={""}
        MenuItem
        className={styles.combobox}
      >
        <MenuItem className={styles.comboboxItem} value={""}>
          <em>None</em>
        </MenuItem>
        {arrayItems.map((province, index) => (
          <MenuItem
            className={styles.comboboxItem}
            key={province.key}
            value={province.value}
          >
            {province.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

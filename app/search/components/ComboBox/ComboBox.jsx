import { ArrayProvinces } from "@/app/constants"
import { InputLabel, MenuItem, Select } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import { useState } from "react"
import styles from "./combobox.module.css"

export function ComboBox({ parameter, arrayItems, title }) {
  const items = arrayItems.find((item) => item.key === parameter)
  const [item, setItem] = useState(items?.value)
  const handleChange = (event) => {
    setItem(event.target.value)
  }

  return (
    <FormControl
      variant="filled"
      sx={{
        m: 1,
        minWidth: 105,
        maxWidth: 105,
        height: 40,
        backgroundColor: "#21263d",
        borderRadius: "0.2em 0.2em 0 0",
        color: "#FFFFFF",
      }}
      size="small"
    >
      <InputLabel
        className={styles.comboboxLabel}
        id="demo-simple-select-filled-label"
        sx={{
          color: "#85daf0",
          fontSize: "0.9em",
        }}
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
        autoWidth={false}
        MenuItem
        className={styles.combobox}
        sx={{
          backgroundColor: "#FFFFFF15",
          color: "#FFFFFF",
          fontSize: "0.7em",
          borderBottom: "1px solid #167db7",
        }}
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
  )
}

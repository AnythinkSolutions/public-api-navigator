import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

export interface IFilterFieldProps {
  onFilterChange: (filter: string) => void;
}

const FilterTextField = ({onFilterChange} : IFilterFieldProps) => {
  const [filter, setFilter] = useState("");

  useEffect(() => {
    onFilterChange(filter);
  }, [filter, onFilterChange]);

  return (
    <TextField onChange={e => setFilter(e.target.value)} value={filter} placeholder="filter" fullWidth sx={{ ["& input"]: { py: 1 } }} />    
  );
};

export default FilterTextField;

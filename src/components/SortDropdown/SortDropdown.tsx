import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { SortValues } from '../../types'

interface ISortDropdownProps {
  onChange: (sortValue: SortValues) => void
  sortValue: SortValues
}

const SortDropdown = ({ onChange, sortValue }: ISortDropdownProps) => {
  const handleChange = (event: SelectChangeEvent<SortValues>) => {
    const value = event.target.value as SortValues
    onChange(value)
  }
  return (
    <FormControl className='!min-w-28'>
      <Select labelId='sort-select-label' id='sort-select' value={sortValue} onChange={handleChange}>
        <MenuItem value={SortValues.DEFAULT}>Default</MenuItem>
        <MenuItem value={SortValues.TITLE_ASC}>Title ↑</MenuItem>
        <MenuItem value={SortValues.TITLE_DESC}>Title ↓</MenuItem>
        <MenuItem value={SortValues.AUTHOR_ASC}>Author ↑</MenuItem>
        <MenuItem value={SortValues.AUTHOR_DESC}>Author ↓</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortDropdown

import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import arrowDownload16Filled from '@iconify/icons-fluent/arrow-download-16-filled';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import axios from 'axios';
// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:4001/api/hub/download?name=${props.name}`);
      const url = res.data;
      const a = document.createElement('a');
      a.setAttribute('download', props.name);
      a.setAttribute('href', url);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`http://localhost:4001/api/hub/delete?name=${props.name}`);
    const a = props.arr.filter((item) => item.filename !== props.name);
    console.log(a);
    alert(res.data);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} name={props.name} onClick={handleDelete}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          name={props.name}
          onClick={handleDownload}
        >
          <ListItemIcon name={props.name} onClick={handleDownload}>
            <Icon icon={arrowDownload16Filled} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Download" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

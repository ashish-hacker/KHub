import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import arrowDownload16Filled from '@iconify/icons-fluent/arrow-download-16-filled';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import taskApproved from '@iconify/icons-carbon/task-approved';
import aiStatusRejected from '@iconify/icons-carbon/ai-status-rejected';
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
      const tok = {
        token: localStorage.getItem('jwt')
      };
      const res = await axios.get(`/api/hub/download?name=${props.name}`, tok);
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

  const handleDownloadTemp = async (e) => {
    e.preventDefault();
    try {
      const tok = {
        token: localStorage.getItem('jwt')
      };
      const res = await axios.post(`${process.env.BACKEND_ENDPOINT}/api/hub/downloadTemp?name=${props.name}`, tok);
      const url = res.data;
      const a = document.createElement('a');
      a.setAttribute('download', props.name);
      a.setAttribute('href', url);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      delete props.arr[props.name];
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const t = localStorage.getItem('jwt');
    try {
      await axios
        .delete(`${process.env.BACKEND_ENDPOINT}/api/hub/delete?name=${props.name}&token=${t}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    const a = props.arr.filter((item) => item.filename !== props.name);
    window.location.reload();
    alert('Deleted Successfully');
  };
  const handleApprove = async (e) => {
    e.preventDefault();
    const tok = {
      token: localStorage.getItem('jwt')
    };
    try {
      await axios
        .post('/api/hub/move', {
          token: tok,
          name: props.name
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDisApprove = async (e) => {
    e.preventDefault();
    const t = localStorage.getItem('jwt');
    try {
      await axios
        .delete(`${process.env.BACKEND_ENDPOINT}/api/hub/deleteReview?name=${props.name}`, {
          token: t
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const Approve = () => (
    <MenuItem sx={{ color: 'text.secondary' }} name={props.name} onClick={handleApprove}>
      <ListItemIcon>
        <Icon icon={taskApproved} width={24} height={24} />
      </ListItemIcon>
      <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
    </MenuItem>
  );

  const DisApprove = () => (
    <MenuItem sx={{ color: 'text.secondary' }} name={props.name} onClick={handleDisApprove}>
      <ListItemIcon>
        <Icon icon={aiStatusRejected} width={24} height={24} />
      </ListItemIcon>
      <ListItemText primary="Disapprove" primaryTypographyProps={{ variant: 'body2' }} />
    </MenuItem>
  );

  const Delete = () => (
    <MenuItem sx={{ color: 'text.secondary' }} name={props.name} onClick={handleDelete}>
      <ListItemIcon>
        <Icon icon={trash2Outline} width={24} height={24} />
      </ListItemIcon>
      <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
    </MenuItem>
  );

  const Download = () => (
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
  );

  const DownloadTemp = () => (
    <MenuItem
      component={RouterLink}
      to="#"
      sx={{ color: 'text.secondary' }}
      name={props.name}
      onClick={handleDownloadTemp}
    >
      <ListItemIcon name={props.name} onClick={handleDownloadTemp}>
        <Icon icon={arrowDownload16Filled} width={24} height={24} />
      </ListItemIcon>
      <ListItemText primary="Download" primaryTypographyProps={{ variant: 'body2' }} />
    </MenuItem>
  );

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
        {props.isAdmin ? (
          <div>
            <Approve />
            <DisApprove />
            <DownloadTemp />
          </div>
        ) : (
          <div>
            {props.isAdminBase && <Delete />}
            <Download />
          </div>
        )}
      </Menu>
    </>
  );
}

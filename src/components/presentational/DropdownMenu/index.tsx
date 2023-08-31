import { ReactNode, useState } from 'react';
import Link from 'next/link';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import styles from './DropdownMenu.module.scss';

interface MenuItem {
  url?: string | undefined;
  onClick?: () => void | undefined;
  text: string;
  icon?: ReactNode;
}

interface DropdownMenuProps {
  triggerButtonText: string | ReactNode;
  triggerButtonTextColor?: string;
  menuItems: MenuItem[];
}

const DropdownMenu = ({
  triggerButtonText,
  triggerButtonTextColor = 'inherit',
  menuItems,
}: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        sx={{ color: triggerButtonTextColor }}
        aria-describedby={id}
        onClick={handleClick}
      >
        {triggerButtonText}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList className={styles.menuList} dense>
          {menuItems.map(({ text, url = '', onClick, icon }) => (
            <MenuItem key={text}>
              <Link
                className={styles.menuListLink}
                href={url}
                onClick={onClick}
              >
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                {text}
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
};

export default DropdownMenu;

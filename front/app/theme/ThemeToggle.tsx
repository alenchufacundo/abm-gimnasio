import { IconButton, styled } from '@mui/material';
import { useThemeContext } from '../contexts/ThemeContext';
import TablerIcon from '../components/icon/TablerIcon';

const ThemeIconButton = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    bottom: 16,
    left: 16,
    zIndex: 10,
    borderRadius: '50%',
    padding: theme.spacing(1.2),
    transition: 'all 0.3s ease',
    background: theme.palette.mode === 'dark' ? '#fff' : '#000',
    color: theme.palette.mode === 'dark' ? '#000' : '#fff',
    boxShadow: `0 4px 10px rgba(0, 0, 0, 0.3), inset 0 0 6px rgba(255, 255, 255, 0.3)`,
    '&:hover': {
        background: theme.palette.mode === 'dark' ? '#fff' : '#000',
        boxShadow: `0 6px 15px rgba(0, 0, 0, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.4)`,
    },
}));

const ThemeToggle = () => {
    const { toggleTheme, darkMode } = useThemeContext();

    if (darkMode === undefined) {
        return;
    }

    return (
        <ThemeIconButton onClick={toggleTheme}>
            <TablerIcon
                icon={darkMode ? 'IconSun' : 'IconMoonStars'}
                sx={{
                    fontSize: 24,
                }}
            />
        </ThemeIconButton>
    );
};

export default ThemeToggle;
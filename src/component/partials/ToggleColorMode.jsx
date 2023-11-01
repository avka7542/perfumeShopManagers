import { Button } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/color-mode'
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function ToggleColorMode() {

    const { colorMode, toggleColorMode } = useColorMode();

    const button_styles = {
        pos: "absolute",
        zIndex: 99,
        top: 0,
        right: 0,
        m: '1rem'
    }

    return (
        <Button
            onClick={() => toggleColorMode()}
            sx={button_styles}
        >
            {/* {colorMode === 'light' ? 'Dark' : 'Light'} */}
            {colorMode === 'dark' ? (
                <SunIcon color="orange.200" />
            ) : (
                <MoonIcon color='blue.700' />
            )
            }
        </Button>
    )
}

export default ToggleColorMode
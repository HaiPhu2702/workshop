import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: "xxl",
                margin: 0,
                padding: 0
            },
        },

    },
});

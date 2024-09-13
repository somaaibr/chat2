import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            typography: {
                fontFamily: "Zeroes One, Geomanist, sans-serif", // Defina as fontes aqui
            },
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#682EE3",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
                },
            },
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#152B59" : "#FFFFFF" },  // Azul-escuro no modo claro, branco no escuro
                textPrimary: { main: mode === "light" ? "#152B59" : "#FFFFFF" },  // Azul-escuro para o texto no modo claro, branco no escuro
                borderPrimary: { main: mode === "light" ? "#152B59" : "#FFFFFF" },  // Bordas azuis no claro, branco no escuro
                dark: { main: mode === "light" ? "#010817" : "#F3F3F3" },  // Fundo escuro no claro, claro no escuro
                light: { main: mode === "light" ? "#F3F3F3" : "#010817" },  // Fundo claro no modo claro, escuro no escuro
                tabHeaderBackground: { main: mode === "light" ? "#295FA6" : "#666" },  // Fundo de abas azul-claro no modo claro, cinza no escuro
                optionsBackground: { main: mode === "light" ? "#fafafa" : "#152B59" },  // Fundo de opções branco no claro, azul-escuro no escuro
                options: { main: mode === "light" ? "#fafafa" : "#152B59" },  // Opções com fundo similar para legibilidade
                fontecor: { main: mode === "light" ? "#295FA6" : "#fff" },  // Cor do texto principal
                fancyBackground: { main: mode === "light" ? "#fafafa" : "#152B59" },  // Fundo decorativo claro ou escuro
                bordabox: { main: mode === "light" ? "#EEE" : "#295FA6" },  // Bordas das caixas
                newmessagebox: { main: mode === "light" ? "#EEE" : "#295FA6" },  // Fundo de novas mensagens
                inputdigita: { main: mode === "light" ? "#fff" : "#295FA6" },  // Fundo dos inputs
                contactdrawer: { main: mode === "light" ? "#fff" : "#295FA6" },  // Fundo do menu de contatos
                announcements: { main: mode === "light" ? "#ededed" : "#295FA6" },  // Fundo de anúncios
                login: { main: mode === "light" ? "#A3C1E6" : "#1C1C1C" },  // **Ajustado**: Fundo da tela de login
                announcementspopover: { main: mode === "light" ? "#fff" : "#295FA6" },  // Fundo do popover de anúncios
                chatlist: { main: mode === "light" ? "#EEE" : "#295FA6" },  // Fundo da lista de chats
                boxlist: { main: mode === "light" ? "#ededed" : "#295FA6" },  // Fundo das listas de caixas
                boxchatlist: { main: mode === "light" ? "#ededed" : "#295FA6" },  // Fundo das caixas de chat
                total: { main: mode === "light" ? "#fff" : "#222" },  // Cor do fundo dos totais
                messageIcons: { main: mode === "light" ? "grey" : "#F3F3F3" },  // Ícones de mensagens
                inputBackground: { main: mode === "light" ? "#FFFFFF" : "#152B59" },  // Fundo dos campos de entrada
                barraSuperior: { main: mode === "light" ? "linear-gradient(to right, #152B59, #295FA6)" : "#152B59" },  // Fundo da barra superior
                boxticket: { main: mode === "light" ? "#EEE" : "#295FA6" },  // Fundo de tickets
                campaigntab: { main: mode === "light" ? "#ededed" : "#295FA6" },  // Fundo das abas de campanhas
                mediainput: { main: mode === "light" ? "#ededed" : "#1c1c1c" }  // Fundo da área de input de mídia
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                      <Routes />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;

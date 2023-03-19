import { extendTheme, NativeBaseProvider } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";
import { HomeScreen } from "./screens/home.screen";

const themeConfig = {
  useSystemColorMode: true,
  initialColorMode: "light",
  colors: {
    primary: {
      50: "#fefefe",
      100: "#fdfdfe",
      200: "#fcfcfd",
      300: "#fafbfc",
      400: "#f9fafb",
      500: "#f8f9fa",
      600: "#f7f8f9",
      700: "#f6f7f9",
      800: "#f5f6f8",
      900: "#f3f5f6",
    },
  },
};

const queryClient = new QueryClient();

function App() {
  const theme = extendTheme(themeConfig);
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <HomeScreen />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default App;

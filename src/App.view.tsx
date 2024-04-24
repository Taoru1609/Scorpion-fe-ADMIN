import "./App.style.scss";
import AppRoutes from "./App.routing";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import theme from './theme.config';
import { ContextProviderConfig } from "./common/ContextProvider.config";

function AppView() {
  return (
    <div className="app-202404091018">
      <ConfigProvider theme={theme}>
        <ContextProviderConfig>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ContextProviderConfig>
      </ConfigProvider>
    </div>
  );
}

export default AppView;
